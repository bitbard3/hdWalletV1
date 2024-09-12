import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface AuthState {
  currentStep: number;
}

const initialState: AuthState = {
  currentStep: 1,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
  },
});

export const { updateStep } = authSlice.actions;
export default authSlice.reducer;
