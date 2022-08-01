import { useEffect } from "react";
import { Contracts, ContractType } from "../constant/config";
import useRefresh from "../hooks/useRefresh";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchTokenPriceHistory, fetchTokenPrices } from "./tokenPricesSlice";
import useContract from "../hooks/useContract";
import { setNfts } from "./nftsSlice";

export default function Updater(): null {
  const { refresh, priceRefresh } = useRefresh();
  const dispatch = useAppDispatch();
  const { runQuery } = useContract();
  const tokenPricesHistoryOption = useAppSelector(
    (state) => state.tokenPrices.historyOption
  );
  const account = useAppSelector((state) => state.accounts.keplr);
  useEffect(() => {
    if (!account) return;
    const contractAddress: string[] = [];
    const queries = (
      Object.keys(Contracts.nftContracts) as Array<keyof ContractType>
    ).map((key) => {
      const crrAddress = Contracts.nftContracts[key];
      contractAddress.push(crrAddress);
      return runQuery(crrAddress, {
        tokens: {
          owner: account.address,
          limit: 30,
        },
      });
    });
    try {
      Promise.all(queries).then((queryResults: any) => {
        queryResults.forEach((queryResult: any, index: number) => {
          dispatch(setNfts([contractAddress[index], queryResult]));
        });
      });
    } catch (e) {
      console.error("here error", e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, account]);

  // Token Price History Updater
  useEffect(() => {
    dispatch(
      fetchTokenPriceHistory({
        period: tokenPricesHistoryOption.historyPeriod,
        token: tokenPricesHistoryOption.priceType,
      })
    );
  }, [dispatch, priceRefresh, tokenPricesHistoryOption]);

  // Current & Previous Token Price Updater
  useEffect(() => {
    dispatch(fetchTokenPrices());
  }, [dispatch, priceRefresh]);

  return null;
}
