import React, { SyntheticEvent } from "react";
type ProgressSlideProps = {
  handleClick: (event: SyntheticEvent) => void;
  isFilled: boolean;
  progress: number;
  disabled:boolean
};

export default function ProgressSlide({
  handleClick,
  isFilled,
  progress,
  disabled
}: ProgressSlideProps) {
  return (
    <button
    disabled={disabled}
      data-progress={`${progress}`}
      onClick={handleClick}
      className={`h-1 w-[30%] rounded-full ${
        isFilled ? "bg-purple" : "bg-gray-400"
      }`}
    ></button>
  );
}
