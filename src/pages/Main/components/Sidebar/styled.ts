import styled, { css, keyframes } from "styled-components";
import { BarIcon } from "../../../../components/SvgIcons";

export const MenuContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

export const WrapperBackground = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

export const StyledBarIcon = styled(BarIcon)`
  position: fixed;
  left: 20px;
  top: 20px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  z-index: 2;
`;

export const Logo = styled.div`
  background: url("./images/Juno-Punks-logo.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 51px;
  margin-top: 47px;
  margin-bottom: 36px;
`;

export const StyledSvg = styled.svg`
  /* position: absolute;
  left: 27px; */
  margin-right: 19px;
`;

export const SidebarItem = styled.div`
  width: 207px;
  height: 64px;
  position: relative;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  user-select: none;
  padding-left: 27px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const MenuItem = styled(SidebarItem)<{ selected: boolean }>`
  margin-top: 17px;
  cursor: pointer;
  border-radius: 16px;
  transition: all 0.3s;

  ${({ selected }) =>
    selected
      ? css`
          background-color: #4062ff;
          color: white;
          ${StyledSvg} {
            path {
              fill: white;
            }
          }
        `
      : css`
          background-color: transparent;
          color: #b8bed9;
          ${StyledSvg} {
            path {
              fill: #b8bed9;
            }
          }
        `}
`;

export const ConnectWallet = styled(SidebarItem)<{ connected?: boolean }>`
  margin-top: 117px;
  margin-bottom: 50px;
  color: ${({ connected }) => (connected ? "#FF4842" : "#002dff")};
  cursor: pointer;
`;

export const SidebarFooter = styled.div`
  font-weight: 700;
  font-size: 11px;
  line-height: 13px;
  display: flex;
  align-items: center;
  color: #000000;
  position: absolute;
  bottom: 10px;
`;

const expandAnimation = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const collapseAnimation = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
`;

export const Wrapper = styled.div<{ isMobile?: boolean; expanded?: boolean }>`
  width: 315px;
  max-width: 315px;
  height: 100vh;
  background-color: #f2f8ff;
  overflow-y: auto;
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} 500ms linear forwards
        `
      : css`
          ${collapseAnimation} 500ms linear forwards
        `};
  ${({ isMobile }) =>
    isMobile &&
    css`
      position: fixed;
      z-index: 1;
      width: 100%;
      ${Logo} {
        margin-top: 20px;
        margin-bottom: 20px;
      }
      ${MenuItem} {
        margin-top: 10px;
      }
      ${ConnectWallet} {
        margin-top: 20px;
      }
    `}
`;
