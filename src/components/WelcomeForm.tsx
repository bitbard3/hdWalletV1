import React from "react";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { updateStep } from "@/features/authSlicer";

export default function WelcomeForm() {
  const currentStep = useSelector((state: RootState) => state.auth.currentStep);
  const dispatch = useDispatch();
  const onContinueHandler = () => {
    dispatch(updateStep(currentStep + 1));
  };
  return (
    <div className="flex flex-col items-center ">
      <p className="text-light font-medium text-2xl md:text-3xl">Wallet generated!</p>
      <p className="mt-2.5 md:mt-4 text-xl text-gray-400 text-center">
        Continue to manage and view your wallets
      </p>
      <div className="mt-12 mb-5 w-full">
        <Button className="w-full py-2.5 md:text-lg bg-purple text-gray-900" text="continue" onClick={onContinueHandler} />
      </div>
    </div>
  );
}
