import React from "react";

//Total:Amount 2.84615
//Subtotals:Amount 2.08695
//Total:Subtotal 1.541666
export default function ProposalTotals() {
  return (
    <div className="w-full h-full justify-center flex flex-col gap-2 2xl:gap-4 overflow-hidden">
      <div className="flex flex-col gap-1.5 2xl:gap-2.5">
        <span className="text-[8.5px] 2xl:text-[13px] font-semibold tracking-wide">
          Total
        </span>
        <span className="text-[24px] 2xl:text-[37px] font-semibold text-textColor-base tracking-wide">
          $2,478.67
        </span>
      </div>
      <div className="flex gap-[5.5%] 2xl:gap-[6.5%]">
        <div className="flex flex-col">
          <span className="text-[7.5px] 2xl:text-[11.5px] text-textColor-800/85 font-medium tracking-wide">
            Breakeven
          </span>
          <span className="text-[15.5px] 2xl:text-[24px] font-medium text-textColor-base">
            -$345.56
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[7.5px] 2xl:text-[11.5px] text-textColor-800/85 font-medium tracking-wide">
            Profit
          </span>
          <span className="text-[15.5px] 2xl:text-[24px] font-medium text-textColor-base">
            -$1,145.89
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[7.5px] 2xl:text-[11.5px] text-textColor-800/85 font-medium tracking-wide">
            Sales Tax
          </span>
          <span className="text-[15.5px] 2xl:text-[24px] font-medium text-textColor-base">
            $1,098.32
          </span>
        </div>
      </div>
    </div>
  );
}
