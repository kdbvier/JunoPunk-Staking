import styled, { css } from "styled-components";

const borderColors: { [key: string]: string } = {
  "On Sale": "#FF0000 ",
  Available: "#39C639",
  Staked: "#FF9100",
  Unstaked: "#FF9100",
};

const buttonColors: { [key: string]: string } = {
  Transfer: "#03009F",
  Withdraw: "#39C639",
  Sell: "#FF0000",
  Stake: "#FF9100",
  Unstake: "#FF9100",
};

export const NFTItemWrapper = styled.div<{ nftItemStatus: string }>`
  width: 250px;
  background-color: white;
  border: 5px solid
    ${({ nftItemStatus }) => borderColors[nftItemStatus] || "#FFFFFF"};
  position: relative;

  /* @media (max-width: 768px) {
    width: 200px;
  }

  @media (max-width: 425px) {
    width: 200px;
  } */
`;

export const NFTItemImage = styled.img`
  border-radius: 30px;
  margin: 15px 15px 0 15px;
  width: calc(100% - 30px);
  min-height: 220px;

  /* background-image: linear-gradient(to bottom, #6f2987, #232c63);
  padding: 30px 20px 0 20px;
  border-radius: 30px;
  border: 5px solid #f59186; */
`;

export const NFTItemBadge = styled.div<{ nftItemStatus: string }>`
  background-color: ${({ nftItemStatus }) =>
    borderColors[nftItemStatus] || "#FFFFFF"};
  font-weight: 700;
  font-size: 20px;
  text-align: center;
  width: 120px;
  height: 30px;
  border-radius: 0px 0px 10px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NFTItemImageDownloadIcon = styled.svg`
  position: absolute;
  right: 7px;
  top: 5px;
  cursor: pointer;
`;

export const NFTItemInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 15px;
`;

export const NFTItemInfo = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: black;
  text-align: left;
`;

export const NFTItemOperationCell = styled.div`
  color: black;
  width: 30%;
  font-size: 16px;
  font-weight: 300;
`;

export const NFTItemOperationButton = styled.div<{
  buttonType: string;
  disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: relative;
  border-radius: 10px;
  user-select: none;
  height: 45px;
  /* width: 33%; */
  width: ${({ buttonType }) => (buttonType === "Transfer" ? "33%" : "50%")};
  margin: 10px 0;
  color: #fff;
  font-size: ${({ buttonType }) =>
    buttonType === "Transfer" ? "14px" : "20px"};
  font-weight: bold;
  background-color: ${({ buttonType }) => buttonColors[buttonType]};
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  cursor: ${({ disabled }) => (disabled ? "no-drop" : "pointer")};
  &:hover {
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
      0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  }
`;

export const NFTItemTransferAddress = styled.input`
  width: calc(64% - 40px);
  height: 45px;
  border: 1px solid #000000;
  border-radius: 10px;
  position: relative;
  color: black;
  padding: 0 20px;
`;

export const NFTItemOperationContainer = styled.div<{ disabled?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 15px;
  position: relative;
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  ${({ disabled }) =>
    disabled &&
    css`
      ${NFTItemOperationButton} {
        cursor: no-drop;
      }
      ${NFTItemTransferAddress} {
        cursor: no-drop;
      }
    `}
`;

export const JunoWalletIndicator = styled.span`
  position: absolute;
  top: -25px;
  right: 10px;
  color: black;
  font-weight: 300;
  font-size: 16px;
  line-height: 43px;
`;

export const RarityRankContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  top: 0;
  right: 50px;
`;

export const RarityRankContent = styled.div<{ bold?: boolean }>`
  font-size: 14px;
  line-height: 36px;
  font-weight: normal;

  ${({ bold }) =>
    bold &&
    css`
      font-weight: bold;
    `}
  &:first-child {
    padding-right: 5px;
  }
`;
