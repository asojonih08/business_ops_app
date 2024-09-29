"use client";
import { ProposalDetail } from "@/app/proposals/create-proposal/[proposalId]/send/proposal-details-columns";
import { createContext, useState, ReactNode, useContext } from "react";
interface ProposalDetailContextType {
  proposalDetails: ProposalDetail[];
  setProposalDetails: React.Dispatch<React.SetStateAction<ProposalDetail[]>>;
}

const ProposalDetailsContext = createContext<
  ProposalDetailContextType | undefined
>(undefined);

const initialState: ProposalDetail = {
  num: 1,
  description: null,
};
function ProposalDetailsProvider({ children }: { children: ReactNode }) {
  const [proposalDetails, setProposalDetails] = useState<ProposalDetail[]>([
    initialState,
  ]);

  return (
    <ProposalDetailsContext.Provider
      value={{ proposalDetails, setProposalDetails }}
    >
      {children}
    </ProposalDetailsContext.Provider>
  );
}

function useProposalDetails() {
  const context = useContext(ProposalDetailsContext);
  if (context === undefined)
    throw new Error("Context was used outside of provider.");
  return context;
}

export { ProposalDetailsProvider, useProposalDetails, initialState };
