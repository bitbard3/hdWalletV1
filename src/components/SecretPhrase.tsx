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
import { copyToClipboard } from "@/lib/utlils/utils";
import { FiCopy } from "react-icons/fi";
import IconComponent from "@/lib/utlils/icons";

export default function SecretPhrase() {
  const mnemonic = useSelector((state: RootState) => state.auth.mnemonic);
  const mnemonicArr = mnemonic.split(" ");

  const variants = {
    initial: { opacity: 0.8, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0.5, y: -20 },
  };

  const onCopyHandler = () => {
    copyToClipboard(mnemonic);
  };

  return (
    <>
      <Accordion
        className="w-full bg-dark border rounded-md"
        type="single"
        collapsible
      >
        <AccordionItem
          className=" px-8 md:px-16 py-6  rounded-sm"
          value="item-1"
        >
          <AccordionTrigger className="text-2xl md:text-3xl text-light font-medium text-start">
            Your Secret Phrase
          </AccordionTrigger>
          <AccordionContent>
            <div
              onClick={onCopyHandler}
              className="grid hover:cursor-pointer w-full grid-cols-2 md:grid-cols-4 gap-4 pt-12"
            >
              {mnemonicArr.map((word) => (
                <motion.div
                  key={word}
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                  className="bg-dark border border-neutral-500 text-light text-lg pl-4 py-3 rounded-md "
                >
                  {word}
                </motion.div>
              ))}
              <p className="text-neutral-400 col-span-2  mt-5 text-lg flex items-center gap-x-2 hover:text-light transition-all duration-150">
                <IconComponent icon={FiCopy} /> Click anywhere to copy
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
