import { useEffect } from "react";
import useRefresh from "../hooks/useRefresh";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchTokenPriceHistory, fetchTokenPrices } from "./tokenPricesSlice";

export default function Updater(): null {
  const {
    // refresh,
    priceRefresh,
  } = useRefresh();
  const dispatch = useAppDispatch();
  const tokenPricesHistoryOption = useAppSelector(
    (state) => state.tokenPrices.historyOption
  );
  // const account = useAppSelector((state) => state.accounts.keplr);
  // useEffect(() => {
  //   console.log("here", account);
  // }, [refresh, account]);

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
