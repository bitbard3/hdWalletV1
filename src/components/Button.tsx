import React from "react";
import { cn } from "@/lib/utlils/utils";

interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      className={cn(
        " font-medium capitalize rounded-md hover:bg-opacity-95 transition-all duration-200",
        props.className
      )}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
}
