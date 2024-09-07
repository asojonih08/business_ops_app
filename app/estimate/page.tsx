import React from "react";
import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import { RiSendPlaneFill } from "react-icons/ri";
import CreateEstimate from "@/components/CreateEstimate";
import { Separator } from "@/components/ui/separator";
import ProjectTotals from "@/components/ProjectTotals";
import { Select, SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";

const ICON_SIZE = 14;
const ICON_SIZE_xl = 19;

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

export default function Page() {
  return (
    <div className="h-full my-auto w-full flex gap-4 2xl:gap-6 justify-between">
      <div className="h-full w-[55%] flex flex-col gap-4 2xl:gap-6 rounded-2xl">
        <div className="px-6 py-5 2xl:px-8 2xl:py-7 rounded-xl h-[20%] bg-white flex flex-col gap-6 items-center">
          <ProjectTotals />
        </div>

        <div className="px-6 py-5 2xl:px-8 2xl:py-8 rounded-2xl h-[42%] bg-white flex flex-col gap-4 2xl:gap-6">
          <div className="flex items-center">
            <h1 className="text-[15px] 2xl:text-[22px] font-bold text-textColor-base">
              Estimate Summary
            </h1>
            <span className="h-5 2xl:h-6"></span>
          </div>

          <Separator className="w-full h-[1.3px] 2xl:h-[2px] mx-auto bg-textColor-300/15" />

          <div className="text-[9.5px] 2xl:text-[13px] rounded-2xl bg-accent-50 drop-shadow-sm w-full h-[82%] py-2 pb-5 2xl:py-6 2xl:pb-10">
            {summaryLabels_1.map((label, index) => (
              <div
                key={label}
                className={`${
                  index % 2 === 1 ? "bg-textColor-100" : ""
                } w-[95%] mx-auto mb-0.5`}
              >
                <span className="flex justify-between">
                  <span className="text-textColor-400 font-medium">
                    {label}
                  </span>
                  <span className="text-textColor-800 font-semibold tracking-wide">
                    $ 245.63
                  </span>
                </span>
                <Separator className="w-full h-[0.5px]" />
              </div>
            ))}
            <div className="flex items-center w-[95%] justify-between mx-auto my-3">
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
            <span className="flex w-[95%] justify-between mx-auto mt-4">
              <span className="text-base 2xl:text-xl text-textColor-900 font-bold tracking-wider">
                Total
              </span>
              <span className="text-lg 2xl:text-2xl text-textColor-900 font-bold tracking-widest">
                $18,700.66
              </span>
            </span>
          </div>
        </div>

        <div className="px-6 py-5 2xl:px-8 2xl:py-7 h-[38%] bg-white w-full rounded-2xl flex flex-col gap-4 2xl:gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-sm 2xl:text-[22px] font-bold text-textColor-base">
              Project Items
            </h1>
            <span>
              <IoSearch
                style={{ fontSize: ICON_SIZE }}
                className={`2xl:text-[${ICON_SIZE_xl}px] absolute my-1.5 ml-2 2xl:my-2.5 2xl:ml-2 text-textColor-400`}
                size={19}
              />
              <Input
                className="pl-8 h-8 2xl:h-10 placeholder:text-sm 2xl:placeholder:text-base placeholder:text-textColor-600/40 bg-[#F8F9FD] border-transparent rounded-lg \
                focus-visible:ring-transparent focus-visible:border-primary-300/70 focus-visible:border-[0.5px]"
                placeholder="Search"
              />
            </span>
          </div>
          <Separator className="w-full h-[1.3px] 2xl:h-[1.8px]  mx-auto bg-textColor-300/10" />
        </div>
      </div>
      <div className="w-[45%] flex flex-col gap-2">
        <div className="pt-7 h-[94%] bg-white rounded-2xl flex flex-col justify-between">
          <div className="px-8">
            <CreateEstimate />
          </div>
        </div>
        <span className="flex justify-end items-center gap-5 mt-5 h-[6%] bg-white rounded-2xl pr-8">
          <Button className="w-28 h-8 shadow-md border-2 border-textColor-800 hover:bg-slate-50 rounded-sm font-medium tracking-wide">
            Save
          </Button>
          <Button className="w-28 h-8 shadow-md hover:bg-[#33b8a6] bg-[#31DAC3] border-none rounded-sm text-white font-medium tracking-wide">
            <span className="flex items-center gap-1.5">
              <span>Proposal</span> <RiSendPlaneFill size={15} />
            </span>
          </Button>
        </span>
      </div>
    </div>
  );
}
