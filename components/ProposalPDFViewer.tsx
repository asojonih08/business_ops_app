"use client";
import React from "react";
import ProposalPDFBuilder from "./ProposalPDFBuilder";
import { PDFViewer } from "@react-pdf/renderer";
import { Proposal, Estimate, Client } from "@/types";
import { ProposalItemsDetails } from "./ProposalItemsDetailsContext";

interface ProposalPDFViewerProps {
  proposal: Proposal;
  proposalItems: Estimate[];
  client: Client;
  proposalItemsDetails: ProposalItemsDetails;
}

export default function ProposalPDFViewer({
  proposal,
  proposalItems,
  client,
  proposalItemsDetails,
}: ProposalPDFViewerProps) {
  return (
    <PDFViewer className="w-full h-full">
      <ProposalPDFBuilder
        proposal={proposal}
        proposalItems={proposalItems}
        client={client}
        proposalItemsDetails={proposalItemsDetails}
      />
    </PDFViewer>
  );
}
