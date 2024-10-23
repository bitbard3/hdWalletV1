import { BlockchainType } from "@/constants/blockchainConfig";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type KeyType = {
  publicKey: string;
  privateKey: string;
};
export interface AuthState {
  currentStep: number;
  blockchain: BlockchainType;
  account: number;
  mnemonic: string;
  keys: KeyType[];
}

const initialState: AuthState = {
  currentStep: 1,
  blockchain: "",
  account: 0,
  mnemonic: "",
  keys: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    updateBlockchain: (state, action: PayloadAction<BlockchainType>) => {
      state.blockchain = action.payload;
      state.mnemonic = "";
    },
    updateAccount: (state, action: PayloadAction<number>) => {
      state.account = action.payload;
    },
    updateMnenomic: (state, action: PayloadAction<string>) => {
      state.mnemonic = action.payload;
    },
    updateKeys: (state, action: PayloadAction<KeyType | null>) => {
      if (action.payload === null) {
        state.keys = [];
      } else {
        state.keys.push(action.payload);
      }
    },
    removeKeys: (state, action: PayloadAction<string>) => {
      state.keys = state.keys.filter((key) => key.publicKey !== action.payload);
      state.account -= 1;
    },
  },
});

export const {
  updateStep,
  updateBlockchain,
  updateAccount,
  updateMnenomic,
  updateKeys,
  removeKeys,
} = authSlice.actions;
export default authSlice.reducer;
