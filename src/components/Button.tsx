import React from "react";
import { cn } from "@/lib/utlils/utils";

interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      className={cn(
        " font-medium capitalize rounded-md hover:bg-opacity-90 transition-all duration-200",
        props.className
      )}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
