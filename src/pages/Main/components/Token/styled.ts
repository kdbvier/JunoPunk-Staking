import styled from "styled-components";
import Card from "../../../../components/Card";

export const Wrapper = styled(Card)`
  padding: 32px 40px 32px 52px;
`;

export const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
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

export const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 35px;
`;

export const FooterBar = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const FooterContent = styled(NormalText)``;

export const FooterBalance = styled(NormalText)`
  font-weight: bold;
  margin-left: 24px;
`;
