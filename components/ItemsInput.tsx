"use client";
import React, { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { motion } from "framer-motion";
import { ItemClassificationsDataTable } from "@/app/proposals/create-proposal/items-input-data-table";
import { Button } from "./ui/button";
import { FiPlus } from "react-icons/fi";
import { Separator } from "./ui/separator";
import {
  useItemClassifications,
  initialState,
} from "./ItemClassificationsContext";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function ItemsInput() {
  const [showItemsInputTable, setShowItemsInputTable] = useState(false);
  const { itemClassifications, setItemClassifications } =
    useItemClassifications();

  function handleAddItemClassificationClick() {
    let count = itemClassifications.length + 1;
    setItemClassifications([
      ...itemClassifications,
      { ...initialState, num: count },
    ]);
  }

  return (
    <div className="flex flex-col gap-10 w-full h-full items-center">
      <div className="items-center justify-center flex space-x-2 w-full  2xl:mt-5">
        <Checkbox
          className="from-[#f7f9f9] to-PRIMARY-base/90 bg-gradient-to-tr border-PRIMARY-500/15 items-center border h-3.5 w-3.5 2xl:h-4 2xl:w-4"
          checked={showItemsInputTable}
          onCheckedChange={() => setShowItemsInputTable(!showItemsInputTable)}
          id="terms1"
        />
        <label
          htmlFor="terms1"
          className="text-[13px] 2xl:text-[17px] font-semibold text-ACCENT-800"
        >
          Enter item names and attributes
        </label>
      </div>

      {showItemsInputTable && (
        <ScrollArea className="max-h-[83%] h-[83%] w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ transition: { duration: 0.5 }, opacity: 100 }}
            className="w-full h-full flex flex-col justify-between"
          >
            <ItemClassificationsDataTable />

            <div className="flex items-center gap-2 pt-3">
              <Separator className="bg-textColor-100 w-[12vw] h-[1.8px]" />
              <Button
                onClick={handleAddItemClassificationClick}
                className="h-7 bg-white border-textColor-100 border-[1.8px] shadow-sm rounded-none flex gap-1 items-center p-2.5  
              hover:shadow-sm hover:border-textColor-300/60 hover:border-[1.5px] hover:duration-100"
              >
                <span className="text-textColor-600 text-[14.5]">
                  <FiPlus />
                </span>{" "}
                <span className="font-bold text-[12.5px] text-textColor-700 tracking-wide">
                  Add Item
                </span>
              </Button>
              <Separator className="bg-textColor-100 w-[12vw] h-[1.8px]" />
            </div>
          </motion.div>
        </ScrollArea>
      )}
    </div>
  );
}
