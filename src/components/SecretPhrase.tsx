import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { motion } from "framer-motion";

export default function SecretPhrase() {
  const mnemonic = useSelector((state: RootState) => state.auth.mnemonic);
  const mnemonicArr = mnemonic.split(" ");

  const variants = {
    initial: { opacity: 0.8, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0.5, y: -20 },
  };
  return (
    <>
      <Accordion
        className="w-full bg-dark border rounded-md"
        type="single"
        collapsible
      >
        <AccordionItem className=" px-16 py-6  rounded-sm" value="item-1">
          <AccordionTrigger className="text-3xl text-light font-medium ">
            Your Secret Phrase
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid w-full grid-cols-4 gap-4 mt-12">
              {mnemonicArr.map((word) => (
                <motion.div
                  key={word}
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                  className="bg-dark border border-neutral-500 text-light text-lg pl-4 py-3 rounded-md"
                >
                  {word}
                </motion.div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
