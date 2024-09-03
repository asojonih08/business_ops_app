import React from "react";
import { Separator } from "./ui/separator";

export default function ProjectTotals() {
  return (
    <span className="rounded-2xl border-[2px] drop-shadow-sm border-opacity-25 border-textColor-100/40  px-8 flex justify-between items-center w-full h-full font-medium text-xs text-textColor-base">
      <div className="flex items-center gap-3.5">
        <Separator
          orientation="vertical"
          className="bg-primary-500 w-[4px] h-[80px] rounded-xl"
        />
        <div className="flex flex-col gap-3.5">
          <h2 className="tracking-widest text-primary-500">Total</h2>
          <span className="text-2xl xl:text-3xl text-primary-500">
            <span className="text-[32px]">$&nbsp;</span>18,700.66
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3.5">
        <Separator
          orientation="vertical"
          className="bg-green-600 w-[4px] h-[80px] rounded-xl"
        />
        <div className="flex flex-col gap-3.5 text-green-500">
          <h2 className="tracking-widest">Profit</h2>
          <span className="text-2xl xl:text-3xl text-green-600">
            <span className="text-[32px]">$&nbsp;</span>2,388.08
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3.5">
        <Separator
          orientation="vertical"
          className="bg-textColor-700 w-[4px] h-[80px] rounded-xl"
        />
        <div className="flex flex-col gap-3.5">
          <h2 className="tracking-widest text-textColor-700">Breakeven</h2>
          <span className="text-2xl xl:text-3xl text-textColor-700">
            <span className="text-[32px]">$&nbsp;</span>16,312.58
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3.5">
        <Separator
          orientation="vertical"
          className="bg-yellow-500 w-[4px] h-[80px] rounded-xl"
        />
        <div className="flex flex-col gap-3.5 text-yellow-400">
          <h2 className="tracking-widest">Sales Tax</h2>
          <span className="text-2xl xl:text-3xl text-yellow-500 flex items-center">
            <span className="text-[32px]">$&nbsp;</span> 35.64
          </span>
        </div>
      </div>
    </span>
  );
}
