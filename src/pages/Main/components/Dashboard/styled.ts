import styled, { css } from "styled-components";
import Card from "../../../../components/Card";

export const Wrapper = styled(Card)`
  padding: 32px 40px 0 52px;
`;

export const AirDropContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  color: white;
  margin-left: 30px;
`;

export const AirDropContainer = styled.div<{ isMobile: boolean }>`
  width: calc(100% - 70px);
  background-color: #4062ff;
  box-shadow: 0px 0px 40px rgba(48, 73, 191, 0.04);
  border-radius: 24px;
  padding: 23px 31px 23px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ isMobile }) =>
    isMobile &&
    css`
      flex-direction: column;
      ${AirDropContent} {
        align-items: center;
        margin-left: 0;
        margin-top: 10px;
      }
    `}
`;

export const AirDropTitle = styled.div`
  font-weight: 400;
  font-size: 43px;
  line-height: 49px;
`;

export const AirDropSubTitle = styled.div`
  font-weight: 400;
  font-size: 17px;
  line-height: 24px;
  margin: 5px 0 19px;
`;

export const ClaimButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
`;

export const ClaimButton = styled.button`
  color: white;
  background-color: #40baff;
  width: max-content;
  height: 53px;
  border-radius: 16px;
  border: none;
  appearance: none;
  cursor: pointer;
  transition: transform ease-in 0.1s, box-shadow ease-in 0.25s;
  margin: 10px;
  &:focus {
    outline: 0;
  }
  &:active {
    transform: scale(0.9);
    opacity: 0.8;
    box-shadow: 0 2px 25px rgba(255, 0, 130, 0.2);
  }
`;

export const AirDropImage = styled.div`
  background: url("./images/Airdrop.png");
  background-size: cover;
  width: 197px;
  height: 197px;
`;

export const TokenPricesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 130px;
  margin-top: 31px;
`;
