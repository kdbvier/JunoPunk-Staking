import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AccountsType = {
  keplr: { address: string; label: string } | null;
  contracts: { [key: string]: any };
};

const initialState: AccountsType = {
  keplr: null,
  contracts: {},
};

export const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<any>) => {
      state["keplr"] = action.payload;
    },
    setContract: (state, action: PayloadAction<[string, any]>) => {
      const [key, data] = action.payload;
      state["contracts"][key] = data;
    },
    clearAccounts: (state) => {
      state["keplr"] = null;
      state["contracts"] = {};
    },
  },
});

export const { setAccount, setContract, clearAccounts } = accountsSlice.actions;

export default accountsSlice.reducer;
