import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { columns, Material } from "@/app/estimate/columns";
import { DataTable } from "@/app/estimate/data-table";

async function getData(): Promise<Material[]> {
  // Fetch data from your API here.
  return [
    {
      type: "728ed52f",
      description: "pending",
      quantity: 100,
      rate: 100,
      amount: 100,
    },
    {
      type: "728ed52f",
      description: "pending",
      quantity: 100,
      rate: 100,
      amount: 100,
    },
    {
      type: "728ed52f",
      description: "pending",
      quantity: 100,
      rate: 100,
      amount: 100,
    },
    {
      type: "728ed52f",
      description: "pending",
      quantity: 100,
      rate: 100,
      amount: 100,
    },
    {
      type: "728ed52f",
      description: "pending",
      quantity: 100,
      rate: 100,
      amount: 100,
    },
    {
      type: "728ed52f",
      description: "pending",
      quantity: 100,
      rate: 100,
      amount: 100,
    },

    // ...
  ];
}

const inputClassName =
  "h-8 2xl:h-10 placeholder:text-sm 2xl:placeholder:text-base placeholder:text-textColor-600/40 bg-[#F8F9FD] border-transparent rounded-lg \
focus-visible:ring-transparent focus-visible:border-primary-300/70 focus-visible:border-[0.5px]";

export default async function CreateEstimate() {
  const data = await getData();
  return (
    <>
      {" "}
      <h1 className="text-textColor-800 tracking-wide font-bold text-xs 2xl:text-sm">
        Create New Estimate
      </h1>
      <h1 className="text-base 2xl:text-2xl font-bold text-textColor-base">
        {" "}
        Item <span className="text-primary-500">Cabinet 001</span>
      </h1>
      <div>
        <h2 className="text-xs 2xl:text-base font-bold text-textColor-700 mb-5">
          Material Cost
        </h2>
        <div className="bg-[#F8F9FD] w-full h-[21vh] rounded-2xl drop-shadow-sm p-5 overflow-y-scroll">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
      <div>
        <h2 className="text-xs 2xl:text-base font-bold text-textColor-700 mb-5">
          Labor Cost
        </h2>
        <div className="flex justify-between gap-4">
          <div className="flex flex-col w-1/2 gap-2 text-textColor-500">
            <Label className="text-xs 2xl:text-sm">Labor Hours</Label>
            <Input
              type="number"
              placeholder="Labor Hours"
              className={inputClassName}
            />
          </div>
          <div className="flex flex-col w-1/2 gap-2 text-textColor-500">
            <Label className="text-xs 2xl:text-sm">Installation Hours</Label>
            <Input
              type="number"
              placeholder="Installation Hours"
              className={inputClassName}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <div className="flex flex-col w-1/2 gap-2 text-textColor-500">
          <Label className="text-xs 2xl:text-sm">Subcontractor</Label>
          <Input
            type="number"
            placeholder="Subcontractor"
            className={inputClassName}
          />
        </div>
        <div className="flex flex-col w-1/2 gap-2 text-textColor-500">
          <Label className="text-xs 2xl:text-sm">Independent Contractor</Label>
          <Input
            type="number"
            placeholder="Independent Contractor"
            className={inputClassName}
          />
        </div>
      </div>
      <div>
        <h2 className="text-xs 2xl:text-base font-bold text-textColor-700 mb-5">
          Additional Cost
        </h2>
        <div className="flex justify-between gap-4">
          <div className="flex flex-col w-1/2 gap-2 text-textColor-500">
            <Label className="text-xs 2xl:text-sm">Delivery</Label>
            <Input
              type="number"
              placeholder="Delivery"
              className={inputClassName}
            />
          </div>
          <div className="flex flex-col w-1/2 gap-2 text-textColor-500">
            <Label className="text-xs 2xl:text-sm">Gas</Label>
            <Input type="number" placeholder="Gas" className={inputClassName} />
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <div className="flex flex-col w-1/2 gap-2 text-textColor-500">
          <Label className="text-xs 2xl:text-sm">Equipment Rental</Label>
          <Input
            type="number"
            placeholder="Equipment Rental"
            className={inputClassName}
          />
        </div>
        <div className="flex flex-col w-1/2 gap-2 text-textColor-500">
          <Label className="text-[11px] 2xl:text-sm">Miscellaneous</Label>
          <Input
            type="number"
            placeholder="Miscellaneous"
            className={inputClassName}
          />
        </div>
      </div>
      <span className="flex justify-end">
        <Button
          className="bg-accent-base rounded-lg w-[66px] 2xl:w-20 text-xs 2xl:text-base text-white font-bold tracking-wide duration-150
      hover:bg-accent-700"
        >
          Add Item
        </Button>
      </span>
    </>
  );
}
