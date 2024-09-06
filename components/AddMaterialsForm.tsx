"use client";

import { Material, columns } from "@/app/estimate/columns";
import { DataTable } from "@/app/estimate/data-table";
import React from "react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { FiPlus } from "react-icons/fi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useMaterials } from "./MaterialsContext";

const initialMaterialsState: Material = {
  num: 1,
  type: "",
  description: "",
  quantity: "",
  rate: "",
  amount: 0,
};
export default function AddMaterialsForm() {
  const { materials, setMaterials } = useMaterials();

  function handleAddMaterialClick() {
    let count = materials.length + 1;
    setMaterials([...materials, { ...initialMaterialsState, num: count }]);
  }

  const subtotal = materials.reduce(
    (prev, material) => (material.amount ? material.amount + prev : prev + 0),
    0
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-md border-b-[3px] border-textColor-300/50">
        <DataTable />
      </div>
      <span className="flex justify-between items-start mt-3 gap-8">
        <div className="flex items-center gap-2">
          <Separator className="bg-textColor-100 w-[12vw] h-[1.8px]" />
          <Button
            onClick={handleAddMaterialClick}
            className="h-[38px] bg-white border-textColor-100 border-[1.8px] shadow-sm rounded-xl flex gap-1 items-center p-2.5  
            hover:bg-textColor-50/60 hover:border-textColor-100 hover:duration-100 hover:shadow-none"
          >
            <span className="text-textColor-600 text-[14.5]">
              <FiPlus />
            </span>{" "}
            <span className="font-bold text-[12.5px] text-textColor-700 tracking-wide">
              Add Material
            </span>
          </Button>
          <Separator className="bg-textColor-100 w-[12vw] h-[1.8px]" />
        </div>

        <div className="-mt-2.5 grid grid-rows-3 grid-cols-2 grid-flow-row items-end text-right gap-5 gap-x-14 mr-12 text-textColor-700 font-semibold text-lg overflow-x-hidden w-[30%]">
          <span className="">Subtotal</span>
          <span className="">$ {subtotal}</span>
          <span className="flex flex-col gap-1.5 items-end justify-end">
            <span className="text-xs font-medium">Material Markup?</span>
            <Select>
              <SelectTrigger className="text-sm border-2 border-textColor-100 h-6 w-[120px]">
                <SelectValue className="text-sm" placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="light"
                  className="text-sm data-[highlighted]:bg-textColor-50 data-[highlighted]:text-textColor-600 text-textColor-500 selection:text-textColor-100 font-medium hover:bg-textColor-50 hover:rounded-lg"
                >
                  Light
                </SelectItem>
              </SelectContent>{" "}
            </Select>
          </span>
          <span className="">$50.00</span>
          <span className="">Total</span>
          <span className="">$850.00</span>
        </div>
      </span>
    </div>
  );
}
