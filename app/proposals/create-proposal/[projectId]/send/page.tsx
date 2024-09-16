import { AutoComplete } from "@/components/ui/autocomplete";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { ItemClassificationsDataTable } from "../../items-input-data-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <div className="flex h-full w-full rounded-2xl bg-white px-20">
      <div className="w-1/2 my-[8%] h-full">
        <ScrollArea className="h-[80%]  pr-20 mr-4">
          <div className="flex flex-col gap-3">
            <p className="text-[26px] text-textColor-800 font-bold mb-5">
              Proposal Details
            </p>
            <Label className="text-lg text-textColor-700 font-semibold">
              To
            </Label>
            <span className="flex gap-1.5 justify-center items-center text-center font-medium">
              <span className="w-2/3 h-8 border-gray-200 border rounded-sm"></span>{" "}
              <span className="h-8 w-1/6 border-gray-200 border rounded-sm">
                CC
              </span>
              <span className="h-8 w-1/6 border-gray-200 border rounded-sm">
                BCC
              </span>
            </span>
            <Label className="text-lg text-textColor-700 font-semibold">
              Subject
            </Label>
            <Input />
            <Label className="text-lg text-textColor-700 font-semibold">
              Message
            </Label>
            <Textarea className="h-[200px] max-h-[240px]" />
            <Label className="text-lg text-textColor-700 font-semibold">
              Attachments
            </Label>
            <Input className="w-[40%]" type="file" />
          </div>

          <Separator className="h-[1.5px] w-full bg-textColor-300/45 my-8" />

          <div className="flex flex-col gap-12">
            <p className="text-[26px] text-textColor-800 font-bold mb-5">
              Items
            </p>
            {[0, 1, 2, 3, 4].map((val, index) => (
              <div key={index} className="flex flex-col gap-2">
                <Label className="text-lg text-textColor-700 font-bold tracking-wide">
                  {index + 1} - Kitchen Cabinet
                </Label>

                <ItemClassificationsDataTable />
                <Separator className="h-[1.2px] w-full bg-textColor-500/60 my-7" />
              </div>
            ))}
          </div>
        </ScrollArea>
        <Separator className="h-[3px] bg-gradient-to-r from-ACCENT-50 via-ACCENT-700 to-ACCENT-50 w-[97%] my-3 bg" />
        <div className="flex justify-end mr-5 mt-[4.5%]">
          <Button
            className="text-textColor-700 font-bold w-32 h-9 text-[18px] tracking-wide
            hover:text-black hover:duration-300"
          >
            <p className="underline underline-offset-2">Save</p>
          </Button>
          <Button
            className="bg-textColor-base text-textColor-50 text-base w-40 h-9 shadow-md tracking-wide
          hover:bg-textColor-800 hover:duration-300"
          >
            Send
          </Button>
        </div>
      </div>

      <div className="w-1/2 my-[8%] h-[87%] pt-3.5 px-11 rounded-2xl border-[2px] border-ACCENT-200/15 bg-ACCENT-200/15 flex flex-col overflow-y-clip">
        <div className="h-[16%] w-fulll flex items-center justify-between">
          <p className="text-[24px] font-bold text-textColor-700">Preview</p>
          <span className="w-1/8 border-[2px] rounded-lg border-textColor-700/60 text-sm text-textColor-700/75 font-bold px-1.5 mr-2.5 py-0.5">
            PDF
          </span>
        </div>

        <Separator className="w-full h-[1.5px] bg-textColor-700/10 rounded-full mb-7" />
        <div className="w-full h-full bg-white rounded-t-2xl shadow-xl"></div>
      </div>
    </div>
  );
}
