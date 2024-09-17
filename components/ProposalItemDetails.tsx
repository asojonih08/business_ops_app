import React, { useState } from "react";
import { Label } from "./ui/label";
import { ProposalDetailsDataTable } from "@/app/proposals/create-proposal/[projectId]/send/proposal-details-data-table";
import {
  columns,
  ProposalDetail,
} from "@/app/proposals/create-proposal/[projectId]/send/proposal-details-columns";

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
  return (
    <ProposalDetailsDataTable
      columns={columns}
      data={proposalItemDetails}
      setData={setProposalItemDetails}
      deleteDataRow={handleDeleteProposalItemDetail}
    />
  );
}
