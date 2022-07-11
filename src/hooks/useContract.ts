import {
  CosmWasmClient,
  SigningCosmWasmClient,
} from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";
import { coins } from "@cosmjs/proto-signing";
import {
  useWallet,
  // useWalletManager
} from "@noahsaso/cosmodal";
import { useCallback } from "react";

import { toMicroAmount } from "../utils/coins";
import config from "../constant/config";
import { useAppSelector } from "../app/hooks";

const useContract = () => {
  const account = useAppSelector((state) => state.accounts.keplr);
  const { offlineSigner, signingCosmWasmClient } = useWallet(config.chainId);

  const runQuery = useCallback(
    async (contractAddress: string, queryMsg: any) => {
      if (signingCosmWasmClient) {
        const result = await signingCosmWasmClient?.queryContractSmart(
          contractAddress,
          queryMsg
        );
        return result;
      } else {
        const client = await CosmWasmClient.connect(config["rpcEndpoint"]);
        const result = await client.queryContractSmart(
          contractAddress,
          queryMsg
        );
        return result;
      }
    },
    [signingCosmWasmClient]
  );

  const runExecute = useCallback(
    async (
      contractAddress: string,
      executeMsg: any,
      option?: {
        memo?: string;
        funds?: string;
      }
    ) => {
      if (!offlineSigner || !account) {
        throw new Error("No account selected");
      }

      const executeMemo = option?.memo;
      const executeFunds = option?.funds;

      const cwClient = await SigningCosmWasmClient.connectWithSigner(
        config["rpcEndpoint"],
        offlineSigner,
        {
          gasPrice: GasPrice.fromString(
            `${config["gasPrice"]}${config["microDenom"]}`
          ),
        }
      );

      return cwClient.execute(
        account.address,
        contractAddress,
        executeMsg,
        "auto",
        executeMemo,
        executeFunds
          ? coins(
              toMicroAmount(executeFunds, config["coinDecimals"]),
              config["microDenom"]
            )
          : undefined
      );
    },
    [account, offlineSigner]
  );

  return {
    runQuery,
    runExecute,
  };
};

export default useContract;
