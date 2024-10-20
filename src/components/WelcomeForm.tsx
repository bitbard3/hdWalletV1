import React from "react";
import PrimaryButton from "./PrimaryButton";
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
      <p className="text-light font-medium text-3xl">Wallet generated!</p>
      <p className="mt-4 text-xl text-gray-400 text-center">
        Continue to manage and view your wallets
      </p>
      <div className="mt-12 mb-5 w-full">
        <PrimaryButton text="continue" onClick={onContinueHandler} />
      </div>
    </div>
  );
}
