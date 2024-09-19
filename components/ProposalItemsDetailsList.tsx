"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import ProposalItemDetails from "./ProposalItemDetails";

export default function ProposalItemsDetailsList() {
  return (
    <ul>
      {[0, 1, 2, 3, 4].map((val, index) => (
        <div key={index} className="flex flex-col gap-2">
          <Label className="text-base 2xl:text-lg text-textColor-700 font-bold tracking-wide mb-3.5 2xl:mb-5">
            {index + 1} - Kitchen Cabinet
          </Label>
          <ProposalItemDetails />
          <Separator className="h-[1.2px] w-full bg-textColor-500/50 my-6 2xl:my-7" />
        </div>
      ))}
    </ul>
  );
}
