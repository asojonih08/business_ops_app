"use client";
import { EstimateCalculations } from "@/types";
import { createContext, useState, ReactNode, useContext } from "react";

interface EstimateCalculationsContextType {
  estimateCalculations: EstimateCalculations;
  setEstimateCalculations: React.Dispatch<
    React.SetStateAction<EstimateCalculations>
  >;
}

const initialState: EstimateCalculations = {
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

const EstimateCalculationsContext = createContext<
  EstimateCalculationsContextType | undefined
>(undefined);

function EstimateCalculationsProvider({ children }: { children: ReactNode }) {
  const [estimateCalculations, setEstimateCalculations] =
    useState<EstimateCalculations>(initialState);

  return (
    <EstimateCalculationsContext.Provider
      value={{ estimateCalculations, setEstimateCalculations }}
    >
      {children}
    </EstimateCalculationsContext.Provider>
  );
}

function useEstimateCalculations() {
  const context = useContext(EstimateCalculationsContext);
  if (context === undefined)
    throw new Error("Context was used outside of provider.");
  return context;
}

export { EstimateCalculationsProvider, useEstimateCalculations };
