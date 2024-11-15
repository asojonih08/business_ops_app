"use client";
import React from "react";
import { Separator } from "./ui/separator";
import { IoSearch } from "react-icons/io5";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ProposalItemsDataTable } from "@/app/proposals/create-proposal/proposal-items-data-table";
import {
  columns,
  ProposalItem,
} from "@/app/proposals/create-proposal/proposal-items-columns";
import { FiSend } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { Estimate } from "@/types";
import insertEstimatesItemClassifications from "@/actions/insertEstimatesItemClassifications";
import { useSelecetedProposalItem } from "./SelectedItemContext";
import { toast } from "sonner";
import { useRouter, usePathname } from "next/navigation";

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

interface ProposalItemsProps {
  proposalItems: Estimate[];
  refreshProposalItems: () => void;
}

export default function ProposalItems({
  proposalItems,
  refreshProposalItems,
}: ProposalItemsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { selectedProposalItem, setSelectedProposalItem } =
    useSelecetedProposalItem();
  const proposalItemsList: ProposalItem[] = proposalItems.map(
    (proposalItem, index) => {
      // console.log("id: ", proposalItem.id)
      return {
        num: index + 1,
        id: proposalItem.id,
        room: proposalItem.room === "" ? "[No Room]" : proposalItem.room,
        name: proposalItem.item_name,
        fixture: proposalItem.is_fixture ? "Yes" : "No",
        amount: proposalItem.total_cost ? proposalItem.total_cost : 0,

        status: proposalItem.status,
      };
    }
  );
  async function handleAddItem() {
    const data = new FormData();
    data.append("item0", "[No Name]");
    data.append("item0", "");
    data.append("item0", "");

    if (proposalItems[0].project)
      data.append("project", proposalItems[0].project.toString());
    if (proposalItems[0].client) data.append("client", proposalItems[0].client);
    if (proposalItems[0].proposal)
      data.append("proposal", proposalItems[0].proposal.toString());
    data.append("itemClassificationsCount", "1");

    const estimates = await insertEstimatesItemClassifications(data);
    // console.log("Estimates after add item: ", estimates);
    // console.log("Estimates length: ", proposalItems.length);
    const nextSelectedItem = proposalItems.length;
    refreshProposalItems();
    toast("New item added");
  }

  return (
    <div className=" h-full w-full flex flex-col justify-between">
      <div className="flex flex-col gap-4 2xl:gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-sm 2xl:text-[22px] font-bold text-textColor-base">
            Proposal Items
          </h1>
        </div>
        <Separator className="w-full h-[1.3px] 2xl:h-[1.8px] -mb-2 2xl:-mb-3 mx-auto bg-textColor-300/10" />
        <div className="flex items-center justify-between">
          <span className="w-48">
            <IoSearch
              style={{ fontSize: ICON_SIZE }}
              className={`2xl:text-[${ICON_SIZE_xl}px] absolute my-1.5 ml-2 2xl:my-2 2xl:ml-2 text-textColor-400`}
              size={16}
            />
            <Input
              className="pl-8 h-7 text-[11px] 2xl:text-base 2xl:h-8 text-textColor-700 focus:text-textColor-800 font-medium placeholder:text-[11px] 2xl:placeholder:text-sm placeholder:text-textColor-600/40 bg-[#F8F9FD] border-transparent rounded-lg \
              focus-visible:ring-transparent focus-visible:border-PRIMARY-300/70 focus-visible:border-[0.5px] focus:bg-ACCENT-200/30"
              placeholder="Name"
            />
          </span>
          <Button
            onClick={handleAddItem}
            className="h-7 2xl:h-8 flex items-center justify-center gap-1 px-1 font-medium border-[1.5px] 2xl:border-[1.8px] border-textColor-300/50 shadow-sm rounded-lg w-[70px] 2xl:w-[102px] text-textColor-600 tracking-wide duration-150
          hover:border-ACCENT-600/60 hover:text-textColor-900"
          >
            <FaPlus size={16} />
            <span className="text-[10px] 2xl:text-[13.5px]">Add Item</span>
          </Button>
        </div>
        <Separator className="w-full h-[1.3px] 2xl:h-[1.8px] -mt-2 2xl:-mt-3 mx-auto bg-textColor-300/10" />
        <ProposalItemsDataTable
          data={proposalItemsList}
          columns={columns}
          refreshProposalItems={refreshProposalItems}
        />
      </div>
      <div className="flex flex-col gap-3.5 2xl:gap-7">
        <div>
          <Separator className="w-full h-[1.3px] 2xl:h-[1.8px] mx-auto bg-textColor-300/20" />
        </div>
        <span className="flex justify-end items-center gap-5 bg-white rounded-2xl pr-8">
          <Button
            onClick={() => router.push("/proposals")}
            className="w-24 h-7 2xl:w-28 2xl:h-8 shadow-md text-[13.5px] 2xl:text-base border-2 border-textColor-700 text-textColor-700 rounded-sm font-medium tracking-wide duration-150 
          hover:bg-slate-100"
          >
            Save
          </Button>
          <Button
            onClick={() => router.push(`${pathname}/send`)}
            className="w-24 h-7 2xl:w-28 2xl:h-8 shadow-md text-[13.5px] 2xl:text-base from-ACCENT-100 to-ACCENT-400/65 bg-gradient-to-r text-textColor-800 rounded-sm  hover:text-textColor-base hover:bg-PRIMARY-300/80 hover:border-textColor-400/20 duration-150 font-medium tracking-wide"
          >
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
