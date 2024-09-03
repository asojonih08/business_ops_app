import React from "react";
import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";
import CreateEstimate from "@/components/CreateEstimate";
import { Separator } from "@/components/ui/separator";

const ICON_SIZE = 14;
const ICON_SIZE_xl = 19;

export default function Page() {
  return (
    <div className="h-full my-auto w-full flex gap-4 2xl:gap-6 justify-between">
      <div className="h-full w-[55%] flex flex-col gap-4 2xl:gap-6 rounded-2xl">
        <div className="px-6 py-5 2xl:px-8 2xl:py-7 rounded-2xl h-[22%] bg-white flex flex-col gap-6 items-center">
          <span className="px-10 flex justify-between items-center w-full h-full font-semibold text-xs text-textColor-base">
            <div className="flex flex-col gap-3.5">
              <h2 className="tracking-wider">Total</h2>
              <span className="text-2xl text-textColor-base">$22,412</span>
            </div>
            <div className="flex flex-col gap-3.5">
              <h2 className="tracking-wider">Items</h2>
              <span className="text-2xl text-textColor-base">10</span>
            </div>
            <div className="flex flex-col gap-3.5 text-yellow-500">
              <h2 className="tracking-wider">Drafts</h2>
              <span className="text-2xl text-yellow-600">
                <sup>7</sup>&frasl;<sub>10</sub>
              </span>
            </div>
            <div className="flex flex-col gap-3.5 text-green-600">
              <h2 className="tracking-wider">Completed</h2>
              <span className="text-2xl text-green-700">
                <sup>3</sup>&frasl;<sub>10</sub>
              </span>
            </div>
          </span>
        </div>

        <div className="px-6 py-5 2xl:px-8 2xl:py-7 rounded-2xl h-[40%] bg-white flex flex-col gap-4 2xl:gap-6">
          <div className="flex items-center">
            <h1 className="text-sm 2xl:text-[22px] font-bold text-textColor-base">
              Estimate Summary
            </h1>
            <span className="h-8 2xl:h-10"></span>
          </div>
          <Separator className="w-full h-[1.3px] 2xl:h-[1.8px] 2xl:my-1.5 mx-auto bg-textColor-300/10" />
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
          <Separator className="w-full h-[1.3px] 2xl:h-[1.8px] 2xl:my-1.5 mx-auto bg-textColor-300/10" />
        </div>
      </div>
      <div className="px-8 py-7 h-full bg-white w-[45%] rounded-2xl flex flex-col gap-4 2xl:gap-6">
        <CreateEstimate />
      </div>
    </div>
  );
}
