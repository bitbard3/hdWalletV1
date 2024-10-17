import { RootState } from "./store";

export const selectAccount = (state: RootState) => state.auth.account;
