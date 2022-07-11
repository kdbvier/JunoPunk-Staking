import React, { useEffect } from "react";
import { useWalletManager } from "@noahsaso/cosmodal";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";

import { ConnectWallet as Wrapper } from "./styled";
import { LogoutIcon, WalletIcon } from "./SvgIcons";
import { setAccount } from "../../../../app/accountsSlice";

const ConnectWalletButton: React.FC = () => {
  const { connect, disconnect, connectedWallet } = useWalletManager();
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.accounts.keplr);

  useEffect(() => {
    if (!connectedWallet) {
      dispatch(setAccount(null));
    } else {
      const { name: label, address } = connectedWallet;
      dispatch(
        setAccount({
          label,
          address,
        })
      );
    }
  }, [connectedWallet, dispatch]);

  return account ? (
    <Wrapper connected onClick={disconnect}>
      <LogoutIcon />
      {account.label}
    </Wrapper>
  ) : (
    <Wrapper onClick={connect}>
      <WalletIcon />
      Connect Wallet
    </Wrapper>
  );
};

export default ConnectWalletButton;
