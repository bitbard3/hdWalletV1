import { Blockchains } from "@/constants/blockchainConfig";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface AuthState {
  currentStep: number;
  blockchain: keyof typeof Blockchains | null;
  account: number;
}

const initialState: AuthState = {
  currentStep: 1,
  blockchain: null,
  account: 0,
};

export type BlockchainType = keyof typeof Blockchains | null;

      
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    updateBlockchain: (
      state,
      action: PayloadAction<BlockchainType>
    ) => {
      state.blockchain = action.payload;
    },
    updateAccount: (state, action: PayloadAction<number>) => {
      state.account = action.payload;
    },
  },
});

export const { updateStep, updateBlockchain, updateAccount } =
  authSlice.actions;
export default authSlice.reducer;

