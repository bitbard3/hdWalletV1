import IconComponent from "@/lib/utlils/icons";
import React from "react";
import { TbShieldCheckeredFilled } from "react-icons/tb";

export default function Navbar() {
  return (
    <>
      <div className="fixed top-0 w-full bg-dark py-5 z-10 navbar">
        <div className="container">
          <div className="inner__container">
            <div className="flex items-center justify-center md:justify-start gap-x-2.5">
              <p className="text-light text-3xl">
                <IconComponent icon={TbShieldCheckeredFilled} />
              </p>
              <p className="text-light text-3xl font-bold tracking-wide ">
                CipherHD
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
