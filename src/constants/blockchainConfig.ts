import { selectAccount } from "@/app/selector";
import { store } from "@/app/store";
export type Blockchain = {
  name: string;
  derivationPath: string;
};

export type BlockchainConfig = {
  [key: string]: Blockchain;
};

export const Blockchains = {
  solana: {
    name: "solana",
    derivationPath: "m/44'/501'/x'/0'",
  },
  ethereum: {
    name: "ethereum",
    derivationPath: "m/44'/60'/x'/0'",
  },
} as const;

export const getDerivationPath = (blockchain: keyof typeof Blockchains): string => {
    const path = Blockchains[blockchain].derivationPath
    const account = selectAccount(store.getState())
    return  path.replace('x',account.toString())
}