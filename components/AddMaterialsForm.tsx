"use client";

import { Material, columns } from "@/app/proposals/materials-columns";
import { MaterialsDataTable } from "@/app/proposals/materials-data-table";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { FiPlus, FiSave } from "react-icons/fi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { useMaterials } from "./MaterialsContext";
import { PiFloppyDisk, PiFloppyDiskBold } from "react-icons/pi";
import { ScrollArea } from "./ui/scroll-area";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useEstimateCalculations } from "./EstimateCalculationsContext";
import { Input } from "./ui/input";

const initialMaterialsState: Material = {
  num: 1,
  type: null,
  description: null,
  quantity: null,
  rate: null,
  amount: null,
};

/*TODO: 
Clear all button
x Limit list view of materials and add scroll functionality 
x Add Save button
*/

interface AddMaterialsFormProps {
  setOpenMaterialsForm: Dispatch<SetStateAction<boolean>>;
}

export default function AddMaterialsForm({
  setOpenMaterialsForm,
}: AddMaterialsFormProps) {
  const { materials, setMaterials } = useMaterials();
  const { estimateCalculations, setEstimateCalculations } =
    useEstimateCalculations();
  const [materialsMarkupRate, setMaterialsMarkupRate] = useState<number>(0);

  function handleAddMaterialClick() {
    let count = materials.length + 1;
    setMaterials([...materials, { ...initialMaterialsState, num: count }]);
  }

  const subtotal = materials.reduce(
    (prev, material) =>
      material.amount ? Number(material.amount) + prev : prev + 0,
    0
  );
  const markup = subtotal * 0.01 * materialsMarkupRate;
  const total = subtotal + markup;

  function handleSaveClick() {
    setEstimateCalculations({
      ...estimateCalculations,
      materialsCost: total,
      materialMarkupRate: materialsMarkupRate,
    });
    setOpenMaterialsForm(false);
  }

  return (
    <div className="flex flex-col gap-2 2xl:gap-4 h-[100vh]">
      <ScrollArea className="bg-textColor-50/40 pt-5 border-y-[3px] border-textColor-300/50 h-[38%] max-h-[38%] 2xl:h-[46%] 2xl:max-h-[46%]">
        <MaterialsDataTable />
        <span className="h-0"></span>
      </ScrollArea>
      <span className="flex justify-between items-start mt-3 gap-8">
        <div className="flex flex-col gap-9">
          <div className="flex items-center gap-2">
            <Separator className="bg-textColor-100 w-[12vw] h-[1.8px]" />
            <Button
              onClick={handleAddMaterialClick}
              className="h-7 bg-white border-textColor-100 border-[1.8px] shadow-sm rounded-none flex gap-1 items-center p-2.5  
            hover:shadow-sm hover:border-textColor-300/60 hover:border-[1.5px] hover:duration-100"
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
          <div>
            <Label className="text-textColor-700 font-medium">Notes</Label>
            <Textarea
              className="resize-none rounded-none h-[120px] 2xl:h-[140px] border-[1.8px]
              hover:shadow-sm hover:border-textColor-300 hover:border-[1.8px] 
              focus-visible:shadow-md focus-visible:ring-PRIMARY-500/70 focus-visible:ring-[1.5px] focus-visible:-ring-offset-1"
            />
          </div>
        </div>

        <div className="grid grid-rows-4 grid-cols-2 grid-flow-row gap-2 2xl:gap-2 gap-x-12 2xl:gap-x-14 -mt-4 2xl:-mt-2.5 items-end text-right mr-12 text-textColor-700 font-semibold text-base overflow-x-hidden w-[30%]">
          <span className="order-1">Subtotal</span>
          <span className="order-2">$ {subtotal.toFixed(2)}</span>
          <span className="order-3 flex flex-col gap-1.5 items-end justify-end">
            <span className="text-xs font-medium">Material Markup %</span>
            <Input
              className="w-16 h-9"
              type="number"
              min={0}
              value={materialsMarkupRate}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setMaterialsMarkupRate(Number(e.target.value))
              }
            ></Input>
          </span>
          <span className="order-4 pb-1">${markup.toFixed(2)}</span>
          <span className="order-5">Total</span>
          <span className="order-6">${total.toFixed(2)}</span>
          <span className="order-7"></span>
          <span className="order-8 mt-6">
            <Button
              onClick={handleSaveClick}
              className="bg-white border-[1.8px] border-textColor-300/50 shadow-sm rounded-lg w-[66px] 2xl:w-[90px] text-xs 2xl:text-base text-textColor-600 font-medium tracking-wide duration-150
            hover:border-ACCENT-600/60 hover:text-textColor-900"
            >
              <span className="flex items-center gap-1.5">
                <PiFloppyDiskBold size={16.5} />
                <span>Save</span>
              </span>
            </Button>
          </span>
        </div>
      </span>
    </div>
  );
}
