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
  ClaimCheckerContainer,
  ClaimCheckerItem,
  ClaimCheckerTitle,
  ClaimCheckerContent,
  TokenIdInputerContainer,
  TokenIdInputer,
  StyledSvg,
  NftItem,
  NftItemImage,
  NftItemContents,
  NftItemContent,
} from "./styled";

const TOKEN_ID = "JunoPunks";
const MAX_COUNT = 500;

const SearchIcon = ({ ...props }) => (
  <StyledSvg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    {...props}
  >
    <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
  </StyledSvg>
);

const Dashboard: React.FC<{ tokens: any }> = ({ tokens }) => {
  const [tokenIdNumber, setTokenIdNumber] = useState<string>("");
  const [claimCheckResult, setClaimCheckResult] = useState<{
    id: string;
    claimStatus: boolean;
  }>();
  const [rewardsAirdrop, setRewardsAirdrop] = useState();
  const { isXs, isSm, isMd } = useMatchBreakpoints();
  const isMobile = isXs || isSm || isMd;
  const account = useAppSelector((state) => state.accounts.keplr);
  const { runQuery, runExecute } = useContract();

  const url = `https://hopegalaxy.mypinata.cloud/ipfs/Qmbsmj4q3cAZdqkFvFBq4zBrHtzXf4FzDTMQQm9MHcB2yb/${claimCheckResult?.id}.png`;

  const claimChecker = async (tokenId: string): Promise<boolean> => {
    const tokens: any = await runQuery(Contracts.nftContract, {
      all_nft_info: {
        token_id: tokenId,
      },
    });
    const address = tokens?.access?.owner;
    const claimAmount = await runQuery(Contracts.stakingContract, {
      get_claim_amount: {
        id: [tokenId],
        address,
      },
    });
    return Number(claimAmount) === 0;
  };

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

  const handleChangeSearchTokenId = (e: any) => {
    const { value } = e.target;
    const number = Number(value.split(".").pop());
    if (isNaN(number)) return;
    setTokenIdNumber(number ? "" + Math.min(number, MAX_COUNT) : "");
  };

  const handleCheckClaim = async () => {
    try {
      const claimResult = await claimChecker(`JunoPunks.${tokenIdNumber}`);
      setClaimCheckResult({
        id: tokenIdNumber,
        claimStatus: claimResult,
      });
    } catch (err) {}
  };

  const handleKeyUp = (e: any) => {
    if (e.key === "Enter" && tokenIdNumber) {
      handleCheckClaim();
    }
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
              disabled={!account || !Number(rewardsAirdrop)}
              onClick={handleClaimAirdrop}
            >
              {/* {`Claim ${
                rewardsAirdrop ? Number(rewardsAirdrop) / 1e6 : ""
              } $PUNK Token`} */}
              $PUNK GENESIS
            </ClaimButton>
            <ClaimButton>$PUNK MARTIANS</ClaimButton>
          </ClaimButtonContainer>
        </AirDropContent>
        {!isMobile && <AirDropImage />}
      </AirDropContainer>
      <ClaimCheckerContainer>
        <ClaimCheckerItem>
          <ClaimCheckerTitle>Find your Genesis Punks</ClaimCheckerTitle>
          <ClaimCheckerContent>
            <TokenIdInputerContainer>
              <TokenIdInputer
                value={`${TOKEN_ID}.${tokenIdNumber}`}
                onChange={handleChangeSearchTokenId}
                onKeyUp={handleKeyUp}
                placeholder="Please input token id"
              />
              <SearchIcon onClick={handleCheckClaim} />
            </TokenIdInputerContainer>
            {claimCheckResult && (
              <NftItem>
                <NftItemImage src={url} alt="" />
                <NftItemContents>
                  <NftItemContent>{`JunoPunks.${claimCheckResult.id}`}</NftItemContent>
                  <NftItemContent
                    backgroundColor={
                      claimCheckResult.claimStatus ? "#4062FF" : "#66C24F"
                    }
                  >
                    {claimCheckResult.claimStatus ? "Claimed" : "Claimable"}
                  </NftItemContent>
                </NftItemContents>
              </NftItem>
            )}
          </ClaimCheckerContent>
        </ClaimCheckerItem>
        <ClaimCheckerItem>
          <ClaimCheckerTitle>Find your Martians Punks</ClaimCheckerTitle>
          <ClaimCheckerContent>
            <TokenIdInputerContainer>
              <TokenIdInputer
                // value={`${TOKEN_ID}.${tokenIdNumber}`}
                // onChange={handleChangeSearchTokenId}
                // onKeyUp={handleKeyUp}
                placeholder="Please input token id"
              />
              <SearchIcon onClick={handleCheckClaim} />
            </TokenIdInputerContainer>
            {/* {claimCheckResult && (
              <NftItem>
                <NftItemImage src={url} alt="" />
                <NftItemContents>
                  <NftItemContent>{`JunoPunks.${claimCheckResult.id}`}</NftItemContent>
                  <NftItemContent
                    backgroundColor={
                      claimCheckResult.claimStatus ? "#4062FF" : "#66C24F"
                    }
                  >
                    {claimCheckResult.claimStatus ? "Claimed" : "Claimable"}
                  </NftItemContent>
                </NftItemContents>
              </NftItem>
            )} */}
          </ClaimCheckerContent>
        </ClaimCheckerItem>
      </ClaimCheckerContainer>
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
