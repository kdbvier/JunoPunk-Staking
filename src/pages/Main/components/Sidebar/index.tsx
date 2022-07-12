import React, { useState, useEffect } from "react";

import useMatchBreakpoints from "../../../../hooks/useMatchBreakpoints";
import ConnectWalletButton from "./ConnectWalletButton";
import {
  Wrapper,
  MenuContainer,
  WrapperBackground,
  Logo,
  MenuItem,
  StyledBarIcon as BarIcon,
} from "./styled";
import Menus from "./menus";
import { MenuType } from "./types";

const Sidebar: React.FC = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>(Menus[0].id);
  const { isXs, isSm, isMd, isLg } = useMatchBreakpoints();
  const isMobile = isXs || isSm || isMd || isLg;
  const [expanded, setExpanded] = useState(isMobile);

  const handleClickMenuItem = (menuItem: MenuType) => {
    if (menuItem.link) {
      window.open(menuItem.link);
    } else {
      setSelectedMenuItem(menuItem.id);
    }
  };
  useEffect(() => {
    setExpanded(isMobile);
  }, [isMobile]);

  return (
    <>
      {isMobile && !expanded && (
        <BarIcon onClick={() => setExpanded((prev) => !prev)} />
      )}
      {isMobile && expanded && (
        <WrapperBackground
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(false);
          }}
        />
      )}
      <Wrapper isMobile={isMobile} expanded={!isMobile || expanded}>
        <MenuContainer>
          <Logo />
          {Menus.map((menuItem: MenuType, index: number) => (
            <MenuItem
              selected={selectedMenuItem === menuItem.id}
              onClick={() => handleClickMenuItem(menuItem)}
              key={index}
            >
              <menuItem.icon />
              {menuItem.title}
            </MenuItem>
          ))}
          <ConnectWalletButton />
        </MenuContainer>
      </Wrapper>
    </>
  );
};

export default Sidebar;
