import React, { useState } from "react";
import { Label } from "./ui/label";
import { ProposalDetailsDataTable } from "@/app/proposals/create-proposal/[proposald]/send/proposal-details-data-table";
import {
  columns,
  ProposalDetail,
} from "@/app/proposals/create-proposal/[proposald]/send/proposal-details-columns";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { FiPlus } from "react-icons/fi";

export default function ProposalItemDetails() {
  const [proposalItemDetails, setProposalItemDetails] = useState<
    ProposalDetail[]
  >([
    { num: 1, description: null },
    { num: 2, description: null },
  ]);

  function handleDeleteProposalItemDetail(id: number) {
    let newProposalItemDetails = proposalItemDetails.filter(
      (val, index) => index !== id
    );
    newProposalItemDetails = newProposalItemDetails.map(
      (proposalDetail, index) => {
        return { ...proposalDetail, num: index + 1 };
      }
    );
    setProposalItemDetails(newProposalItemDetails);
  }

  function handleAddProposalItemDetailClick() {
    const newProposalItemDetails = [...proposalItemDetails, {num: proposalItemDetails.length + 1, description: null}];
    setProposalItemDetails(newProposalItemDetails);
  }

  return (
    <>
    <ProposalDetailsDataTable
      columns={columns}
      data={proposalItemDetails}
      setData={setProposalItemDetails}
      deleteDataRow={handleDeleteProposalItemDetail}
    />
    <div className="flex items-center gap-2">
    <Separator className="bg-textColor-100 w-[5vw] h-[1.5px] 2xl:h-[1.8px]" />
    <Button
      onClick={handleAddProposalItemDetailClick}
      className="h-[22px] 2xl:h-7 bg-white border-textColor-100 border-[1.8px] shadow-sm rounded-none flex gap-0.5 2xl:gap-1 items-center p-1.5 2xl:p-2.5  
      hover:shadow-sm hover:border-textColor-300/60 hover:border-[1.5px] hover:duration-100"
    >
      <span className="text-textColor-600 text-[10.5]">
        <FiPlus className="h-3 w-3" />
      </span>{" "}
      <span className="font-bold text-[10.5px] text-textColor-700 tracking-wide">
        Add Detail
      </span>
    </Button>
    <Separator className="bg-textColor-100 w-[5vw] h-[1.5px] 2xl:h-[1.8px" />
  </div></>
  );
}
