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
  const [sendingTx, setSendingTx] = useState(false);
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
      if (account) {
        fetchAllNfts(account.address);
      }
      const stakingStateInfo = await runQuery(Contracts.stakingContract, {
        get_state_info: {},
      });
      setStakingPeriod(stakingStateInfo?.staking_period || 0);
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
          <InfoContainer isMobile={isMobile}>
            {infos.map((info: InfoCardProps, index: number) => (
              <InfoCard key={index} {...info} />
            ))}
          </InfoContainer>
          <FooterBar isMobile={isMobile}>
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
        {/* <Button onClick={distributeRewards}>Distribute Rewards</Button> */}
      </Wrapper>
    </div>
  );
};

export default NFTs;
