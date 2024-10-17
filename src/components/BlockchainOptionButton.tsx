import IconComponent from "@/lib/utlils/icons";
import { capitaliseString } from "@/lib/utlils/utils";
import React from "react";
import { IconType } from "react-icons";

type BlockchainOptionButtonProps = {
  name: string;
  icon: IconType;
  isChecked: boolean;
  onChange: (value: string) => void;
};

export default function BlockchainOptionButton(
  props: BlockchainOptionButtonProps
) {
  return (
    <label className="flex items-center gap-2.5 justify-center w-[40%]">
      <input
        type="radio"
        name="blockchain"
        value={props.name}
        checked={props.isChecked}
        className="hidden"
      />
      <button
        onClick={() => props.onChange(props.name)}
        className={`flex hover:bg-purple transition-all duration-300 hover:text-dark gap-2.5 justify-center w-full rounded-md  py-2 border ${
          props.isChecked ? "bg-purple text-dark" : "text-light"
        }`}
      >
        <div className="mt-1">
          <IconComponent icon={props.icon} />
        </div>
        {capitaliseString(props.name)}
      </button>
    </label>
  );
}
