import { RootState } from "@/app/store";
import React from "react";
import { useSelector } from "react-redux";
import BlockChainForm from "./BlockChainForm";
import MnemonicForm from "./MnemonicForm";
import WelcomeForm from "./WelcomeForm";
import ProgressBar from "./ProgressBar";

export default function StepForm() {
  const currentStep = useSelector((state: RootState) => state.auth.currentStep);

  return (
    <>
      {currentStep < 4 && (
        <div className="form px-20 bg-dark rounded-sm py-5 h-fit flex flex-col gap-y-20">
          <ProgressBar />
          {currentStep === 1 && <BlockChainForm />}
          {currentStep === 2 && <MnemonicForm />}
          {currentStep === 3 && <WelcomeForm />}
        </div>
      )}
    </>
  );
}
