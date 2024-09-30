import React from "react";
import CreateEstimate from "@/components/CreateEstimate";
import ProposalTotals from "@/components/ProposalTotals";
import EstimateSummary from "@/components/EstimateSummary";
import ProposalItems from "@/components/ProposalItems";
import getProposal from "@/actions/getProposal";
import getEstimatesByProposal from "@/actions/getEstimatesByProposal";

export default async function Page({ params }: any) {
  const proposalId = Number(params.proposalId?.slice(9));
  // console.log(proposalId);
  const proposal = await getProposal(proposalId);
  const proposalItems = await getEstimatesByProposal(proposalId);
  // console.log(proposal);
  return (
    <div className="h-full my-auto w-full flex gap-4 2xl:gap-6 justify-between">
      <div className="h-full w-[45%] flex flex-col gap-4 2xl:gap-6 rounded-2xl">
        <div className="px-6 py-4 2xl:px-8 2xl:py-5 rounded-2xl h-[15%] bg-white flex flex-col gap-6 items-center">
          <ProposalTotals proposal={proposal} proposalItems={proposalItems} />
        </div>
        <div className="px-8 py-5 2xl:px-8 2xl:py-7 rounded-2xl bg-white h-[85%]">
          <CreateEstimate proposalItems={proposalItems} />
        </div>
      </div>
      <div className="w-[55%] flex flex-col gap-6 justify-between">
        <div className="px-6 py-5 2xl:px-8 2xl:py-8 rounded-2xl h-[50%] bg-white">
          <EstimateSummary />
        </div>
        <div className="px-6 py-5 2xl:px-8 2xl:py-7 h-[50%] bg-white w-full rounded-2xl">
          <ProposalItems proposalItems={proposalItems} />
        </div>
      </div>
    </div>
  );
}
