import React, { createContext, useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { Contracts } from "../../constant/config";
import useContract from "../../hooks/useContract";
import Dashboard from "./components/Dashboard";
import NFTs from "./components/NFTs";
import Sidebar from "./components/Sidebar";
// import Token from "./components/Token";

import { Wrapper, MainContent } from "./styled";
import { PAGES } from "../../constant/pages";
import { updateElementViewState } from "../../app/elementViewStateSlice";

import punksRarityData from "../../rank_reduce/junopunks.json";
import punksRarityData1 from "../../rank_reduce/junopunks2.json";
import ClaimChecker from "./components/ClaimChecker";

export const CurrentTimeContext = createContext({
  currentTime: Number(new Date()),
});

const Main: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(Number(new Date()));
  // const account = useAppSelector((state) => state.accounts.keplr);
  const dispatch = useAppDispatch();
  const { runQuery } = useContract();

  useEffect(() => {
    const interval = setInterval(async () => {
      const currentTime = await runQuery(Contracts.stakingContracts.genisis, {
        get_current_time: {},
      });
      setCurrentTime(currentTime ? currentTime * 1000 : Number(new Date()));
    }, 5000);

    const updateElementViewStates = () => {
      dispatch(updateElementViewState());
    };
    const me = document.getElementById(PAGES.MAINCONTENT);
    if (!me) return () => clearInterval(interval);

    me.addEventListener("scroll", updateElementViewStates);

    return () => {
      clearInterval(interval);
      me.removeEventListener("scroll", updateElementViewStates);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (account) {
  //     fetchNfts(account.address);
  //   }
  // }, [runQuery, account, fetchNfts]);

  return (
    <CurrentTimeContext.Provider value={{ currentTime }}>
      <Wrapper>
        <Sidebar />
        <MainContent id={PAGES.MAINCONTENT}>
          <Dashboard />
          <ClaimChecker />
          {/* <Token /> */}
          <NFTs
            title="Genesis PUNK NFT"
            options={{
              nftAddress: Contracts.nftContracts.genisis,
              stakingAddress: Contracts.stakingContracts.genisis,
              rarityData: punksRarityData,
            }}
          />
          <NFTs
            title="Martians PUNK NFT"
            options={{
              nftAddress: Contracts.nftContracts.martians,
              stakingAddress: Contracts.stakingContracts.martians,
              rarityData: punksRarityData1,
            }}
          />
        </MainContent>
      </Wrapper>
    </CurrentTimeContext.Provider>
  );
};

export default Main;
