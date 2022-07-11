import React from "react";
import InfoCard, { InfoCardProps } from "../../../../components/InfoCard";

import {
  Wrapper,
  TitleBar,
  MainTitle,
  SubTitle,
  InfoContainer,
  FooterBar,
  FooterContent,
  FooterBalance,
} from "./styled";

const Token: React.FC = () => {
  const infos: InfoCardProps[] = [
    {
      title: "Your Allocation",
      contents: ["100 $PUNK Available"],
      buttonOption: {
        title: "Stake",
      },
    },
    {
      title: "Staked $PUNK",
      contents: ["2000 $PUNK Available"],
      buttonOption: {
        title: "Unstake",
      },
    },
    {
      title: "Currently Unstaking",
      contents: ["15 Days 6 hours", "Remaining", "1000 $PUNK"],
      buttonOption: {
        title: "Not Claimable",
      },
    },
    {
      title: "Your Rewards",
      contents: ["121 $PUNK Available"],
      buttonOption: {
        title: "Claim",
      },
    },
  ];

  return (
    <div id="punkToken">
      <Wrapper>
        <TitleBar>
          <MainTitle>$PUNK Token</MainTitle>
          <SubTitle>Unstaking Period 27 Days | Daily Payout 08:00 UTC</SubTitle>
        </TitleBar>
        <InfoContainer>
          {infos.map((info: InfoCardProps, index: number) => (
            <InfoCard key={index} {...info} />
          ))}
        </InfoContainer>
        <FooterBar>
          <FooterContent>TotalTokenStaked on JunoPunk.io</FooterContent>
          <FooterBalance>145.745 $PUNK</FooterBalance>
        </FooterBar>
      </Wrapper>
    </div>
  );
};

export default Token;
