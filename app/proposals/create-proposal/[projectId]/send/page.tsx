import { AutoComplete } from "@/components/ui/autocomplete";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import ProposalItemsDetailsList from "@/components/ProposalItemsDetailsList";
import { FancyMultiSelect } from "@/components/ui/fancy-multi-select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import EmailDetails from "@/components/EmailDetails";

export default function page() {
  return (
    <div className="flex h-full w-full rounded-2xl bg-white px-16 2xl:px-20">
      <div className="w-1/2 my-[50px] 2xl:my-[120px] h-full">
        <ScrollArea className="h-[80%] pr-16 2xl:pr-20 mr-4">
            <p className="text-[18px] 2xl:text-[26px] text-textColor-800 font-bold mb-3.5 2xl:mb-5">
              Proposal Details
            </p>
            <p className="text-[18px] 2xl:text-[26px] text-textColor-800 font-bold my-4 mt-7 2xl:my-5">Email</p>
  <EmailDetails />

          <Separator className="h-[1.5px] w-full bg-textColor-300/45 my-8" />

          <div className="flex flex-col gap-6 2xl:gap-12">
            <p className="text-[18px] 2xl:text-[26px] text-textColor-800 font-bold mb-3.5 2xl:mb-5">
              Items
            </p>
            <ProposalItemsDetailsList />
          </div>
        </ScrollArea>
        <Separator className="h-[2px] 2xl:h-[3px] bg-gradient-to-r from-ACCENT-50 via-ACCENT-700 to-ACCENT-50 w-[97%] my-3 bg" />
        <div className="flex justify-end mr-5 mt-[4.5%]">
          <Button
            className="text-textColor-700 font-bold w-[100px] h-8 2xl:w-32 2xl:h-9 text-[14.5px] 2xl:text-[18px] tracking-wide
            hover:text-black hover:duration-300"
          >
            <p className="underline underline-offset-2">Save</p>
          </Button>
          <Button
            className="bg-textColor-base text-textColor-50 text-[13.5px] w-[115px] h-7 2xl:text-base 2xl:w-40 2xl:h-9 shadow-md tracking-wide
          hover:bg-textColor-800 hover:duration-300"
          >
            Send
          </Button>
        </div>
      </div>

      <div className="w-1/2 my-[50px] 2xl:my-[120px] h-[87%] pt-3.5 px-11 rounded-2xl border-[2px] border-ACCENT-200/15 bg-ACCENT-200/15 flex flex-col overflow-y-clip">
        <div className="h-[80px] 2xl:h-[140px] w-fulll flex items-center justify-between">
          <p className="text-[18.5px] 2xl:text-[24px] font-bold text-textColor-700">Preview</p>
          <span className="shadow-sm w-1/8 border-[1.8px] 2xl:border-[2px] rounded-lg border-textColor-700/60 text-[12.5px] 2xl:text-sm text-textColor-700/75 font-bold px-1.5 mr-2.5 py-0.5">
            PDF
          </span>
        </div>

        <Separator className="w-full h-[1.5px] bg-textColor-700/10 rounded-full mb-7" />
        <div className="w-full h-full bg-white rounded-t-2xl shadow-xl"></div>
      </div>
    </div>
  );
}
