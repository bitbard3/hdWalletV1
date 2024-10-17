export type Blockchain = {
    name: string;
    derivationPath: string;
};

export type BlockchainConfig = {
    [key: string]: Blockchain;
};

export const Blockchains:BlockchainConfig={
    solana:{
        name:'solana',
        derivationPath:"m/44'/501'/x'/0'"
    },
    ethereum:{
        name:'ethereum',
        derivationPath:"m/44'/60'/x'/0'"
    }
}