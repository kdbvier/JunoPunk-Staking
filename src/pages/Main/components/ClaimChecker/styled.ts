import styled, { css } from "styled-components";
import Card from "../../../../components/Card";

export const Wrapper = styled(Card)`
  padding: 32px 40px 30px 52px;
`;

export const StyledSvg = styled.svg`
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin: 0 10px;
`;

export const ClaimCheckerHeader = styled.div`
  display: flex;
  align-items: center;
  color: #002cfa;
  font-size: 30px;
  font-weight: bold;
  svg {
    path {
      fill: #002cfa;
    }
  }
`;

export const ClaimCheckerContainer = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  flex-wrap: wrap;
`;

export const ClaimCheckerItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ClaimCheckerTitle = styled.div`
  font-weight: 700;
  font-size: 15px;
  line-height: 17px;
  color: #b8bed9;
`;

export const ClaimCheckerContent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export const TokenIdInputerContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

export const TokenIdInputer = styled.input`
  margin: 10px 0;
  height: 24px;
  width: 130px;
  background: rgba(217, 217, 217, 0.25);
  border: solid 1px #a6a4a4;
  padding: 0 10px;
`;

export const NftItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NftItemImage = styled.img`
  width: 130px;
  height: 130px;
`;

export const NftItemContents = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: center;
`;

export const NftItemContent = styled.div<{ backgroundColor?: string }>`
  font-weight: 700;
  font-size: 14px;
  line-height: 13px;
  padding: 5px;

  color: #000000;
  ${({ backgroundColor }) =>
    backgroundColor
      ? css`
          background-color: ${backgroundColor};
          color: white;
        `
      : css`
          color: black;
        `}
`;
