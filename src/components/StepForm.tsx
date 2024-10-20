import { RootState } from "@/app/store";
import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion"; // Import Framer Motion
import BlockChainForm from "./BlockChainForm";
import MnemonicForm from "./MnemonicForm";
import WelcomeForm from "./WelcomeForm";
import ProgressBar from "./ProgressBar";

export default function StepForm() {
  const currentStep = useSelector((state: RootState) => state.auth.currentStep);

  const variants = {
    initial: { opacity: 0.5 },
    animate: { opacity: 1 },
    exit: { opacity: 0.5 },
  };

  return (
    <>
      {currentStep < 4 && (
        <motion.div
          key={currentStep}
          className="form px-20 bg-dark rounded-sm py-5 h-fit flex flex-col gap-y-20"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.7 }}
        >
          <ProgressBar />
          {currentStep === 1 && <BlockChainForm />}
          {currentStep === 2 && <MnemonicForm />}
          {currentStep === 3 && <WelcomeForm />}
        </motion.div>
      )}
    </>
  );
}
