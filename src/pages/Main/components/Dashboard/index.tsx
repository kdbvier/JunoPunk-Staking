import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../../app/hooks";
import Chart from "../../../../components/Chart";
import TokenPrice from "../../../../components/TokenPrice";
import { Contracts } from "../../../../constant/config";
import { PAGES } from "../../../../constant/pages";
import useContract from "../../../../hooks/useContract";
import useMatchBreakpoints from "../../../../hooks/useMatchBreakpoints";
import {
  Wrapper,
  AirDropContainer,
  AirDropContent,
  AirDropTitle,
  AirDropSubTitle,
  ClaimButtonContainer,
  ClaimButton,
  AirDropImage,
  TokenPricesContainer,
} from "./styled";

const Dashboard: React.FC = () => {
  const [rewardsAirdrop, setRewardsAirdrop] = useState<{
    [key: string]: any;
  }>({});
  const { runQuery, runExecute } = useContract();
  const { isXs, isSm, isMd } = useMatchBreakpoints();
  const isMobile = isXs || isSm || isMd;
  const account = useAppSelector((state) => state.accounts.keplr);
  const tokens = useAppSelector((state) => state.nfts);

  const getClaimAmount = useCallback(
    async (tokens: any, address: string, stakingAddress: string) => {
      if (address && tokens) {
        const rewards = await runQuery(stakingAddress, {
          get_claim_amount: {
            id: tokens,
            address: address,
          },
        });
        setRewardsAirdrop((prev) => ({
          ...prev,
          [stakingAddress]: rewards,
        }));
      }
    },
    [runQuery]
  );

  useEffect(() => {
    if (account && tokens[Contracts.nftContracts.genisis]) {
      getClaimAmount(
        tokens[Contracts.nftContracts.genisis].tokens,
        account.address,
        Contracts.stakingContracts.genisis
      );
    }
    if (account && tokens[Contracts.nftContracts.martians]) {
      getClaimAmount(
        tokens[Contracts.nftContracts.martians].tokens,
        account.address,
        Contracts.stakingContracts.martians
      );
    }
  }, [runQuery, account, tokens, getClaimAmount]);

  const handleClaimAirdrop = async (
    nftAddress: string,
    stakingAddress: string
  ) => {
    const crrTokens = tokens[nftAddress];
    if (!account || !crrTokens) return;

    await runExecute(stakingAddress, {
      claim_reward: {
        token_id: crrTokens.tokens,
      },
    });
    getClaimAmount(crrTokens.tokens, account.address, stakingAddress);
    toast.success("Successfully claimed!");
  };

  return (
    <Wrapper id={PAGES.DASHBOARD}>
      <AirDropContainer isMobile={isMobile}>
        {isMobile && <AirDropImage />}
        <AirDropContent>
          <AirDropTitle>Claim your PunkDrop!</AirDropTitle>
          <AirDropSubTitle>
            All the junoPunks NFT and Martians holders are eligible to claim the
            $PUNKS airdrop
          </AirDropSubTitle>
          <ClaimButtonContainer>
            <ClaimButton
              disabled={
                !account ||
                !Number(rewardsAirdrop[Contracts.stakingContracts.genisis])
              }
              onClick={() =>
                handleClaimAirdrop(
                  Contracts.nftContracts.genisis,
                  Contracts.stakingContracts.genisis
                )
              }
            >
              {/* {`Claim ${
                rewardsAirdrop ? Number(rewardsAirdrop) / 1e6 : ""
              } $PUNK Token`} */}
              $PUNK GENESIS
            </ClaimButton>
            <ClaimButton
              disabled={
                !account ||
                !Number(rewardsAirdrop[Contracts.stakingContracts.martians])
              }
              onClick={() =>
                handleClaimAirdrop(
                  Contracts.nftContracts.martians,
                  Contracts.nftContracts.martians
                )
              }
            >
              $PUNK MARTIANS
            </ClaimButton>
          </ClaimButtonContainer>
        </AirDropContent>
        {!isMobile && <AirDropImage />}
      </AirDropContainer>

      <TokenPricesContainer>
        <TokenPrice tokenType="juno" />
        <div />
        {/* <TokenPrice tokenType="punk" /> */}
      </TokenPricesContainer>
      <Chart />
    </Wrapper>
  );
};

export default Dashboard;
