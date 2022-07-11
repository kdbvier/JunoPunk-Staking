import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../../app/hooks";
import Chart from "../../../../components/Chart";
import TokenPrice from "../../../../components/TokenPrice";
import { Contracts } from "../../../../constant/config";
import useContract from "../../../../hooks/useContract";
import {
  Wrapper,
  AirDropContainer,
  AirDropContent,
  AirDropTitle,
  AirDropSubTitle,
  ClaimButton,
  AirDropImage,
  TokenPricesContainer,
} from "./styled";

const Dashboard: React.FC<{ tokens: any }> = ({ tokens }) => {
  const [rewardsAirdrop, setRewardsAirdrop] = useState();
  const account = useAppSelector((state) => state.accounts.keplr);
  const { runQuery, runExecute } = useContract();

  const getClaimAmount = useCallback(
    async (tokens: any, address: string) => {
      if (address && tokens) {
        const rewards = await runQuery(Contracts.stakingContract, {
          get_claim_amount: {
            id: tokens,
            address: address,
          },
        });
        setRewardsAirdrop(rewards);
      }
    },
    [runQuery]
  );

  useEffect(() => {
    if (account && tokens) {
      getClaimAmount(tokens.tokens, account.address);
    }
  }, [runQuery, account, tokens, getClaimAmount]);

  const handleClaimAirdrop = async () => {
    if (!account || !tokens) return;

    await runExecute(Contracts.stakingContract, {
      claim_reward: {
        token_id: tokens.tokens,
      },
    });
    getClaimAmount(tokens.tokens, account.address);
    toast.success("Successfully claimed!");
  };

  return (
    <Wrapper>
      <AirDropContainer>
        <AirDropContent>
          <AirDropTitle>Claim your PunkDrop!</AirDropTitle>
          <AirDropSubTitle>
            All the junoPunks NFT holders are eligible to claim the $PUNKS
            airdrop
          </AirDropSubTitle>
          <ClaimButton
            disabled={!account || !Number(rewardsAirdrop)}
            onClick={handleClaimAirdrop}
          >{`Claim ${
            rewardsAirdrop ? Number(rewardsAirdrop) / 1e6 : ""
          } $PUNK Token`}</ClaimButton>
        </AirDropContent>
        <AirDropImage />
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
