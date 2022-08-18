import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { setNfts } from "../../../../app/nftsSlice";
import InfoCard from "../../../../components/InfoCard";
import NFTItem, { NoNFTs } from "../../../../components/NFTItem";
import { MarketplaceContract } from "../../../../constant/config";
import { PAGES } from "../../../../constant/pages";
import useContract from "../../../../hooks/useContract";
import useMatchBreakpoints from "../../../../hooks/useMatchBreakpoints";
import { CurrentTimeContext } from "../../index";

import {
  Wrapper,
  TitleBar,
  MainTitle,
  SubTitle,
  SubWrapper,
  InfoContainer,
  FooterBar,
  FooterContent,
  FooterBalance,
  // NftContainerTitle,
  NftContainer,
  NftTypeTabs,
  NftTypeTab,
  // StyledButton as Button,
} from "./styled";

interface NFTsProps {
  title: string;
  nftName: string;
  options: {
    nftAddress: string;
    stakingAddress: string;
    marketplaceAddress: string;
    rarityData: any;
    imageBaseUrl: string;
    totalCount: number;
  };
}

enum NFT_TYPE {
  ALL = "My NFTs",
  AVAILABLE = "Available",
  ONSALE = "On Sale",
  STAKED = "Staked",
  UNSTAKING = "Unstaking",
}

const MAX_ITEMS = 50;

const NFTs: React.FC<NFTsProps> = ({
  // tokens, fetchNfts,
  title,
  nftName,
  options,
}) => {
  const [stakedNfts, setStakedNfts] = useState([]);
  const [unstakingNfts, setUnstakingNfts] = useState([]);
  const [marketplaceNfts, setMarketplaceNfts] = useState([]);
  const [stakingPeriod, setStakingPeriod] = useState(0);
  const [totalStaked, setTotalStaked] = useState(0);
  const [sendingTx, setSendingTx] = useState(false);
  const [rarityRanks, setRarityRanks] = useState<any>({});
  const [selectedTab, setSelectedTab] = useState<NFT_TYPE>(NFT_TYPE.ALL);
  const { currentTime } = useContext(CurrentTimeContext);
  const { runQuery, runExecute } = useContract();
  const { isXs, isSm, isMd } = useMatchBreakpoints();
  const isMobile = isXs || isSm || isMd;
  const account = useAppSelector((state: any) => state.accounts.keplr);
  const tokens = useAppSelector((state) => state.nfts[options.nftAddress]);
  const dispatch = useAppDispatch();

  const fetchAllNfts = useCallback(
    async (address: string) => {
      if (address) {
        // fetchNfts(address, options.nftAddress);
        const tokens = await runQuery(options.nftAddress, {
          tokens: {
            owner: address,
            limit: 30,
          },
        });
        dispatch(setNfts([options.nftAddress, tokens]));

        // fetch from staking contract
        const stakedNftResult = await runQuery(options.stakingAddress, {
          get_my_info: {
            address: address,
          },
        });
        let stakedNft: any = [],
          unstakingNft: any = [];
        stakedNftResult?.forEach((item: any) => {
          if (item.status === "Staked") stakedNft.push(item);
          else if (item.status === "Unstaking") unstakingNft.push(item);
        });
        setStakedNfts(stakedNft || []);
        setUnstakingNfts(unstakingNft);

        // fetch from marketplace contract
        let queries: any = [];
        let contractAddresses: string[] = [];

        const collectionInfo = await runQuery(MarketplaceContract, {
          get_collection_info: {
            address: options.nftAddress,
          },
        });

        for (
          let i = 0;
          i < Math.ceil((collectionInfo?.offering_id || 0) / MAX_ITEMS);
          i++
        ) {
          let tokenIds = [];
          for (
            let j = 0;
            j < Math.min(collectionInfo?.offering_id || 0, MAX_ITEMS);
            j++
          ) {
            tokenIds.push("" + (MAX_ITEMS * i + j + 1));
          }
          queries.push(
            runQuery(MarketplaceContract, {
              get_offering_page: {
                id: tokenIds,
                address: options.nftAddress,
              },
            })
          );
          contractAddresses.push(MarketplaceContract);
        }
        if (options.marketplaceAddress) {
          queries.push(
            runQuery(options.marketplaceAddress, {
              get_offerings: {},
            })
          );
          contractAddresses.push(options.marketplaceAddress);
        }
        await Promise.all(queries).then((queryResults: any) => {
          let listedNfts: any = [];
          queryResults.forEach((queryResult: any, index: number) => {
            const fetchedResult =
              queryResult?.offerings ||
              (!!queryResult?.length && queryResult) ||
              [];
            fetchedResult?.forEach((item: any) => {
              if (item.seller === address) {
                listedNfts = [...listedNfts, item];
              }
            });
          });
          setMarketplaceNfts(listedNfts);
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options]
  );

  const distributeRewards = useCallback(async () => {
    if (sendingTx) return;
    try {
      setSendingTx(true);
      await runExecute(options.stakingAddress, {
        distribute_reward: {},
      });
      toast.success("Successfully Distributed!");
    } catch (e) {
      toast.error("Failed in Distribution!");
    } finally {
      setSendingTx(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.stakingAddress, sendingTx]);

  useEffect(() => {
    (async () => {
      const rarityData = options.rarityData;
      const weights = rarityData.weights || [];
      let rarities: any = {};
      if (weights.length) {
        weights.forEach((item: any) => {
          rarities[item.token_id + 1] = {
            weight: item.weight,
            rank: item.rank,
          };
        });
      }
      setRarityRanks(rarities);
    })();
  }, [options.rarityData]);

  useEffect(() => {
    (async () => {
      if (account) {
        fetchAllNfts(account.address);
      }
      const stakingStateInfo = await runQuery(options.stakingAddress, {
        get_state_info: {},
      });
      setStakingPeriod(stakingStateInfo?.staking_period || 0);
      setTotalStaked(stakingStateInfo?.total_staked || 0);
      if (
        (Number(stakingStateInfo?.last_distribute) +
          Number(stakingStateInfo?.distribute_period)) *
          1000 <
        Number(new Date())
      ) {
        distributeRewards();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, fetchAllNfts, distributeRewards, options.stakingAddress]);

  const handleClaim = async () => {
    if (sendingTx) return;
    const stakedIds: string[] = [];
    stakedNfts.forEach((nft: any) => {
      if (nft.status === "Staked") stakedIds.push(nft.token_id);
    });
    if (stakedIds.length) {
      setSendingTx(true);
      try {
        await runExecute(options.stakingAddress, {
          get_reward: { token_ids: stakedIds },
        });
        fetchAllNfts(account.address);
        toast.success("Successfully claimed!");
      } catch (e) {
        toast.error("Failed in Claiming!");
      } finally {
        setSendingTx(false);
      }
    }
  };

  const totalRewards = useMemo(() => {
    let result = 0;
    stakedNfts.forEach((item: any) => {
      result += Number(item.reward || 0);
    });
    return result;
  }, [stakedNfts]);

  // const infos: InfoCardProps[] = useMemo(() => {
  //   let stakedNftsCount = 0,
  //     unstakingNftsCount = 0,
  //     totalRewards = 0;
  //   stakedNfts.forEach((item: any) => {
  //     if (item.status === "Staked") stakedNftsCount++;
  //     else if (item.status === "Unstaking") unstakingNftsCount++;
  //     totalRewards += Number(item.reward || 0);
  //   });

  //   return [
  //     {
  //       title: "Your Allocation",
  //       contents: [`${tokens?.tokens?.length || 0} NFTs Available`],
  //     },
  //     {
  //       title: "NFT Staked",
  //       contents: [`${stakedNftsCount} NFTs Staked`],
  //     },
  //     {
  //       title: "Currently Unstaking",
  //       contents: [`${unstakingNftsCount} NFTs Unstaking`],
  //     },
  //     {
  //       title: "Your Rewards",
  //       contents: [`${(totalRewards / 1e6).toFixed(2)} $PUNK Available`],
  //       buttonOption: {
  //         title: "Claim",
  //         onClick: handleClaim,
  //       },
  //     },
  //   ];
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [stakedNfts, tokens]);

  const nftsCount = {
    [NFT_TYPE.ALL]:
      (tokens?.tokens?.length || 0) +
      stakedNfts.length +
      unstakingNfts.length +
      marketplaceNfts.length,
    [NFT_TYPE.AVAILABLE]: tokens?.tokens?.length || 0,
    [NFT_TYPE.ONSALE]: marketplaceNfts.length,
    [NFT_TYPE.STAKED]: stakedNfts.length,
    [NFT_TYPE.UNSTAKING]: unstakingNfts.length,
  };

  return (
    <Wrapper id={PAGES.PUNKNFT}>
      <TitleBar>
        <MainTitle>{title}</MainTitle>
        <SubTitle>
          Unstaking Period 27 Days | Weekly Payout All Monday 19:00 UTC
        </SubTitle>
      </TitleBar>
      <SubWrapper>
        <InfoContainer isMobile={isMobile}>
          {/* {infos.map((info: InfoCardProps, index: number) => (
            <InfoCard key={index} {...info} />
          ))} */}
          <InfoCard
            title="Your Rewards"
            contents={[`${(totalRewards / 1e6).toFixed(2)} $PUNK Available`]}
            isFlexRow
            buttonOption={{
              title: "Claim",
              onClick: handleClaim,
            }}
          />
        </InfoContainer>
        <FooterBar isMobile={isMobile}>
          <FooterContent>Total Punks Staked NFT</FooterContent>
          <FooterBalance>{`${totalStaked}/${options.totalCount}`}</FooterBalance>
        </FooterBar>
      </SubWrapper>
      {/* <NftContainerTitle>My NFTs</NftContainerTitle> */}
      <NftTypeTabs>
        {(Object.keys(NFT_TYPE) as Array<keyof typeof NFT_TYPE>).map((key) => (
          <NftTypeTab
            key={key}
            selected={selectedTab === NFT_TYPE[key]}
            onClick={() => setSelectedTab(NFT_TYPE[key])}
          >
            {`${
              NFT_TYPE[key] === NFT_TYPE.ALL
                ? `${NFT_TYPE[key]} ${nftName}`
                : NFT_TYPE[key]
            } (${nftsCount[NFT_TYPE[key]]})`}
          </NftTypeTab>
        ))}
      </NftTypeTabs>
      <NftContainer>
        {(selectedTab === NFT_TYPE.ALL || selectedTab === NFT_TYPE.AVAILABLE) &&
          tokens?.tokens?.map((item: any, index: number) => (
            <NFTItem
              key={`normal-${index}`}
              id={item}
              item={{ token_id: item }}
              rarityRanks={rarityRanks}
              unStakingPeriod={stakingPeriod}
              currentTime={currentTime}
              fetchNFT={fetchAllNfts}
              options={{
                nftAddress: options.nftAddress,
                stakingAddress: options.stakingAddress,
                imageBaseUrl: options.imageBaseUrl,
              }}
            />
          ))}
        {(selectedTab === NFT_TYPE.ALL || selectedTab === NFT_TYPE.ONSALE) &&
          marketplaceNfts.map((item: any, index: number) => (
            <NFTItem
              key={`staked-${index}`}
              id={item.token_id}
              item={item}
              rarityRanks={rarityRanks}
              unStakingPeriod={stakingPeriod}
              currentTime={currentTime}
              fetchNFT={fetchAllNfts}
              options={{
                nftAddress: options.nftAddress,
                stakingAddress: options.stakingAddress,
                imageBaseUrl: options.imageBaseUrl,
              }}
            />
          ))}
        {(selectedTab === NFT_TYPE.ALL || selectedTab === NFT_TYPE.STAKED) &&
          stakedNfts.map((item: any, index: number) => (
            <NFTItem
              key={`staked-${index}`}
              id={item.token_id}
              item={item}
              rarityRanks={rarityRanks}
              unStakingPeriod={stakingPeriod}
              currentTime={currentTime}
              fetchNFT={fetchAllNfts}
              options={{
                nftAddress: options.nftAddress,
                stakingAddress: options.stakingAddress,
                imageBaseUrl: options.imageBaseUrl,
              }}
            />
          ))}
        {(selectedTab === NFT_TYPE.ALL || selectedTab === NFT_TYPE.UNSTAKING) &&
          unstakingNfts.map((item: any, index: number) => (
            <NFTItem
              key={`staked-${index}`}
              id={item.token_id}
              item={item}
              rarityRanks={rarityRanks}
              unStakingPeriod={stakingPeriod}
              currentTime={currentTime}
              fetchNFT={fetchAllNfts}
              options={{
                nftAddress: options.nftAddress,
                stakingAddress: options.stakingAddress,
                imageBaseUrl: options.imageBaseUrl,
              }}
            />
          ))}
        <NoNFTs />
      </NftContainer>
      {/* <Button onClick={distributeRewards}>Distribute Rewards</Button> */}
    </Wrapper>
  );
};

export default NFTs;
