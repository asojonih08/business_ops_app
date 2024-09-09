import React from "react";
import { Separator } from "./ui/separator";

export default function ProjectTotals() {
  return (
    <div className="w-full h-full justify-center flex flex-col gap-4">
      <div className="flex flex-col gap-2.5">
        <span className="text-[13px] font-semibold tracking-wide">Total</span>
        <span className="text-[37px] font-semibold text-textColor-base tracking-wide">
          $2,478.67
        </span>
      </div>
      <div className="flex gap-[6.5%]">
        <div className="flex flex-col">
          <span className="text-[11.5px] text-textColor-800/85 font-medium tracking-wide">
            Breakeven
          </span>
          <span className="text-[24px] font-medium text-textColor-base">
            -$345.56
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[11.5px] text-textColor-800/85 font-medium tracking-wide">
            Profit
          </span>
          <span className="text-[24px] font-medium text-textColor-base">
            -$1,145.89
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[11.5px] text-textColor-800/85 font-medium tracking-wide">
            Sales Tax
          </span>
          <span className="text-[24px] font-medium text-textColor-base">
            $1,098.32
          </span>
        </div>
      </div>
    </div>
  );
}
