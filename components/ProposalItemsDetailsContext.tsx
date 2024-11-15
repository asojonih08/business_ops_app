"use client";
import { ProposalDetail } from "@/app/proposals/create-proposal/[proposalId]/send/proposal-details-columns";
import { createContext, useState, ReactNode, useContext } from "react";

export type ProposalItemsDetails = {
  [key: number]: ProposalDetail[];
};

interface ProposalItemsDetailsContextType {
  proposalItemsDetails: ProposalItemsDetails;
  setProposalItemsDetails: React.Dispatch<
    React.SetStateAction<ProposalItemsDetails>
  >;
}

const ProposalItemsDetailsContext = createContext<
  ProposalItemsDetailsContextType | undefined
>(undefined);

function ProposalItemsDetailsProvider({ children }: { children: ReactNode }) {
  const [proposalItemsDetails, setProposalItemsDetails] =
    useState<ProposalItemsDetails>({});

  return (
    <ProposalItemsDetailsContext.Provider
      value={{ proposalItemsDetails, setProposalItemsDetails }}
    >
      {children}
    </ProposalItemsDetailsContext.Provider>
  );
}

function useProposalItemsDetails() {
  const context = useContext(ProposalItemsDetailsContext);
  if (context === undefined)
    throw new Error(
      "ProposalItemsDetailsContext was used outside of provider."
    );
  return context;
}

export { ProposalItemsDetailsProvider, useProposalItemsDetails };
