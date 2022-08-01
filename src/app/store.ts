import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import accountsSlice from "./accountsSlice";
import tokenPricesSlice from "./tokenPricesSlice";
import elementViewStateSlice from "./elementViewStateSlice";
import nftsSlice from "./nftsSlice";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = persistReducer(
  persistConfig,
  combineReducers({
    nfts: nftsSlice,
    accounts: accountsSlice,
    tokenPrices: tokenPricesSlice,
    elementViewState: elementViewStateSlice,
  })
);

export const store = configureStore({
  reducer,
  // middleware: (mw) => mw({ serializableCheck: false }),
  middleware: (mw) => mw({ immutableCheck: false, serializableCheck: false }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
