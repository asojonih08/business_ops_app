import React from "react";
import { Separator } from "./ui/separator";
import { IoSearch } from "react-icons/io5";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ProjectItemsDataTable } from "@/app/estimate/project-items-data-table";
import { columns } from "@/app/estimate/project-items-columns";
import { FiSend } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";

const mockProjectItemsData = [
  {
    num: 1,
    room: "Master Bedroom",
    name: "Dresser",
    fixture: false,
    amount: 1272.34,
    status: "complete",
  },
  {
    num: 2,
    room: "Master Bathroom",
    name: "Sink Cabinet",
    fixture: false,
    amount: 860.23,
    status: "draft",
  },
  {
    num: 3,
    room: "Living Room",
    name: "Media Console",
    fixture: true,
    amount: 2939.22,
    status: "complete",
  },
  {
    num: 4,
    room: "Kitchen",
    name: "Cabinet",
    fixture: false,
    amount: 8617.12,
    status: "draft",
  },
  {
    num: 5,
    room: "Master Bedroom",
    name: "Bed Frame",
    fixture: true,
    amount: 1137.88,
    status: "complete",
  },
];

const ICON_SIZE = 14;
const ICON_SIZE_xl = 19;

export default function ProjectItems() {
  return (
    <div className=" h-full w-full flex flex-col justify-between">
      <div className="flex flex-col gap-4 2xl:gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-sm 2xl:text-[22px] font-bold text-textColor-base">
            Project Items
          </h1>
        </div>
        <Separator className="w-full h-[1.3px] 2xl:h-[1.8px] -mb-3 mx-auto bg-textColor-300/10" />
        <div className="flex items-center justify-between">
          <span className="w-48">
            <IoSearch
              style={{ fontSize: ICON_SIZE }}
              className={`2xl:text-[${ICON_SIZE_xl}px] absolute my-1.5 ml-2 2xl:my-2 2xl:ml-2 text-textColor-400`}
              size={16}
            />
            <Input
              className="pl-8 h-8 2xl:h-8 text-textColor-700 focus:text-textColor-800 font-medium placeholder:text-sm 2xl:placeholder:text-sm placeholder:text-textColor-600/40 bg-[#F8F9FD] border-transparent rounded-lg \
              focus-visible:ring-transparent focus-visible:border-primary-300/70 focus-visible:border-[0.5px] focus:bg-accent-200/30"
              placeholder="Name"
            />
          </span>
          <Button
            className="h-8 flex items-center justify-center gap-1 px-1 font-medium border-[1.8px] border-textColor-300/50 shadow-sm rounded-lg w-[66px] 2xl:w-[102px] text-textColor-600 tracking-wide duration-150
          hover:border-accent-600/60 hover:text-textColor-900"
          >
            <FaPlus className="mt-[1px]" size={13.5} />
            <span className="text-[10px] 2xl:text-[13.5px]">Add Item</span>
          </Button>
        </div>
        <Separator className="w-full h-[1.3px] 2xl:h-[1.8px] -mt-3 mx-auto bg-textColor-300/10" />
        <ProjectItemsDataTable data={mockProjectItemsData} columns={columns} />
      </div>
      <div className="flex flex-col gap-7">
        <div>
          <Separator className="w-full h-[1.3px] 2xl:h-[1.8px] mx-auto bg-textColor-300/20" />
        </div>
        <span className="flex justify-end items-center gap-5 bg-white rounded-2xl pr-8">
          <Button
            className="w-28 h-8 shadow-md border-2 border-textColor-700 text-textColor-700 rounded-sm font-medium tracking-wide duration-150 
        hover:bg-slate-100"
          >
            Save
          </Button>
          <Button className="w-28 h-8 shadow-md text-base border border-textColor-400/10 bg-primary-base text-textColor-800 rounded-sm  hover:text-textColor-base hover:bg-primary-200 hover:border-textColor-400/20 duration-150 font-medium tracking-wide">
            <span className="flex items-center gap-1.5">
              <span>Proposal</span>
              <FiSend size={16} />
            </span>
          </Button>
        </span>
      </div>
    </div>
  );
}
