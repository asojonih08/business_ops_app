"use client";
import { ItemClassification } from "@/app/proposals/create-proposal/items-input-columns";
import { createContext, useState, ReactNode, useContext } from "react";
interface ItemClassificationContextType {
  itemClassifications: ItemClassification[];
  setItemClassifications: React.Dispatch<
    React.SetStateAction<ItemClassification[]>
  >;
}

const ItemClassificationsContext = createContext<
  ItemClassificationContextType | undefined
>(undefined);

const initialState: ItemClassification = {
  num: 1,
  name: null,
  type: null,
  room: null,
};
function ItemClassificationsProvider({ children }: { children: ReactNode }) {
  const [itemClassifications, setItemClassifications] = useState<
    ItemClassification[]
  >([initialState]);

  return (
    <ItemClassificationsContext.Provider
      value={{ itemClassifications, setItemClassifications }}
    >
      {children}
    </ItemClassificationsContext.Provider>
  );
}

function useItemClassifications() {
  const context = useContext(ItemClassificationsContext);
  if (context === undefined)
    throw new Error("Context was used outside of provider.");
  return context;
}

export { ItemClassificationsProvider, useItemClassifications, initialState };
