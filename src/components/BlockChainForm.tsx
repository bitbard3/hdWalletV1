import { Blockchains, BlockchainType } from "@/constants/blockchainConfig";
import React, { useEffect, useState } from "react";
import BlockchainOptionButton from "./BlockchainOptionButton";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {
  updateKeys,
  updateAccount,
  updateBlockchain,
  updateMnenomic,
  updateStep,
} from "@/features/authSlicer";
import { generateMnemonic } from "bip39";
import { generateWallet } from "@/lib/utlils/generateWallet";

export default function BlockChainForm(): JSX.Element {
  const blockchains = Blockchains;
  const dispatch = useDispatch();
  const currentStep = useSelector((state: RootState) => state.auth.currentStep);
  const currentSelectedBlockchain = useSelector(
    (state: RootState) => state.auth.blockchain
  );
  const account = useSelector((state: RootState) => state.auth.account);
  const mnemonicFromState = useSelector(
    (state: RootState) => state.auth.mnemonic
  );
  const [mnemonicPhrase, setMnemonicPhrase] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [selectedBlockchain, setSelectedBlockchain] = useState<BlockchainType>(
    currentSelectedBlockchain
  );

  useEffect(() => {
    setButtonDisabled(!selectedBlockchain);
  }, [selectedBlockchain]);

  useEffect(() => {
    setSelectedBlockchain(currentSelectedBlockchain);
  }, [currentSelectedBlockchain]);

  const onNextHandler = async () => {
    if (account === 0 || selectedBlockchain != currentSelectedBlockchain) {
      if (selectedBlockchain == "") {
        return;
      }
      dispatch(updateAccount(0));
      dispatch(updateKeys(null));
      dispatch(updateBlockchain(selectedBlockchain));
      const keys = await generateWallet(mnemonicPhrase, selectedBlockchain);
      dispatch(updateKeys(keys));
      dispatch(updateAccount(account + 1));
      setButtonDisabled(false);
      dispatch(updateStep(currentStep + 1));
    }
  };

  useEffect(() => {
    if (!mnemonicFromState) {
      const newMnemonic = generateMnemonic();
      setMnemonicPhrase(newMnemonic);
      dispatch(updateMnenomic(newMnemonic));
    } else {
      setMnemonicPhrase(mnemonicFromState);
    }
  }, [mnemonicFromState, dispatch]);

  const handleBlockchainChange = (name: string) => {
    setSelectedBlockchain(name);
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-light text-2xl md:text-3xl text-center font-medium mb-10">
        Select a Blockchain
      </p>
      <div className="w-full flex-wrap flex flex-col md:flex-row items-center md:items-start justify-between mb-16 md:mb-20 gap-y-3">
        {Object.keys(blockchains).map((blockchainKey) => (
          <BlockchainOptionButton
            key={blockchainKey}
            name={blockchains[blockchainKey].name}
            icon={blockchains[blockchainKey].icon}
            isChecked={selectedBlockchain === blockchains[blockchainKey].name}
            onChange={handleBlockchainChange}
          />
        ))}
      </div>
      <div className="pb-8 w-full">
        <Button
          className="w-full py-2.5 md:text-lg bg-purple text-gray-900 disabled:bg-neutral-500"
          text="Next"
          onClick={onNextHandler}
          disabled={buttonDisabled}
        />
      </div>
    </div>
  );
}
