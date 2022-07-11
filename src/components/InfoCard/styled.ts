import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 140px;
  height: 90px;
  padding: 15px;
  background: rgba(48, 73, 191, 0.1);
  border: 1px solid #002dff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

export const InfoTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #002cfa;
`;

export const InfoContent = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #002cfa;
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
