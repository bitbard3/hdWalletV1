import { RootState } from "@/app/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import BlockChainForm from "./BlockChainForm";
import MnemonicForm from "./MnemonicForm";
import WelcomeForm from "./WelcomeForm";
import ProgressBar from "./ProgressBar";
import IconComponent from "@/lib/utlils/icons";
import { IoMdArrowBack } from "react-icons/io";
import { updateStep } from "@/features/authSlicer";

export default function StepForm() {
  const dispatch = useDispatch();
  const currentStep = useSelector((state: RootState) => state.auth.currentStep);
  const variants = {
    initial: { opacity: 0.5 },
    animate: { opacity: 1 },
    exit: { opacity: 0.5 },
  };

  return (
    <>
      {currentStep < 4 && (
        <div className="form__container">
          <motion.div
            key={currentStep}
            className="form  px-10 md:px-20 bg-dark md:rounded-sm py-5 h-fit flex flex-col gap-y-20 mt-[80px]"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.7 }}
          >
            <div className="w-full flex justify-center pt-8 relative">
              <ProgressBar />
              <div className="absolute left-0 top-[24.5px]">
                <button
                  disabled={currentStep < 2}
                  onClick={() => dispatch(updateStep(currentStep - 1))}
                  className="text-neutral-400 text-lg hover:text-light disabled:hover:text-neutral-400"
                >
                  <IconComponent icon={IoMdArrowBack} />
                </button>
              </div>
            </div>
            {currentStep === 1 && <BlockChainForm />}
            {currentStep === 2 && <MnemonicForm />}
            {currentStep === 3 && <WelcomeForm />}
          </motion.div>
        </div>
      )}
    </>
  );
}
