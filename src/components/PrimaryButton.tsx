import React from "react";
import { cn } from "@/lib/utlils/utils";

interface PrimaryButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

export default function PrimaryButton(props: PrimaryButtonProps) {
  return (
    <button
      className={cn(
        "w-full py-2.5 text-lg bg-purple text-gray-900 font-medium capitalize rounded-md hover:bg-opacity-90 transition-all duration-200",
        props.className
      )}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
