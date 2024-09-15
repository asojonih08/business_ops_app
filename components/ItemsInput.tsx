"use client";
import React, { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { motion } from "framer-motion";
import { ItemClassificationsDataTable } from "@/app/proposals/create-proposal/items-input-data-table";

export default function ItemsInput() {
  const [showItemsInputTable, setShowItemsInputTable] = useState(false);

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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ transition: { duration: 0.5 }, opacity: 100 }}
          className="w-full"
        >
          <ItemClassificationsDataTable />
        </motion.div>
      )}
    </div>
  );
}
