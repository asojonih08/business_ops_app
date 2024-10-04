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
import { useSelecetedProposalItem } from "./SelectedItemContext";
import { useMaterials } from "./MaterialsContext";
import { MILLWORK_TYPES, ROOMS } from "@/constants";
import { parseMaterials } from "@/lib/utils";
import { Material } from "@/app/proposals/materials-columns";

const inputClassName =
  "h-6 text-[10px] 2xl:h-10 2xl:text-[17px] text-textColor-700 focus:text-textColor-800 font-medium placeholder:text-sm 2xl:placeholder:text-base placeholder:text-textColor-600/40 bg-ACCENT-200/15 border-transparent rounded-md \
focus-visible:shadow-md focus-visible:ring-PRIMARY-500/50 focus-visible:ring-[1.3px] focus-visible:-ring-offset-1 focus:bg-ACCENT-200/30";

interface CreateEstimateProps {
  proposalItems: Estimate[];
  refreshProposalItems: () => void;
}

export default function CreateEstimate({
  proposalItems,
  refreshProposalItems,
}: CreateEstimateProps) {
  const { estimateCalculations, setEstimateCalculations } =
    useEstimateCalculations();
  const { selectedProposalItem, setSelectedProposalItem } =
    useSelecetedProposalItem();
  const currentItem = proposalItems[selectedProposalItem];

  let materials: Material[] = [];
  if (currentItem.materials) {
    materials = parseMaterials(currentItem.materials);
  }

  type MaterialSumByType = { [key: string]: number };
  let materialSumsArray = {};

  if (currentItem.materials) {
    const materialSumsByType: MaterialSumByType = materials.reduce(
      (acc, material) => {
        const type = material.type as string; // Assuming type will always be present if amount is present
        const amount = parseFloat(material.amount as string) || 0; // Convert amount to number, default to 0

        if (!acc[type]) {
          acc[type] = 0;
        }

        acc[type] += amount;

        return acc;
      },
      {} as MaterialSumByType
    );
    // Convert the result into the desired array of objects
    materialSumsArray = Object.entries(materialSumsByType).map(
      ([type, sum]) => ({
        label: type,
        value: sum,
      })
    );
  }

  // console.log(materialSumsArray);

  console.log("This is the current chosen proposal item: ", currentItem);
  console.log("These are the proposal items: ", proposalItems);
  // console.log(currentItem.item_name, currentItem);
  const [itemName, setItemName] = useState(currentItem.item_name);
  const [type, setType] = useState(currentItem.type);
  const [room, setRoom] = useState(currentItem.room);
  const [openMaterialsForm, setOpenMaterialsForm] = useState<boolean>(false);
  const [editPressed, setEditPressed] = useState<boolean>(false);

  const itemNameInputRef = useRef<HTMLInputElement>(null);
  const itemNameLength = itemName.length;
  let itemNameInputWidth;
  if (itemNameLength <= 12) itemNameInputWidth = "28%";
  else if (itemNameLength < 19) itemNameInputWidth = "38%";
  else itemNameInputWidth = "48%";

  useEffect(() => itemNameInputRef.current?.focus(), [editPressed]);
  useEffect(() => {
    setItemName(currentItem.item_name);
    setType(currentItem.type);
    setRoom(currentItem.room);
  }, [selectedProposalItem]);

  function handleItemNameEnterPress(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") setEditPressed((editPressed) => !editPressed);
  }

  return (
    <div className="flex flex-col gap-3 2xl:gap-5 justify-between">
      <div className="text-base 2xl:text-2xl font-bold text-textColor-base flex gap-1 items-center 2xl:mb-1.5">
        Item{" "}
        {editPressed ? (
          <Input
            ref={itemNameInputRef}
            style={{
              width: itemNameInputWidth,
            }}
            className={`text-PRIMARY-500 text-base 2xl:text-2xl h-6 2xl:h-8 px-[0.5px] font-bold border border-transparent
            focus-visible:shadow-sm focus-visible:ring-PRIMARY-500/50 focus-visible:ring-[1.3px] focus-visible:-ring-offset-1 focus:bg-ACCENT-200/15 focus-visible:border-`}
            value={itemName}
            onBlur={() => setEditPressed((editPressed) => !editPressed)}
            onKeyUp={handleItemNameEnterPress}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setItemName(e.target.value);
            }}
          ></Input>
        ) : (
          <>
            <span
              className="text-PRIMARY-500 text-base font-bold 2xl:text-2xl h-6 2xl:h-8 border-textColor-300/40 px-0.5 border rounded-md shadow-sm shadow-transparent
              ring-[1.3px] ring-transparent -ring-offset-1"
            >
              {itemName}
            </span>
            <div
              onClick={() => {
                setEditPressed((editPressed) => !editPressed);
              }}
              className="border-[1.8px] border-textColor-300/50 shadow-sm rounded-md 2xl:rounded-lg p-0.5 pl-1.5 pb-1"
            >
              <FaRegEdit
                className="h-[14px] w-[14.5px] 2xl:h-[20px] 2xl:w-[20.5px] text-textColor-600 
                        hover:text-textColor-base"
              />
            </div>
          </>
        )}
      </div>
      <div>
        <div className="text-xs hidden 2xl:text-base font-bold text-textColor-700 mb-3 2xl:mb-5">
          Attributes
        </div>
        <div className="flex gap-3">
          <div className="flex flex-col w-1/2 gap-2 text-textColor-500">
            <Label className="text-[10px] 2xl:text-sm">Type</Label>
            <AutoComplete
              className={inputClassName}
              placeholder="Type"
              selectedValue={type}
              onSelectedValueChange={(value: string) => setType(value)}
              searchValue={type}
              onSearchValueChange={(value: string) => setType(value)}
              items={MILLWORK_TYPES}
              shouldFilter
            />
          </div>
          <div className="flex flex-col w-1/2 gap-2 text-textColor-500">
            <Label className="text-[10px] 2xl:text-sm">Room</Label>
            <AutoComplete
              className={inputClassName}
              placeholder="Room"
              selectedValue={room}
              onSelectedValueChange={(value: string) => setRoom(value)}
              searchValue={room}
              onSearchValueChange={(value: string) => setRoom(value)}
              items={ROOMS}
              shouldFilter
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-[11px] 2xl:text-base font-bold text-textColor-700 mb-3 2xl:mb-5">
          Material Cost
        </h2>
        <div className="bg-ACCENT-200/15 w-full h-[20vh] 2xl:h-[18vh] rounded-2xl drop-shadow-sm flex flex-col gap-1 2xl:gap-3 p-3 2xl:p-4">
          <span className="flex justify-between items-center">
            <h2 className="text-[11px] 2xl:text-[16.5px] font-bold text-textColor-800">
              Materials Summary
            </h2>
            <Dialog
              open={openMaterialsForm}
              onOpenChange={(open: boolean) => {
                if (!open) setMaterials([]);
                setOpenMaterialsForm(open);
              }}
            >
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
                      <span className="text-PRIMARY-500">{itemName}</span>
                    </DialogDescription>
                  </div>
                </DialogHeader>
                <Separator className="w-full h-[1.5px] bg-textColor-50 mb-0 2xl:mb-8 mt-6" />
                <AddMaterialsForm
                  setOpenMaterialsForm={setOpenMaterialsForm}
                  proposalItem={currentItem}
                  refreshProposalItems={refreshProposalItems}
                />
              </DialogContent>
            </Dialog>
          </span>
          <Separator className="w-full h-[1px] my-1 mx-auto bg-textColor-200/70" />

          <div className="flex flex-col gap-0.5 2xl:gap-4">
            <div className="flex flex-col">
              <span className="text-[11px] 2xl:text-base tracking-tight">
                Total material cost
              </span>
              <span className="font-medium text-[20px] 2xl:text-3xl flex items-center gap-1">
                <span className="text-[17px] 2xl:text-[26px]">$ </span>
                {currentItem.materials_cost
                  ? currentItem.materials_cost.toFixed(2)
                  : "0.00"}
              </span>
            </div>
            {currentItem.materials ? (
              <ProportionBar
                mainLabel={"Materials Breakdown"}
                barHeightClassName={"h-3.5 2xl:h-4"}
                items={materialSumsArray}
              />
            ) : null}
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
          className="h-8 2xl:h-11 bg-white border-[1.8px] border-textColor-300/50 shadow-sm rounded-lg w-[88px] 2xl:w-[120px] text-[11px] 2xl:text-base text-textColor-600 font-medium tracking-wide duration-150
        hover:border-ACCENT-600/60 hover:text-textColor-900"
        >
          <span className="flex items-center gap-1 2xl:gap-1.5">
            <MdOutlinePostAdd className="h-[14px] w-[14px] 2xl:h-[17px] 2xl:w-[17px]" />
            <span>Save Item</span>
          </span>
        </Button>
      </span>
    </div>
  );
}
