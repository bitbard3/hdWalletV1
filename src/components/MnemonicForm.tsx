import React, { useEffect, useState } from "react";
import { generateMnemonic } from "bip39";
import { Buffer } from "buffer";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {
  updateStep,
  updateMnenomic,
  addKeys,
  updateAccount,
} from "@/features/authSlicer";
import { generateWallet } from "@/lib/utlils/generateWallet";
window.Buffer = Buffer;

export default function MnemonicForm() {
  const dispatch = useDispatch();
  const currentStep = useSelector((state: RootState) => state.auth.currentStep);
  const blockchain = useSelector((state: RootState) => state.auth.blockchain);
  const account = useSelector((state: RootState) => state.auth.account);
  const mnemonicFromState = useSelector(
    (state: RootState) => state.auth.mnemonic
  );
  const [mnemonicPhrase, setMnemonicPhrase] = useState<string>("");

  useEffect(() => {
    if (!mnemonicFromState) {
      const newMnemonic = generateMnemonic();
      setMnemonicPhrase(newMnemonic);
      dispatch(updateMnenomic(newMnemonic));
    } else {
      setMnemonicPhrase(mnemonicFromState);
    }
  }, [mnemonicFromState, dispatch]);

  const mnemonicArr = mnemonicPhrase.split(" ");

  const onNextHandler = async () => {
    dispatch(updateStep(currentStep + 1));
    if (account === 0) {
      const keys = await generateWallet(mnemonicPhrase, blockchain);
      dispatch(addKeys(keys));
      dispatch(updateAccount(account + 1));
    }
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-light font-medium text-3xl">Secret Recovery Phrase</p>
      <p className="mt-4 text-xl text-yellow-500">
        Save these words to recover your wallet
      </p>
      <div className="w-full grid grid-cols-3 gap-3 mt-7">
        {mnemonicArr.map((word, index) => (
          <div
            key={index}
            className="px-1 py-2 bg-gray-100 rounded shadow text-center"
          >
            {index + 1}. {word}
          </div>
        ))}
      </div>
      <div className="mt-10 pb-4 w-full">
        <Button
          className="w-full py-2.5 text-lg bg-purple text-gray-900"
          text="Generate Wallet"
          onClick={onNextHandler}
        />
      </div>
    </div>
  );
}
