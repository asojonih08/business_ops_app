import React from "react";
import { ProposalsDataTable } from "./proposals-data-table";
import { proposal_columns } from "./proposals-columns";
import getProposals from "@/actions/getProposals";

export default async function page() {
  const proposals = await getProposals();
  const proposals_data = proposals.map((proposal, index) => {
    const lastDateSent = proposal.sent_to
      ? new Date(proposal.date_sent[0]).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";
    return {
      id: proposal.id ?? 0,
      createdAt: proposal.created_at,
      projectName: proposal.project_name,
      clientName: proposal.client_name,
      status: proposal.status,
      totalCost: proposal.total_cost,
      estimatesAmount: proposal.estimates.length,
      dateSent: lastDateSent,
    };
  });
  return (
    <div className="w-full h-full bg-white rounded-2xl flex flex-col gap-4">
      <div className="mx-12">
        <ProposalsDataTable data={proposals_data} columns={proposal_columns} />
      </div>
    </div>
  );
}
