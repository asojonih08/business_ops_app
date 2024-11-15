"use client";
import React, { useEffect } from "react";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import ProposalItemDetails from "./ProposalItemDetails";
import { Estimate } from "@/types";
import {
  ProposalItemsDetails,
  useProposalItemsDetails,
} from "./ProposalItemsDetailsContext";
import { parseMaterials } from "@/lib/utils";

interface ProposalItemDetailsListProps {
  proposalItems: Estimate[] | undefined;
}

export default function ProposalItemsDetailsList({
  proposalItems,
}: ProposalItemDetailsListProps) {
  const { proposalItemsDetails, setProposalItemsDetails } =
    useProposalItemsDetails();
  useEffect(() => {
    let intitialproposalItemsDetials: ProposalItemsDetails = {};
    proposalItems?.map((proposalItem, index) => {
      let materials = parseMaterials(proposalItem.materials);
      if (proposalItem.id)
        intitialproposalItemsDetials[proposalItem.id] = materials.map(
          (material, index) => {
            return { num: index + 1, description: material.description ?? "" };
          }
        );
    });
    setProposalItemsDetails(intitialproposalItemsDetials);
  }, []);

  return (
    <ul>
      {proposalItems
        ? proposalItems.map((proposalItem, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Label className="text-base 2xl:text-lg text-textColor-700 font-bold tracking-wide mb-3.5 2xl:mb-5">
                {index + 1} - {proposalItem.item_name}
              </Label>
              <ProposalItemDetails proposalItem={proposalItem} />
              <Separator className="h-[1.2px] w-full bg-textColor-500/50 my-6 2xl:my-7" />
            </div>
          ))
        : null}
    </ul>
  );
}
