import { selectAccount } from "@/app/selector";
import { store } from "@/app/store";
import { SiSolana } from "react-icons/si";
import { SiEthereum } from "react-icons/si";
import { IconType } from "react-icons";
export type Blockchain = {
  name: string;
  derivationPath: string;
  icon: IconType;
};

export type BlockchainConfig = {
  [key: string]: Blockchain;
};

export const Blockchains: BlockchainConfig = {
  solana: {
    name: "solana",
    derivationPath: "m/44'/501'/x'/0'",
    icon: SiSolana,
  },
  ethereum: {
    name: "ethereum",
    derivationPath: "m/44'/60'/x'/0'",
    icon: SiEthereum,
  },
} as const;

export const getDerivationPath = (
  blockchain: keyof typeof Blockchains
): string => {
  const path = Blockchains[blockchain].derivationPath;
  const account = selectAccount(store.getState());
  return path.replace("x", account.toString());
};
