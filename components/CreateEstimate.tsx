import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function CreateEstimate() {
  return (
    <>
      {" "}
      <h1 className="text-textColor-800 tracking-wide font-bold text-sm">
        Create New Estimate
      </h1>
      <h1 className="text-2xl font-bold text-textColor-base">
        {" "}
        Item <span className="text-primary-500">Cabinet 001</span>
      </h1>
      <div>
        <h2 className="font-bold text-base text-textColor-700 mb-5">
          Materials Costs
        </h2>
        <div className="bg-[#F8F9FD] w-full h-[480px] rounded-2xl"></div>
      </div>
      <div>
        <h2 className="font-bold text-base text-textColor-700 mb-5">
          Labor Costs
        </h2>
        <div className="flex justify-between gap-4">
          <div className="flex flex-col w-1/2 gap-2 text-sm text-textColor-500">
            <Label>Labor Hours</Label>
            <Input
              type="number"
              placeholder="Labor Hours"
              className="placeholder:text-textColor-600/40 bg-[#F8F9FD] border-transparent rounded-lg h-10 focus-visible:ring-transparent focus-visible:border-primary-300/70 focus-visible:border-[0.5px]"
            />
          </div>
          <div className="flex flex-col w-1/2 gap-2 text-sm text-textColor-500">
            <Label>Installation Hours</Label>
            <Input
              type="number"
              placeholder="Installation Hours"
              className="placeholder:text-textColor-600/40 bg-[#F8F9FD] border-transparent rounded-lg h-10 focus-visible:ring-transparent focus-visible:border-primary-300/70 focus-visible:border-[0.5px]"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <div className="flex flex-col w-1/2 gap-2 text-sm text-textColor-500">
          <Label>Subcontractor</Label>
          <Input
            type="number"
            placeholder="Subcontractor"
            className="placeholder:text-textColor-600/40 bg-[#F8F9FD] border-transparent rounded-lg h-10 focus-visible:ring-transparent focus-visible:border-primary-300/70 focus-visible:border-[0.5px]"
          />
        </div>
        <div className="flex flex-col w-1/2 gap-2 text-sm text-textColor-500">
          <Label>Independent Contractor</Label>
          <Input
            type="number"
            placeholder="Independent Contractor"
            className="placeholder:text-textColor-600/40 bg-[#F8F9FD] border-transparent rounded-lg h-10 focus-visible:ring-transparent focus-visible:border-primary-300/70 focus-visible:border-[0.5px]"
          />
        </div>
      </div>
      <div>
        <h2 className="font-bold text-base text-textColor-700 mb-5">
          Additional Costs
        </h2>
        <div className="flex justify-between gap-4">
          <div className="flex flex-col w-1/2 gap-2 text-sm text-textColor-500">
            <Label>Delivery</Label>
            <Input
              type="number"
              placeholder="Delivery"
              className="placeholder:text-textColor-600/40 bg-[#F8F9FD] border-transparent rounded-lg h-10 focus-visible:ring-transparent focus-visible:border-primary-300/70 focus-visible:border-[0.5px]"
            />
          </div>
          <div className="flex flex-col w-1/2 gap-2 text-sm text-textColor-500">
            <Label>Gas</Label>
            <Input
              type="number"
              placeholder="Gas"
              className="placeholder:text-textColor-600/40 bg-[#F8F9FD] border-transparent rounded-lg h-10 focus-visible:ring-transparent focus-visible:border-primary-300/70 focus-visible:border-[0.5px]"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <div className="flex flex-col w-1/2 gap-2 text-sm text-textColor-500">
          <Label>Equipment Rental</Label>
          <Input
            type="number"
            placeholder="Equipment Rental"
            className="placeholder:text-textColor-600/40 bg-[#F8F9FD] border-transparent rounded-lg h-10 focus-visible:ring-transparent focus-visible:border-primary-300/70 focus-visible:border-[0.5px]"
          />
        </div>
        <div className="flex flex-col w-1/2 gap-2 text-sm text-textColor-500">
          <Label>Miscellaneous</Label>
          <Input
            type="number"
            placeholder="Miscellaneous"
            className="placeholder:text-textColor-600/40 bg-[#F8F9FD] border-transparent rounded-lg h-10 focus-visible:ring-transparent focus-visible:border-primary-300/70 focus-visible:border-[0.5px]"
          />
        </div>
      </div>
      <span className="flex justify-end">
        <Button
          className="bg-accent-base rounded-lg w-20 text-white font-bold tracking-wide duration-150
      hover:bg-accent-700"
        >
          Add Item
        </Button>
      </span>
    </>
  );
}
