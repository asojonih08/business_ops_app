import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IoSearch } from "react-icons/io5";
import CreateEstimate from "@/components/CreateEstimate";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <div className="h-[98vh] my-3 w-full flex gap-6 justify-between">
      <div className="h-full w-[55%] flex flex-col gap-6 rounded-2xl">
        <div className="px-8 py-7 rounded-2xl h-[24%] bg-white flex flex-col gap-6"></div>

        <div className="px-8 py-7 rounded-2xl h-[42%] bg-white flex flex-col gap-6">
          <h1 className="text-[22px] font-bold text-textColor-base">
            Estimate Totals
          </h1>
          <Separator className="w-full h-[1.8px] my-1.5 mx-auto bg-textColor-300/10" />
        </div>

        <div className="px-8 py-7 h-[34%] bg-white w-full rounded-2xl flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-[22px] font-bold text-textColor-base">
              Items List
            </h1>
            <span>
              <IoSearch
                className="absolute my-2.5 ml-2 text-textColor-400"
                size={19}
              />
              <Input
                className="bg-[#F8F9FD] border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-[#C4BEEE] focus:border-textColor-base/15 focus:duration-100 pl-8"
                placeholder="Search"
              />
            </span>
          </div>
          <Separator className="w-full h-[1.8px] my-1.5 mx-auto bg-textColor-300/10" />
        </div>
      </div>
      <div className="px-8 py-7 h-full bg-white w-[45%] rounded-2xl flex flex-col gap-6">
        <CreateEstimate />
      </div>
    </div>
  );
}
