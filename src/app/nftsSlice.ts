import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type NftsType = {
  [key: string]: any;
};

const initialState: NftsType = {};

export const nftsSlice = createSlice({
  name: "nfts",
  initialState,
  reducers: {
    setNfts: (state, action: PayloadAction<[string, any]>) => {
      const [key, data] = action.payload;
      state[key] = data;
    },
  },
});

export const { setNfts } = nftsSlice.actions;

export default nftsSlice.reducer;
