import React from "react";
import { Separator } from "./ui/separator";
import LogoIcon from "./LogoIcon";

//TODO: create size modes: small, medium, large, ...

interface LogoProps {
className: string;
textClassName: string;
separatorClassName: string;
}

export default function Logo({ className, textClassName, separatorClassName }: LogoProps) {
  return (
    <div className="flex gap-2.5 items-center">
      <LogoIcon className={className} />
      <Separator
        className={`bg-[#855529]/80 ${separatorClassName}`}
        orientation="vertical"
      ></Separator>
      <div className={`${textClassName} flex flex-col  font-semibold -space-y-1.5 tracking-[0.15em] antialiased`}>
        <span>Pacific</span>
        <span>Fine</span>
        <span className="text-[#855529]">Millwork</span>
      </div>
    </div>
  );
}
