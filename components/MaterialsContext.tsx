"use client";
import { Material } from "@/app/proposals/create-proposal/[proposalId]/materials-columns";
import { createContext, useState, ReactNode, useContext } from "react";
interface MaterialContextType {
  materials: Material[];
  setMaterials: React.Dispatch<React.SetStateAction<Material[]>>;
}

const MaterialsContext = createContext<MaterialContextType | undefined>(
  undefined
);

const inititalState: Material = {
  num: 1,
  type: null,
  description: null,
  quantity: null,
  rate: null,
  amount: null,
};

function MaterialsProvider({ children }: { children: ReactNode }) {
  const [materials, setMaterials] = useState<Material[]>([inititalState]);

  return (
    <MaterialsContext.Provider value={{ materials, setMaterials }}>
      {children}
    </MaterialsContext.Provider>
  );
}

function useMaterials() {
  const context = useContext(MaterialsContext);
  if (context === undefined)
    throw new Error("Context was used outside of provider.");
  return context;
}

export { MaterialsProvider, useMaterials };
