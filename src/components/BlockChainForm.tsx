import { Blockchains, BlockchainType } from "@/constants/blockchainConfig";
import React, { useState } from "react";
import BlockchainOptionButton from "./BlockchainOptionButton";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {
  updateBlockchain,
  updateStep,
} from "@/features/authSlicer";

export default function BlockChainForm(): JSX.Element {
  const currentStep = useSelector((state: RootState) => state.auth.currentStep);
  const currentSelectedBlockchain = useSelector(
    (state: RootState) => state.auth.blockchain
  );
  const blockchains = Blockchains;
  const [selectedBlockchain, setSelectedBlockchain] = useState<BlockchainType>(
    currentSelectedBlockchain
  );
  const dispatch = useDispatch();
  const handleBlockchainChange = (name: string) => {
    setSelectedBlockchain(name);
  };
  const onNextHandler = () => {
    dispatch(updateBlockchain(selectedBlockchain));
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
        <Button className="w-full py-2.5 text-lg bg-purple text-gray-900"  text="Next" onClick={onNextHandler} />
      </div>
    </div>
  );
}
