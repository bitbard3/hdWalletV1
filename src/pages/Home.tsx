import { RootState } from "@/app/store";
import Footer from "@/components/footer";
import SecretPhrase from "@/components/SecretPhrase";
import StepForm from "@/components/StepForm";
import WalletDisplay from "@/components/WalletDisplay";
import React from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const currentStep = useSelector((state: RootState) => state.auth.currentStep);

  return (
    <>
      <div className="container h-screen">
        <StepForm />
        {currentStep > 3 && (
          <div className="inner__container">
            <div className="flex pt-[150px] flex-col">
              <SecretPhrase />
              <WalletDisplay />
            </div>
            <Footer />
          </div>
        )}
      </div>
    </>
  );
}
