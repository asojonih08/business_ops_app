import Image from "next/image";
import React from "react";
import logo160 from "@/public/pfm_icon160.png";
import logo2 from "@/public/pfm_icon2.png";
import logo2_160 from "@/public/pfm_icon2-160.png";
import { Separator } from "./ui/separator";
import LogoIcon from "./LogoIcon";

interface LogoProps {
  height: number;
  width: number;
}

export default function Logo({ height, width }: LogoProps) {
  return (
    <div className="flex gap-2.5 items-center">
      <LogoIcon height={height} width={width} />
      <Separator
        className="bg-[#855529]/80 h-14"
        orientation="vertical"
      ></Separator>
      <div className="flex flex-col text-[15px] font-semibold -space-y-1.5 tracking-[0.15em] antialiased">
        <span>Pacific</span>
        <span>Fine</span>
        <span className="text-[#855529]">Millwork</span>
      </div>
    </div>
  );
}
