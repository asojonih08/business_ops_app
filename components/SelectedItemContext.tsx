"use client";
import { createContext, useState, ReactNode, useContext } from "react";

interface SelectedProposalItemContextType {
  selectedProposalItem: number;
  setSelectedProposalItem: React.Dispatch<React.SetStateAction<number>>;
}

const SelectedProposalItemContext = createContext<
  SelectedProposalItemContextType | undefined
>(undefined);

function SelectedProposalItemProvider({ children }: { children: ReactNode }) {
  const [selectedProposalItem, setSelectedProposalItem] = useState<number>(0);

  return (
    <SelectedProposalItemContext.Provider
      value={{ selectedProposalItem, setSelectedProposalItem }}
    >
      {children}
    </SelectedProposalItemContext.Provider>
  );
}

function useSelecetedProposalItem() {
  const context = useContext(SelectedProposalItemContext);
  if (context === undefined)
    throw new Error("Context was used outside of provider.");
  return context;
}

export { SelectedProposalItemProvider, useSelecetedProposalItem };
