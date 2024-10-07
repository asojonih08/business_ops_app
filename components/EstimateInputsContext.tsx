"use client";
import { EstimateInputs } from "@/types";
import { createContext, useState, ReactNode, useContext } from "react";

interface EstimateInputsContextType {
  estimateInputs: EstimateInputs;
  setEstimateInputs: React.Dispatch<React.SetStateAction<EstimateInputs>>;
}

const initialState: EstimateInputs = {
  materialsCost: 0,
  materialMarkupRate: 0,
  fabricationHours: 0,
  installationHours: 0,
  subcontractorCost: 0,
  independentContractorCost: 0,
  deliveryCost: 0,
  gasCost: 0,
  equipmentRentalCost: 0,
  miscellaneousCost: 0,
};

const EstimateInputsContext = createContext<
  EstimateInputsContextType | undefined
>(undefined);

function EstimateInputsProvider({ children }: { children: ReactNode }) {
  const [estimateInputs, setEstimateInputs] =
    useState<EstimateInputs>(initialState);

  return (
    <EstimateInputsContext.Provider
      value={{ estimateInputs, setEstimateInputs }}
    >
      {children}
    </EstimateInputsContext.Provider>
  );
}

function useEstimateInputs() {
  const context = useContext(EstimateInputsContext);
  if (context === undefined)
    throw new Error("Context was used outside of provider.");
  return context;
}

export { EstimateInputsProvider, useEstimateInputs };
