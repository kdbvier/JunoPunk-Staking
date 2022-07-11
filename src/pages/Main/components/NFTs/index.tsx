import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { useAppSelector } from "../../../../app/hooks";
import InfoCard, { InfoCardProps } from "../../../../components/InfoCard";
import NFTItem from "../../../../components/NFTItem";
import { Contracts } from "../../../../constant/config";
import useContract from "../../../../hooks/useContract";
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
} from "./styled";

const NFTs: React.FC<{ tokens: any; fetchNfts: any }> = ({
  tokens,
  fetchNfts,
}) => {
  const [stakedNfts, setStakedNfts] = useState([]);
  const [stakingPeriod, setStakingPeriod] = useState(0);
  const { currentTime } = useContext(CurrentTimeContext);
  const { runQuery } = useContract();
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

  useEffect(() => {
    (async () => {
      if (account) {
        fetchAllNfts(account.address);
      }
      const stakingStateInfo = await runQuery(Contracts.stakingContract, {
        get_state_info: {},
      });
      setStakingPeriod(stakingStateInfo?.staking_period || 0);
    })();
  }, [runQuery, account, fetchAllNfts]);

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
        },
      },
    ];
  }, [stakedNfts, tokens]);

  return (
    <div id="punkNft">
      <Wrapper>
        <TitleBar>
          <MainTitle>$PUNK NFTs</MainTitle>
          <SubTitle>Unstaking Period 27 Days | Daily Payout 08:00 UTC</SubTitle>
        </TitleBar>
        <SubWrapper>
          <InfoContainer>
            {infos.map((info: InfoCardProps, index: number) => (
              <InfoCard key={index} {...info} />
            ))}
          </InfoContainer>
          <FooterBar>
            <FooterContent>Total Punks Genesis NFT</FooterContent>
            <FooterBalance>145/500</FooterBalance>
          </FooterBar>
        </SubWrapper>
        <NftContainerTitle>My NFTs</NftContainerTitle>
        <NftContainer>
          {stakedNfts.map((item: any, index: number) => (
            <NFTItem
              key={`staked-${index}`}
              id={item.token_id}
              item={item}
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
              unStakingPeriod={stakingPeriod}
              currentTime={currentTime}
              fetchNFT={fetchAllNfts}
            />
          ))}
        </NftContainer>
      </Wrapper>
    </div>
  );
};

export default NFTs;
