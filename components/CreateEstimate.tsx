"use client";
import React, {
  ChangeEvent,
  EventHandler,
  FormEvent,
  FormEventHandler,
  Key,
  KeyboardEvent,
  KeyboardEventHandler,
  LegacyRef,
  ReactEventHandler,
  RefAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { MdHardware } from "react-icons/md";
import { PiPaintBucketFill } from "react-icons/pi";
import { BiSolidCabinet } from "react-icons/bi";
import { FaBrush } from "react-icons/fa6";
import { MdOutlinePostAdd } from "react-icons/md";

import AddMaterialsForm from "./AddMaterialsForm";
import { Separator } from "@radix-ui/react-select";
import { FaRegEdit } from "react-icons/fa";
import ProportionBar from "./ui/proportion-bar";

const inputClassName =
  "h-8 2xl:h-10 2xl:text-[17px] text-textColor-700 focus:text-textColor-800 font-medium placeholder:text-sm 2xl:placeholder:text-base placeholder:text-textColor-600/40 bg-accent-200/15 border-transparent rounded-lg \
focus-visible:shadow-md focus-visible:ring-primary-500/50 focus-visible:ring-[1.3px] focus-visible:-ring-offset-1 focus:bg-accent-200/30";

export default function CreateEstimate() {
  const [itemName, setItemName] = useState<string>("Cabinet 001");
  const [editPressed, setEditPressed] = useState<boolean>(false);
  const itemNameInputRef = useRef<HTMLInputElement>(null);
  const itemNameLength = itemName.length;
  let itemNameInputWidth;
  if (itemNameLength <= 12) itemNameInputWidth = "28%";
  else if (itemNameLength < 19) itemNameInputWidth = "38%";
  else itemNameInputWidth = "48%";

  useEffect(() => itemNameInputRef.current?.focus(), [editPressed]);

  function handleItemNameEnterPress(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") setEditPressed((editPressed) => !editPressed);
  }

  return (
    <div className="flex flex-col gap-4 2xl:gap-6 justify-between">
      <h1 className="text-base 2xl:text-2xl font-bold text-textColor-base flex gap-1 items-center 2xl:mb-4">
        Item{" "}
        {editPressed ? (
          <Input
            ref={itemNameInputRef}
            style={{
              width: itemNameInputWidth,
            }}
            className={`text-primary-500 text-2xl h-8 px-[0.5px] focus-visible:shadow-sm focus-visible:ring-primary-500/50 focus-visible:ring-[1.3px] focus-visible:-ring-offset-1 focus:bg-accent-200/15`}
            value={itemName}
            onBlur={() => setEditPressed((editPressed) => !editPressed)}
            onKeyUp={handleItemNameEnterPress}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              console.log(itemName);
              setItemName(e.target.value);
            }}
          ></Input>
        ) : (
          <>
            <span className="text-primary-500 text-base 2xl:text-2xl border-textColor-300/40 px-0.5 border rounded-md">
              {itemName}
            </span>
            <div
              onClick={() => {
                setEditPressed((editPressed) => !editPressed);
              }}
              className="border-[1.8px] border-textColor-300/50 shadow-sm rounded-lg p-0.5 pl-1.5 pb-1 mt-0.5"
            >
              <FaRegEdit
                className="h-[20px] w-[20.5px] text-textColor-600 
                        hover:text-textColor-base"
              />
            </div>
          </>
        )}
      </h1>
      <div>
        <h2 className="text-xs 2xl:text-base font-bold text-textColor-700 mb-5">
          Material Cost
        </h2>
        <div className="bg-accent-200/15 w-full h-[18vh] rounded-2xl drop-shadow-sm flex flex-col gap-3 p-4">
          <span className="flex justify-between items-center">
            <h2 className="2xl:text-[16.5px] font-bold text-textColor-800">
              Materials Summary
            </h2>
            <Dialog>
              <DialogTrigger
                className="h-9 flex items-center justify-center gap-1.5 font-medium border-[1.8px] border-textColor-300/50 shadow-sm rounded-lg w-[66px] 2xl:w-[110px] text-[10px] 2xl:text-[13.5px] text-textColor-600 tracking-wide duration-150
              hover:border-accent-600/60 hover:text-textColor-900"
              >
                <FaRegEdit />
                <span>View/Edit</span>
              </DialogTrigger>
              <DialogContent className="max-w-full w-[100vw] h-[100vh]">
                <DialogHeader className="mt-10 flex flex-row items-baseline gap-2 2xl:gap-3">
                  <div className="rounded-xl text-textColor-800 border-textColor-200/50 drop-shadow-md border p-2 grid grid-cols-2 grid-rows-2 gap-1">
                    <MdHardware className="h-[13px] w-[13px] 2xl:h-[18px] 2xl:w-[18px]" />
                    <BiSolidCabinet className="h-[13px] w-[13px] 2xl:h-[18px] 2xl:w-[18px]" />
                    <PiPaintBucketFill className="h-[13px] w-[13px] 2xl:h-[18px] 2xl:w-[18px]" />
                    <FaBrush className="h-[13px] w-[13px] 2xl:h-[18px] 2xl:w-[18px]" />
                  </div>
                  <div>
                    <DialogTitle className="2xl:text-xl text-textColor-base">
                      Materials
                    </DialogTitle>
                    <DialogDescription>
                      Add materials for{" "}
                      <span className="text-primary-500">Cabinet001</span>
                    </DialogDescription>
                  </div>
                </DialogHeader>
                <Separator className="w-full h-[1.5px] bg-textColor-50 mb-0 2xl:mb-8 mt-6" />
                <AddMaterialsForm />
              </DialogContent>
            </Dialog>
          </span>
          <Separator className="w-full h-[1px] mx-auto bg-textColor-200/70" />

          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <span className="text-base tracking-tight">
                Total material cost
              </span>
              <span className="font-medium text-3xl flex items-center gap-1">
                <span className="text-[26px]">$ </span>1,872
              </span>
            </div>
            <ProportionBar
              items={[
                { label: "Type 2", value: 30 },
                { label: "Type 3", value: 20 },
                { label: "Type 1", value: 10 },
              ]}
            />
          </div>
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
          className="bg-white border-[1.8px] border-textColor-300/50 shadow-sm rounded-lg w-[66px] 2xl:w-[120px] text-xs 2xl:text-base text-textColor-600 font-medium tracking-wide duration-150
      hover:border-accent-600/60 hover:text-textColor-900"
        >
          <span className="flex items-center gap-1.5">
            <MdOutlinePostAdd size={17} />
            <span>Save Item</span>
          </span>
        </Button>
      </span>
    </div>
  );
}
