import React from "react";
import { Separator } from "./ui/separator";
import LogoIcon from "./LogoIcon";

//TODO: create size modes: small, medium, large, ...

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
