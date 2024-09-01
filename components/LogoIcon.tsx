import Image from "next/image";
import React from "react";
import logosvg from "@/public/pfm_icon2transp.svg";

interface LogoProps {
  height: number;
  width: number;
}

export default function LogoIcon({ height, width }: LogoProps) {
  return (
    <Image
      className="hover:subpixel-antialiased"
      src={logosvg}
      alt="Pacific Fine Millwork Logo"
      height={height}
      width={width}
    ></Image>
  );
}
