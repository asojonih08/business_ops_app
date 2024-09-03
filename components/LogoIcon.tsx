import Image from "next/image";
import React from "react";
import logosvg from "@/public/pfm_icon2transp.svg";

interface LogoProps {
className: string;
}

export default function LogoIcon({ className }: LogoProps) {
  return (
    <Image
      className={`hover:subpixel-antialiased ${className}`}
      src={logosvg}
      alt="Pacific Fine Millwork Logo"

    ></Image>
  );
}
