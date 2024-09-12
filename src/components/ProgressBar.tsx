import { RootState } from "@/app/store";
import { updateStep } from "@/features/authSlicer";
import React, { SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProgressSlide from "./ProgressSlide";
import { STEPS } from "@/constants/constants";

export default function ProgressBar() {
  const currentStep = useSelector((state: RootState) => state.auth.currentStep);
  const dispatch = useDispatch();

  const handleProgressSlideClick = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const clickedStep = parseInt(target.dataset.progress || "0", 10);
    dispatch(updateStep(clickedStep));
  };

  return (
    <div className="pt-10 flex justify-between w-full">
      {Array.from({ length: STEPS }, (_, index) => {
        const stepNumber = index + 1;
        return (
          <ProgressSlide
            isFilled={stepNumber <= currentStep}
            handleClick={handleProgressSlideClick}
            progress={stepNumber}
            key={stepNumber}
          />
        );
      })}
    </div>
  );
}
