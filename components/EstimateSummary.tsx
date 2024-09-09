import React from "react";
import { Separator } from "./ui/separator";

const summaryLabels_1 = [
  "Labor Cost",
  "Fixed Cost",
  "Material Cost",
  "Contractor Cost",
  "Other Fees",
  "Sales Tax",
];

const summaryLabels_2 = [
  "Profit Margin %",
  "Profit",
  "Breakeven",
  "Total Cost Pretax",
];

export default function EstimateSummary() {
  return (
    <div className="flex flex-col gap-4 2xl:gap-6">
      <div className="flex items-center">
        <h1 className="text-[15px] 2xl:text-[22px] font-bold text-textColor-base">
          Estimate Summary
        </h1>
        <span className="h-5 2xl:h-6"></span>
      </div>

      <Separator className="w-full h-[1.3px] 2xl:h-[2px] mx-auto bg-textColor-300/15" />

      <div className="text-[10px] 2xl:text-[14px] rounded-2xl bg-accent-200/15 drop-shadow-sm w-full h-[85%] py-2 pb-5 2xl:py-6 2xl:pb-10">
        {summaryLabels_1.map((label, index) => (
          <div
            key={label}
            className={`${
              index % 2 === 1
                ? "bg-accent-200/35 py-0.5 2xl:py-1.5 px-[3.5px] rounded-sm"
                : ""
            } w-[95%] mx-auto my-1.5 2xl:my-2.5`}
          >
            <span className="flex justify-between">
              <span className="text-textColor-400 font-medium">{label}</span>
              <span className="text-textColor-800 font-semibold tracking-wide">
                $ 245.63
              </span>
            </span>
            {/* <Separator className="w-full h-[0.5px]" /> */}
          </div>
        ))}
        <div className="2xl:text-[14.5px] flex items-center w-[95%] justify-between mx-auto my-7 2xl:my-9">
          <div className="flex flex-col items-center w-[46%]">
            {summaryLabels_2.map(
              (label, index) =>
                index <= 1 && (
                  <div key={label} className="w-[95%] mx-auto">
                    <span className="flex justify-between my-1">
                      <span className="text-textColor-600 font-semibold">
                        {label}
                      </span>
                      <span className="text-textColor-800 font-bold tracking-wide">
                        $ 885.63
                      </span>
                    </span>
                  </div>
                )
            )}
          </div>
          <Separator
            orientation="vertical"
            className="h-12 w-[1.2px] 2xl:h-16 2xl:w-[1.5px]"
          />
          <div className="flex flex-col items-center w-[46%]">
            {summaryLabels_2.map(
              (label, index) =>
                index >= 2 && (
                  <div key={label} className="w-[95%] mx-auto">
                    <span className="flex justify-between my-1">
                      <span className="text-textColor-600 font-semibold">
                        {label}
                      </span>
                      <span className="text-textColor-800 font-bold tracking-wide">
                        $ 885.63
                      </span>
                    </span>
                  </div>
                )
            )}
          </div>
        </div>
        <Separator className="w-full h-[1.5px] 2xl:h-[2px] bg-textColor-200/70 bg-opacity-10" />
        <span className="flex w-[92%] justify-between mx-auto mt-8">
          <span className="text-base 2xl:text-xl text-textColor-900 font-bold tracking-wider">
            Total
          </span>
          <span className="text-lg 2xl:text-xl text-textColor-900 font-bold tracking-widest">
            $18,700.66
          </span>
        </span>
      </div>
    </div>
  );
}
