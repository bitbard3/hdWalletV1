import { getDerivationPath } from "@/constants/blockchainConfig";
import { BlockchainType, KeyType } from "@/features/authSlicer";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Buffer } from "buffer";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import { Wallet, HDNodeWallet } from "ethers";
import bs58 from "bs58";

type Seed = Buffer;

export const generateSolanaKeys = (seed: Seed, path: string): KeyType => {
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  const keyPair = Keypair.fromSecretKey(secret);
  const keys: KeyType = {
    publicKey: keyPair.publicKey.toString(),
    privateKey: bs58.encode(keyPair.secretKey),
  };
  return keys;
};

export const generateEthKeys = (seed: Seed, path: string): KeyType => {
  const hdNode = HDNodeWallet.fromSeed(seed);
  const child = hdNode.derivePath(path);
  const privateKey = child.privateKey;
  const wallet = new Wallet(privateKey);
  const keys: KeyType = {
    publicKey: wallet.address,
    privateKey: privateKey,
  };
  return keys;
};

export const generateWallet = async (
  mnemonic: string,
  blockchain: BlockchainType
): Promise<KeyType> => {
  const seed: Seed = await mnemonicToSeed(mnemonic);
  const path = getDerivationPath(blockchain);
  if (blockchain == "solana") {
    return generateSolanaKeys(seed, path);
  } else if (blockchain == "ethereum") {
    return generateEthKeys(seed, path);
  } else {
    throw new Error("Unsupported blockchain type");
  }
};
