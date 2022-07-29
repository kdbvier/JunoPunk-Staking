import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../../app/hooks";
import InfoCard, { InfoCardProps } from "../../../../components/InfoCard";
import NFTItem from "../../../../components/NFTItem";
import { Contracts } from "../../../../constant/config";
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
  NftContainerTitle,
  NftContainer,
  // StyledButton as Button,
} from "./styled";

const NFTs: React.FC<{ tokens: any; fetchNfts: any }> = ({
  tokens,
  fetchNfts,
}) => {
  const [stakedNfts, setStakedNfts] = useState([]);
  const [stakingPeriod, setStakingPeriod] = useState(0);
  const [totalStaked, setTotalStaked] = useState(0);
  const [sendingTx, setSendingTx] = useState(false);
  const [rarityRanks, setRarityRanks] = useState<any>({});
  const { currentTime } = useContext(CurrentTimeContext);
  const { runQuery, runExecute } = useContract();
  const { isXs, isSm, isMd } = useMatchBreakpoints();
  const isMobile = isXs || isSm || isMd;
  const account = useAppSelector((state: any) => state.accounts.keplr);

  const fetchAllNfts = useCallback(
    async (address: string) => {
      if (address) {
        fetchNfts(address);
        const stakedNft = await runQuery(Contracts.stakingContract, {
          get_my_info: {
            address: address,
          },
        });
        setStakedNfts(stakedNft || []);
      }
    },
    [fetchNfts, runQuery]
  );

  const distributeRewards = useCallback(async () => {
    if (sendingTx) return;
    try {
      setSendingTx(true);
      await runExecute(Contracts.stakingContract, {
        distribute_reward: {},
      });
      toast.success("Successfully Distributed!");
    } catch (e) {
      toast.error("Failed in Distribution!");
    } finally {
      setSendingTx(false);
    }
  }, [runExecute, sendingTx]);

  useEffect(() => {
    (async () => {
      const rarityData =
        await require("../../../../rank_reduce/junopunks.json");
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
  }, []);

  useEffect(() => {
    (async () => {
      if (account) {
        fetchAllNfts(account.address);
      }
      const stakingStateInfo = await runQuery(Contracts.stakingContract, {
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
  }, [runQuery, account, fetchAllNfts, distributeRewards]);

  const handleClaim = async () => {
    if (sendingTx) return;
    const stakedIds: string[] = [];
    stakedNfts.forEach((nft: any) => {
      if (nft.status === "Staked") stakedIds.push(nft.token_id);
    });
    if (stakedIds.length) {
      setSendingTx(true);
      try {
        await runExecute(Contracts.stakingContract, {
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

  const infos: InfoCardProps[] = useMemo(() => {
    let stakedNftsCount = 0,
      unstakingNftsCount = 0,
      totalRewards = 0;
    stakedNfts.forEach((item: any) => {
      if (item.status === "Staked") stakedNftsCount++;
      else if (item.status === "Unstaking") unstakingNftsCount++;
      totalRewards += Number(item.reward || 0);
    });

    return [
      {
        title: "Your Allocation",
        contents: [`${tokens?.tokens?.length || 0} NFTs Available`],
      },
      {
        title: "NFT Staked",
        contents: [`${stakedNftsCount} NFTs Staked`],
      },
      {
        title: "Currently Unstaking",
        contents: [`${unstakingNftsCount} NFTs Unstaking`],
      },
      {
        title: "Your Rewards",
        contents: [`${(totalRewards / 1e6).toFixed(2)} $PUNK Available`],
        buttonOption: {
          title: "Claim",
          onClick: handleClaim,
        },
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stakedNfts, tokens]);

  return (
    <Wrapper id={PAGES.PUNKNFT}>
      <TitleBar>
        <MainTitle>$PUNK NFTs</MainTitle>
        <SubTitle>
          Unstaking Period 27 Days | Weekly Payout All Monday 08:00 UTC
        </SubTitle>
      </TitleBar>
      <SubWrapper>
        <InfoContainer isMobile={isMobile}>
          {infos.map((info: InfoCardProps, index: number) => (
            <InfoCard key={index} {...info} />
          ))}
        </InfoContainer>
        <FooterBar isMobile={isMobile}>
          <FooterContent>Total Punks Staked NFT</FooterContent>
          <FooterBalance>{`${totalStaked}/500`}</FooterBalance>
        </FooterBar>
      </SubWrapper>
      <NftContainerTitle>My NFTs</NftContainerTitle>
      <NftContainer>
        {stakedNfts.map((item: any, index: number) => (
          <NFTItem
            key={`staked-${index}`}
            id={item.token_id}
            item={item}
            rarityRanks={rarityRanks}
            unStakingPeriod={stakingPeriod}
            currentTime={currentTime}
            fetchNFT={fetchAllNfts}
          />
        ))}
        {tokens?.tokens?.map((item: any, index: number) => (
          <NFTItem
            key={`normal-${index}`}
            id={item}
            item={{ token_id: item }}
            rarityRanks={rarityRanks}
            unStakingPeriod={stakingPeriod}
            currentTime={currentTime}
            fetchNFT={fetchAllNfts}
          />
        ))}
      </NftContainer>
      {/* <Button onClick={distributeRewards}>Distribute Rewards</Button> */}
    </Wrapper>
  );
};

export default NFTs;
