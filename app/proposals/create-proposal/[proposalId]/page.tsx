import React from "react";
import getProposal from "@/actions/getProposal";
import getEstimatesByProposal from "@/actions/getEstimatesByProposal";
import ConstructProposal from "@/components/ConstructProposal";

//TODO: Refresh proposalItems after materials updated

export default async function Page({ params }: any) {
  const proposalId = Number(params.proposalId?.slice(9));
  // console.log(proposalId);
  const proposal = await getProposal(proposalId);
  const estimates = await getEstimatesByProposal(proposalId);

  // console.log("Estimates at server page render: ", estimates);
  return (
    <div className="h-full my-auto w-full">
      <ConstructProposal proposal={proposal} estimates={estimates} />
    </div>
  );
}
