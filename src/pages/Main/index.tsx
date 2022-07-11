import React, { createContext, useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { Contracts } from "../../constant/config";
import useContract from "../../hooks/useContract";
import Dashboard from "./components/Dashboard";
import NFTs from "./components/NFTs";
import Sidebar from "./components/Sidebar";
// import Token from "./components/Token";

import { Wrapper, MainContent } from "./styled";

export const CurrentTimeContext = createContext({
  currentTime: Number(new Date()),
});

const Main: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(Number(new Date()));
  const [tokens, setTokens] = useState<any>();
  const account = useAppSelector((state) => state.accounts.keplr);
  const { runQuery } = useContract();

  useEffect(() => {
    const interval = setInterval(async () => {
      const currentTime = await runQuery(Contracts.stakingContract, {
        get_current_time: {},
      });
      setCurrentTime(currentTime ? currentTime * 1000 : Number(new Date()));
    }, 5000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchNfts = useCallback(
    async (address: string) => {
      if (address) {
        const tokens = await runQuery(Contracts.nftContract, {
          tokens: {
            owner: address,
            limit: 30,
          },
        });
        setTokens(tokens);
      }
    },
    [runQuery]
  );

  useEffect(() => {
    if (account) {
      fetchNfts(account.address);
    }
  }, [runQuery, account, fetchNfts]);

  return (
    <CurrentTimeContext.Provider value={{ currentTime }}>
      <Wrapper>
        <Sidebar />
        <MainContent>
          <Dashboard tokens={tokens} />
          {/* <Token /> */}
          <NFTs tokens={tokens} fetchNfts={fetchNfts} />
        </MainContent>
      </Wrapper>
    </CurrentTimeContext.Provider>
  );
};

export default Main;
