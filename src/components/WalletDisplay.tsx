import { RootState } from "@/app/store";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { generateWallet } from "@/lib/utlils/generateWallet";
import { addKeys, removeKeys } from "@/features/authSlicer";
import IconComponent from "@/lib/utlils/icons";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";
import { copyToClipboard } from "@/lib/utlils/utils";

export default function WalletDisplay() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state: RootState) => state.auth.blockchain);
  const mnemonic = useSelector((state: RootState) => state.auth.mnemonic);
  const keys = useSelector((state: RootState) => state.auth.keys);
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});

  const onAddHandler = async () => {
    const wallet = await generateWallet(mnemonic, blockchain);
    dispatch(addKeys(wallet));
  };

  const onKeysVisibiltyToggle = (pk: string) => {
    setVisibleKeys((prev) => ({
      ...prev,
      [pk]: !prev[pk],
    }));
  };
  const onDeleteWallet = (pk:string)=>{
   dispatch(removeKeys(pk))
   
  }
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
          <div
            className="flex flex-col bg-dark rounded-md pt-8 "
            key={key.publicKey}
          >
            <div className="flex justify-between items-center px-16 gap-x-5">
              <p className="text-light text-3xl font-medium">
                Account {index + 1}
              </p>
              <p onClick={()=>onDeleteWallet(key.publicKey)} className="text-red-700 text-xl cursor-pointer "><IconComponent icon={AiOutlineDelete}/></p>
            </div>
            <div className="flex flex-col mt-6 bg-light bg-opacity-10 py-4  px-16 rounded-t-3xl">
              <p className="text-white text-xl font-medium">Public Key</p>
              <p
                onClick={() => copyToClipboard(key.publicKey)}
                className="text-md mt-2 text-white overflow-hidden cursor-pointer overflow-ellipsis"
              >
                {key.publicKey}
              </p>
              <p className="text-white text-xl font-medium mt-7">Private Key</p>
              <p className="text-md mt-2 text-white overflow-hidden overflow-ellipsis flex justify-between items-center gap-x-5">
                <span
                  className="overflow-hidden overflow-ellipsis cursor-pointer"
                  onClick={() => copyToClipboard(key.privateKey)}
                >
                  {visibleKeys[key.publicKey]
                    ? key.privateKey
                    : "•".repeat(key.privateKey.length)}
                </span>
                <span
                  onClick={() => onKeysVisibiltyToggle(key.publicKey)}
                  className="p-2 hover:bg-neutral-600 rounded-sm text-lg hover:cursor-pointer transition-all duration-150"
                >
                  {visibleKeys[key.publicKey] ? (
                    <IconComponent icon={LuEyeOff} />
                  ) : (
                    <IconComponent icon={LuEye} />
                  )}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
