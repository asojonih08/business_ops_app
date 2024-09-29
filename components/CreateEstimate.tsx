"use client";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { MdHardware } from "react-icons/md";
import { PiPaintBucketFill } from "react-icons/pi";
import { BiSolidCabinet } from "react-icons/bi";
import { FaBrush } from "react-icons/fa6";
import { MdOutlinePostAdd } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProportionBar from "./ui/proportion-bar";
import { AutoComplete } from "./ui/autocomplete";
import AddMaterialsForm from "./AddMaterialsForm";
import { Estimate } from "@/types";
import { useEstimateCalculations } from "./EstimateCalculationsContext";

const types = [
  {
    value: "Cabinet",
    label: "Cabinet",
  },
  {
    value: "Deck",
    label: "Deck",
  },
  {
    value: "Table",
    label: "Table",
  },
  {
    value: "Flooring",
    label: "Flooring",
  },
  {
    value: "Siding",
    label: "Siding",
  },
];

const rooms = [
  {
    value: "Master Bedroom",
    label: "Master Bedroom",
  },
  {
    value: "Master Bathroom",
    label: "Master Bathroom",
  },
  {
    value: "Living Room",
    label: "Living Room",
  },
  {
    value: "Kitchen",
    label: "Kitchen",
  },
  {
    value: "Dining Room",
    label: "Dining Room",
  },
];

const inputClassName =
  "h-6 text-[10px] 2xl:h-10 2xl:text-[17px] text-textColor-700 focus:text-textColor-800 font-medium placeholder:text-sm 2xl:placeholder:text-base placeholder:text-textColor-600/40 bg-ACCENT-200/15 border-transparent rounded-md \
focus-visible:shadow-md focus-visible:ring-PRIMARY-500/50 focus-visible:ring-[1.3px] focus-visible:-ring-offset-1 focus:bg-ACCENT-200/30";

interface CreateEstimateProps {
  proposalItems: Estimate[];
}

export default function CreateEstimate({ proposalItems }: CreateEstimateProps) {
  const { estimateCalculations, setEstimateCalculations } =
    useEstimateCalculations();

  const [openClassification, setOpenClassification] = React.useState(false);
  const [openRoom, setOpenRoom] = React.useState(false);
  const [classificationValue, setClassificationValue] = React.useState("");
  const [roomValue, setRoomValue] = React.useState("");
  const [editPressed, setEditPressed] = useState<boolean>(false);

  const itemNameInputRef = useRef<HTMLInputElement>(null);
  const itemNameLength = estimateCalculations.itemName.length;
  let itemNameInputWidth;
  if (itemNameLength <= 12) itemNameInputWidth = "28%";
  else if (itemNameLength < 19) itemNameInputWidth = "38%";
  else itemNameInputWidth = "48%";

  useEffect(() => itemNameInputRef.current?.focus(), [editPressed]);

  //REMOVE Item name, type, and room from Context

  function handleItemNameEnterPress(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") setEditPressed((editPressed) => !editPressed);
  }

  return (
    <div className="flex flex-col gap-3 2xl:gap-6 justify-between">
      <div className="text-base 2xl:text-2xl font-bold text-textColor-base flex gap-1 items-center 2xl:mb-4">
        Item{" "}
        {editPressed ? (
          <Input
            ref={itemNameInputRef}
            style={{
              width: itemNameInputWidth,
            }}
            className={`text-PRIMARY-500 text-base 2xl:text-2xl h-6 2xl:h-8 px-[0.5px] font-bold border border-transparent
            focus-visible:shadow-sm focus-visible:ring-PRIMARY-500/50 focus-visible:ring-[1.3px] focus-visible:-ring-offset-1 focus:bg-ACCENT-200/15 focus-visible:border-`}
            value={estimateCalculations.itemName}
            onBlur={() => setEditPressed((editPressed) => !editPressed)}
            onKeyUp={handleItemNameEnterPress}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setEstimateCalculations({
                ...estimateCalculations,
                itemName: e.target.value,
              });
            }}
          ></Input>
        ) : (
          <>
            <span
              className="text-PRIMARY-500 text-base font-bold 2xl:text-2xl h-6 2xl:h-8 border-textColor-300/40 px-0.5 border rounded-md shadow-sm shadow-transparent
              ring-[1.3px] ring-transparent -ring-offset-1"
            >
              {estimateCalculations.itemName}
            </span>
            <div
              onClick={() => {
                setEditPressed((editPressed) => !editPressed);
              }}
              className="border-[1.8px] border-textColor-300/50 shadow-sm rounded-lg p-0.5 pl-1.5 pb-1"
            >
              <FaRegEdit
                className="h-[14px] w-[14.5px] 2xl:h-[20px] 2xl:w-[20.5px] text-textColor-600 
                        hover:text-textColor-base"
              />
            </div>
          </>
        )}
        <Separator orientation={"vertical"} className="h-7 mx-1.5" />
      </div>
      <div>
        <span className="text-[11px] 2xl:text-base font-bold text-textColor-700">
          Attributes
        </span>
        <div className="flex gap-3">
          <AutoComplete
            selectedValue={estimateCalculations.type}
            onSelectedValueChange={(value: string) =>
              setEstimateCalculations({ ...estimateCalculations, type: value })
            }
            searchValue={estimateCalculations.type}
            onSearchValueChange={(value: string) =>
              setEstimateCalculations({ ...estimateCalculations, type: value })
            }
            items={types}
            shouldFilter
          />

          <AutoComplete
            selectedValue={estimateCalculations.room}
            onSelectedValueChange={(value: string) =>
              setEstimateCalculations({ ...estimateCalculations, room: value })
            }
            searchValue={estimateCalculations.room}
            onSearchValueChange={(value: string) =>
              setEstimateCalculations({ ...estimateCalculations, room: value })
            }
            items={rooms}
            shouldFilter
          />
        </div>
      </div>

      <div>
        <h2 className="text-[11px] 2xl:text-base font-bold text-textColor-700 mb-3 2xl:mb-5">
          Material Cost
        </h2>
        <div className="bg-ACCENT-200/15 w-full h-[18vh] rounded-2xl drop-shadow-sm flex flex-col gap-0.5 2xl:gap-3 p-3 2xl:p-4">
          <span className="flex justify-between items-center">
            <h2 className="text-[11px] 2xl:text-[16.5px] font-bold text-textColor-800">
              Materials Summary
            </h2>
            <Dialog>
              <DialogTrigger
                className="h-8 2xl:h-9 flex items-center justify-center gap-1.5 font-medium border-[1.8px] border-textColor-300/50 shadow-sm rounded-lg w-[76px] 2xl:w-[110px] text-[10px] 2xl:text-[13.5px] text-textColor-600 tracking-wide duration-150
              hover:border-ACCENT-600/60 hover:text-textColor-900"
              >
                <FaRegEdit className="h-[10px] w-[10px] 2xl:h-[13.5px] 2xl:w-[13.5px]" />
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
                      <span className="text-PRIMARY-500">Cabinet001</span>
                    </DialogDescription>
                  </div>
                </DialogHeader>
                <Separator className="w-full h-[1.5px] bg-textColor-50 mb-0 2xl:mb-8 mt-6" />
                <AddMaterialsForm />
              </DialogContent>
            </Dialog>
          </span>
          <Separator className="w-full h-[1px] my-1 mx-auto bg-textColor-200/70" />

          <div className="flex flex-col gap-2 2xl:gap-4">
            <div className="flex flex-col">
              <span className="text-[11px] 2xl:text-base tracking-tight">
                Total material cost
              </span>
              <span className="font-medium text-[20px] 2xl:text-3xl flex items-center gap-1">
                <span className="text-[17px] 2xl:text-[26px]">$ </span>1,872
              </span>
            </div>
            <ProportionBar
              barHeight={16}
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
        <h2 className="text-xs 2xl:text-base font-bold text-textColor-700 mb-3 2xl:mb-5">
          Labor Cost
        </h2>
        <div className="flex justify-between gap-4">
          <div className="flex flex-col w-1/2 gap-2 text-textColor-500">
            <Label className="text-[10px] 2xl:text-sm">Fabrication Hours</Label>
            <Input
              type="number"
              placeholder="Fabrication Hours"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEstimateCalculations({
                  ...estimateCalculations,
                  fabricationHours: Number(e.target.value),
                })
              }
              value={estimateCalculations.fabricationHours}
              className={inputClassName}
            />
          </div>
          <div className="flex flex-col w-1/2 gap-2 text-textColor-500">
            <Label className="text-[10px] 2xl:text-sm">
              Installation Hours
            </Label>
            <Input
              type="number"
              placeholder="Installation Hours"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEstimateCalculations({
                  ...estimateCalculations,
                  installationHours: Number(e.target.value),
                })
              }
              value={estimateCalculations.installationHours}
              className={inputClassName}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <div className="flex flex-col w-1/2 gap-2 text-textColor-500">
          <Label className="text-[10px] 2xl:text-sm">Subcontractor</Label>
          <Input
            type="number"
            placeholder="Subcontractor"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEstimateCalculations({
                ...estimateCalculations,
                subcontractorCost: Number(e.target.value),
              })
            }
            value={estimateCalculations.subcontractorCost}
            className={inputClassName}
          />
        </div>
        <div className="flex flex-col w-1/2 gap-2 text-textColor-500">
          <Label className="text-[10px] 2xl:text-sm">
            Independent Contractor
          </Label>
          <Input
            type="number"
            placeholder="Independent Contractor"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEstimateCalculations({
                ...estimateCalculations,
                independentContractorCost: Number(e.target.value),
              })
            }
            value={estimateCalculations.independentContractorCost}
            className={inputClassName}
          />
        </div>
      </div>
      <div>
        <h2 className="text-xs 2xl:text-base font-bold text-textColor-700 mb-3 2xl:mb-5">
          Additional Cost
        </h2>
        <div className="flex justify-between gap-4">
          <div className="flex flex-col w-1/2 gap-2 text-textColor-500">
            <Label className="text-[10px] 2xl:text-sm">Delivery</Label>
            <Input
              type="number"
              placeholder="Delivery"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEstimateCalculations({
                  ...estimateCalculations,
                  deliveryCost: Number(e.target.value),
                })
              }
              value={estimateCalculations.deliveryCost}
              className={inputClassName}
            />
          </div>
          <div className="flex flex-col w-1/2 gap-2 text-textColor-500">
            <Label className="text-[10px] 2xl:text-sm">Gas</Label>
            <Input
              type="number"
              placeholder="Gas"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEstimateCalculations({
                  ...estimateCalculations,
                  gasCost: Number(e.target.value),
                })
              }
              value={estimateCalculations.gasCost}
              className={inputClassName}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <div className="flex flex-col w-1/2 gap-2 text-textColor-500">
          <Label className="text-[10px] 2xl:text-sm">Equipment Rental</Label>
          <Input
            type="number"
            placeholder="Equipment Rental"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEstimateCalculations({
                ...estimateCalculations,
                equipmentRentalCost: Number(e.target.value),
              })
            }
            value={estimateCalculations.equipmentRentalCost}
            className={inputClassName}
          />
        </div>
        <div className="flex flex-col w-1/2 gap-2 text-textColor-500">
          <Label className="text-[10px] 2xl:text-sm">Miscellaneous</Label>
          <Input
            type="number"
            placeholder="Miscellaneous"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEstimateCalculations({
                ...estimateCalculations,
                miscellaneousCost: Number(e.target.value),
              })
            }
            value={estimateCalculations.miscellaneousCost}
            className={inputClassName}
          />
        </div>
      </div>
      <span className="flex justify-end">
        <Button
          className="h-9  2xl:h-11 bg-white border-[1.8px] border-textColor-300/50 shadow-sm rounded-lg w-[92px] 2xl:w-[120px] text-xs 2xl:text-base text-textColor-600 font-medium tracking-wide duration-150
      hover:border-ACCENT-600/60 hover:text-textColor-900"
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
