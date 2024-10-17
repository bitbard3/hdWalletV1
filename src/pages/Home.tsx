import ProgressBar from "@/components/ProgressBar";
import StepForm from "@/components/StepForm";
import React from "react";

export default function Home() {
  return (
    <>
      <div className="container h-screen">
        <div className="form__container">
          <div className="form px-20 bg-dark rounded-sm py-5 h-fit flex flex-col gap-y-16">
            <ProgressBar />
            <StepForm />
          </div>
        </div>
      </div>
    </>
  );
}
