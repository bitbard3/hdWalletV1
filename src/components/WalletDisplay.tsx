import { RootState } from "@/app/store";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { generateWallet } from "@/lib/utlils/generateWallet";
import { addKeys } from "@/features/authSlicer";

export default function WalletDisplay() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state: RootState) => state.auth.blockchain);

  const mnemonic = useSelector((state: RootState) => state.auth.mnemonic);
  const keys = useSelector((state: RootState) => state.auth.keys);
  console.log(keys);

  const onAddHandler = async () => {
    const wallet = await generateWallet(mnemonic, blockchain);
    dispatch(addKeys(wallet));
  };

  const onClearHandler = () => {};
  return (
    <div className="mt-20 flex flex-col w-full">
      <div className="flex justify-between w-full items-center">
        <p className="text-dark font-bold text-4xl capitalize">
          Your {blockchain} Wallets
        </p>
        <div className="flex items-center gap-x-3">
          <Button
            text="add wallet"
            className="bg-dark text-lg py-2 px-3 font-medium text-neutral-200"
            onClick={onAddHandler}
          />
          <Button
            text="clear wallets"
            className="bg-red-700 text-neutral-200 py-2 px-3 text-lg"
            onClick={onClearHandler}
          />
        </div>
      </div>
      <div className="grid grid-cols-1  mt-10  gap-y-10">
        {keys.map((key, index) => (
          <div className="flex flex-col bg-dark rounded-md pt-8 ">
            <div className="flex justify-between items-center px-16">
              <p className="text-light text-3xl font-medium">
                Account {index + 1}
              </p>
            </div>
            <div className="flex flex-col mt-6 bg-light bg-opacity-10 py-3  px-16 rounded-t-3xl">
              <p className="text-white text-xl font-medium">Public Key</p>
              <p className="text-md mt-2 text-white overflow-hidden overflow-ellipsis">
                {key.publicKey}
              </p>
              <p className="text-white text-xl font-medium mt-5">Public Key</p>
              <p className="text-md mt-2 text-white overflow-hidden overflow-ellipsis">
                {key.privateKey}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
