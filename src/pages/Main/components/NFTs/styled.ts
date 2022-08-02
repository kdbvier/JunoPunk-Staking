import styled, { css } from "styled-components";
import Card from "../../../../components/Card";

export const Wrapper = styled(Card)`
  padding: 32px 40px 32px 52px;
`;

export const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 30px;
`;

export const MainTitle = styled.div`
  color: #002cfa;
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 34px;
  margin-right: 54px;
`;

const NormalText = styled.div`
  color: #002cfa;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
`;

export const SubTitle = styled(NormalText)``;

export const SubWrapper = styled.div`
  position: relative;
`;

export const InfoContainer = styled.div<{ isMobile?: boolean }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  grid-row-gap: 10px;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 35px;
`;

export const FooterBar = styled.div<{ isMobile?: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* ${({ isMobile }) =>
    !isMobile &&
    css`
      position: absolute;
      bottom: 0;
    `} */
`;

export const FooterContent = styled(NormalText)``;

export const FooterBalance = styled(NormalText)`
  font-weight: bold;
  margin-left: 24px;
`;

export const NftContainerTitle = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  text-align: left;
  color: #002cfa;
  margin: 20px 0;
`;

export const NftContainer = styled.div`
  /* display: flex;
  flex-wrap: wrap;
  justify-content: space-between; */
  align-items: center;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-items: center;
  grid-gap: 20px;
`;

export const StyledButton = styled.button`
  color: white;
  margin-top: 15px;
  background-color: #40baff;
  width: max-content;
  height: 36px;
  border-radius: 10px;
  border: none;
  appearance: none;
  cursor: pointer;
  transition: transform ease-in 0.1s, box-shadow ease-in 0.25s;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  padding: 7px 24px;
  &:focus {
    outline: 0;
  }
  &:active {
    transform: scale(0.9);
    opacity: 0.8;
    box-shadow: 0 2px 25px rgba(255, 0, 130, 0.2);
  }
`;
