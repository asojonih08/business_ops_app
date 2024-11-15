"use client";
import React, { useState } from "react";
import ProposalTotals from "./ProposalTotals";
import CreateEstimate from "./CreateEstimate";
import EstimateSummary from "./EstimateSummary";
import ProposalItems from "./ProposalItems";
import { Estimate, Proposal } from "@/types";
import getEstimatesByProposal from "@/actions/getEstimatesByProposal";

interface ConstructProposalProps {
  proposal: Proposal;
  estimates: Estimate[];
}

export default function ConstructProposal({
  proposal,
  estimates,
}: ConstructProposalProps) {
  const [proposalItems, setProposalItems] = useState(estimates);

  async function refreshProposalItems() {
    let updatedProposalItems: Estimate[];
    // console.log("Refresh Proposal Items Called");
    // console.log("Refresh <current proposal>: ", proposal);
    if (proposal.id) {
      updatedProposalItems = await getEstimatesByProposal(proposal?.id);
      // console.log("Refresh Proposal Items: ", updatedProposalItems);
      setProposalItems(updatedProposalItems);
    }
  }

  return (
    <div className="flex gap-4 2xl:gap-6 justify-between h-full w-full">
      <div className="h-full w-[44%] flex flex-col gap-4 2xl:gap-6 rounded-2xl">
        <div className="px-6 py-4 2xl:px-8 2xl:py-5 rounded-2xl h-[13%] bg-white flex flex-col gap-6 items-center">
          <ProposalTotals proposalItems={proposalItems} />
        </div>
        <div className="px-8 py-5 2xl:px-8 2xl:py-7 rounded-2xl bg-white h-[87%]">
          <CreateEstimate
            proposalItems={proposalItems}
            refreshProposalItems={refreshProposalItems}
          />
        </div>
      </div>
      <div className="w-[56%] flex flex-col gap-6 justify-between">
        <div className="px-6 py-5 2xl:px-8 2xl:py-8 rounded-2xl h-[50%] bg-white">
          <EstimateSummary proposalItems={proposalItems} />
        </div>
        <div className="px-6 py-5 2xl:px-8 2xl:py-7 h-[50%] bg-white w-full rounded-2xl">
          <ProposalItems 
            proposalItems={proposalItems}
            refreshProposalItems={refreshProposalItems}
          />
        </div>
      </div>
    </div>
  );
}
