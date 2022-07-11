import React from "react";

import {
  Wrapper,
  InfoContainer,
  InfoTitle,
  InfoContent,
  StyledButton,
} from "./styled";

export interface InfoCardProps {
  title: string;
  contents: string[];
  buttonOption?: {
    title: string;
    onClick?: () => {};
  };
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  contents,
  buttonOption,
}) => {
  return (
    <Wrapper>
      <InfoContainer>
        <InfoTitle>{title}</InfoTitle>
        {contents.map((content: string, index: number) => (
          <InfoContent key={index}>{content}</InfoContent>
        ))}
      </InfoContainer>
      {buttonOption && (
        <StyledButton onClick={buttonOption.onClick}>
          {buttonOption.title}
        </StyledButton>
      )}
    </Wrapper>
  );
};

export default InfoCard;
