import { Blockchains } from "@/constants/blockchainConfig";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type BlockchainType = keyof typeof Blockchains;
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
  blockchain: "solana",
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
    addAccount: (state, action: PayloadAction<KeyType>) => {
      state.keys.push(action.payload);
    },
  },
});

export const {
  updateStep,
  updateBlockchain,
  updateAccount,
  updateMnenomic,
  addAccount,
} = authSlice.actions;
export default authSlice.reducer;
