import { RootState } from "@/app/store";
import React from "react";
import { useSelector } from "react-redux";
import BlockChainForm from "./BlockChainForm";
import MnemonicForm from "./MnemonicForm";


export default function StepForm() {
  const currentStep = useSelector((state: RootState) => state.auth.currentStep);

  switch (currentStep) {
    case 1:
    return  <BlockChainForm/>
 }
 switch (currentStep) {
  case 2:
  return  <MnemonicForm/>
}
}
