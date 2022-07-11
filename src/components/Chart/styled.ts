import styled from "styled-components";
import Select from "react-select";

export const Wrapper = styled.div`
  width: 100%;
  background-color: white;
  box-shadow: 0px 0px 40px rgba(48, 73, 191, 0.04);
  border-radius: 24px;
  margin-top: 24px;
`;

export const ControlPanel = styled.div`
  height: 50px;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
`;

export const StyledSelect = styled(Select)`
  width: max-content;
`;

export const TokenTypeContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const TokenImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  margin-right: 10px;
`;

export const TokenName = styled.div`
  color: black;
  font-size: 18px;
  user-select: none;
`;

export const ChartContainer = styled.div`
  height: 720px;
`;
