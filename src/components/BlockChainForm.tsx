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

  const [selectedBlockchain, setSelectedBlockchain] = useState<BlockchainType>(
    currentSelectedBlockchain
  );

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
  const onNextHandler = async () => {
    if (account === 0 || selectedBlockchain != currentSelectedBlockchain) {
      dispatch(updateAccount(0));
      dispatch(updateKeys(null));
      dispatch(updateBlockchain(selectedBlockchain));
      const keys = await generateWallet(mnemonicPhrase, selectedBlockchain);
      dispatch(updateKeys(keys));
      dispatch(updateAccount(account + 1));
    }
    dispatch(updateMnenomic(mnemonicPhrase));
    dispatch(updateStep(currentStep + 1));
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-light text-3xl font-medium mb-10">
        Select a Blockchain
      </p>
      <div className="w-full flex-wrap flex justify-between mb-20">
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
          className="w-full py-2.5 text-lg bg-purple text-gray-900"
          text="Next"
          onClick={onNextHandler}
        />
      </div>
    </div>
  );
}
