import { Estimate, Proposal } from "@/types";
import React from "react";

//Total:Amount 2.84615
//Subtotals:Amount 2.08695
//Total:Subtotal 1.541666

interface ProposalTotalsProps {
  proposalItems: Estimate[];
}

export default function ProposalTotals({ proposalItems }: ProposalTotalsProps) {
  const total = proposalItems.reduce((sum, item) => {
    return sum + (item.total_cost ?? 0);
  }, 0);
  const totalProfit = proposalItems.reduce((sum, item) => {
    return sum + (item.profit ?? 0);
  }, 0);
  const totalSalesTax = proposalItems.reduce((sum, item) => {
    return sum + (item.sales_tax ?? 0);
  }, 0);
  const totalBreakeven = proposalItems.reduce((sum, item) => {
    return sum + (item.breakeven_tax_no_profit ?? 0);
  }, 0);

  return (
    <div className="w-full h-full justify-center flex flex-col gap-2 2xl:gap-4 overflow-hidden">
      <div className="flex flex-col gap-1.5 2xl:gap-2.5">
        <span className="text-[8.5px] font-bold 2xl:text-[13px] 2xl:font-semibold tracking-wide">
          Total
        </span>
        <span className="text-[22px] 2xl:text-[37px] font-semibold text-textColor-base tracking-wide">
          {"$" + total.toFixed(2)}
        </span>
      </div>
      <div className="flex gap-[5.5%] 2xl:gap-[6.5%]">
        <div className="flex flex-col">
          <span className="text-[7.5px] 2xl:text-[11.5px] text-textColor-800/85 font-medium tracking-wide">
            Breakeven
          </span>
          <span className="text-[15.5px] 2xl:text-[24px] font-medium text-textColor-base">
            {"$" + totalBreakeven.toFixed(2)}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[7.5px] 2xl:text-[11.5px] text-textColor-800/85 font-medium tracking-wide">
            Profit
          </span>
          <span className="text-[15.5px] 2xl:text-[24px] font-medium text-textColor-base">
            {"$" + totalProfit.toFixed(2)}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[7.5px] 2xl:text-[11.5px] text-textColor-800/85 font-medium tracking-wide">
            Sales Tax
          </span>
          <span className="text-[15.5px] 2xl:text-[24px] font-medium text-textColor-base">
            {"$" + totalSalesTax.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
