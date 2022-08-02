import React from "react";

// import { createBrowserHistory } from "history";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";
import { ToastContainer } from "react-toastify";
import { WalletManagerProvider, WalletType } from "@noahsaso/cosmodal";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import junoPresets from "./constant/junoPresets";
import Main from "./pages/Main";
import Updater from "./app/Updater";

// const history = createBrowserHistory();

setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.64/dist/"
);
function App() {
  const config = junoPresets;

  return (
    <WalletManagerProvider
      defaultChainId={config.chainId}
      enabledWalletTypes={[WalletType.Keplr, WalletType.WalletConnectKeplr]}
      localStorageKey="keplr-wallet"
      walletConnectClientMeta={{
        name: "Juno Punks App",
        description: "Juno Punks App",
        url: window.location.origin,
        icons: [`${window.location.origin}/logo.png`],
      }}
    >
      <Updater />
      <div className="main">
        <Main />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          hideProgressBar
          newestOnTop
          closeOnClick
          theme="colored"
        />
      </div>
    </WalletManagerProvider>
  );
}

export default App;
