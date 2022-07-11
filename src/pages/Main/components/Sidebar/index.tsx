import React, { useState } from "react";

import ConnectWalletButton from "./ConnectWalletButton";
import { Wrapper, Logo, MenuItem } from "./styled";
import Menus from "./menus";
import { MenuType } from "./types";

const Sidebar: React.FC = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>(Menus[0].id);

  const handleClickMenuItem = (menuItem: MenuType) => {
    if (menuItem.link) {
      window.open(menuItem.link);
    } else {
      setSelectedMenuItem(menuItem.id);
    }
  };

  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default Sidebar;
