import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitaliseString = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const copyToClipboard =async (text:string):Promise<void> =>{
 if(!navigator.clipboard){
  throw new Error("Clipbboard API not available")
 }
 try{
  await navigator.clipboard.writeText(text)
 }
 catch(err){
  console.error("Failed to copy text: ",err)
  throw new Error("Something went wrong")
 }
}