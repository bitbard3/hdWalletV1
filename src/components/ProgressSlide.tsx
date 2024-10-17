import React, { SyntheticEvent } from "react";
type ProgressSlideProps = {
  handleClick: (event: SyntheticEvent) => void;
  isFilled: boolean;
  progress: number;
};

export default function ProgressSlide({
  handleClick,
  isFilled,
  progress,
}: ProgressSlideProps) {
  return (
    <button
      data-progress={`${progress}`}
      onClick={handleClick}
      className={`h-1 w-[30%] rounded-full ${
        isFilled ? "bg-purple" : "bg-gray-400"
      }`}
    ></button>
  );
}
