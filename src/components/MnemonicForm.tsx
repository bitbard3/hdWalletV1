import { Buffer } from "buffer";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { updateStep } from "@/features/authSlicer";
window.Buffer = Buffer;

export default function MnemonicForm() {
  const dispatch = useDispatch();
  const mnemonic = useSelector((state: RootState) => state.auth.mnemonic);
  const currentStep = useSelector((state: RootState) => state.auth.currentStep);
  const mnemonicArr = mnemonic.split(" ");

  const onNextHandler = () => {
    dispatch(updateStep(currentStep + 1));
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-light font-medium text-3xl">Secret Recovery Phrase</p>
      <p className="mt-4 text-xl text-yellow-500">
        Save these words to recover your wallet
      </p>
      <div className="w-full grid grid-cols-3 gap-3 mt-7">
        {mnemonicArr.map((word, index) => (
          <div
            key={index}
            className="px-1 py-2 bg-gray-100 rounded shadow text-center"
          >
            {index + 1}. {word}
          </div>
        ))}
      </div>
      <div className="mt-10 pb-4 w-full">
        <Button
          className="w-full py-2.5 text-lg bg-purple text-gray-900"
          text="Continue"
          onClick={onNextHandler}
        />
      </div>
    </div>
  );
}
