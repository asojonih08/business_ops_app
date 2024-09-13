"use client";
import React, { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { MaterialsDataTable } from "@/app/proposals/materials-data-table";
import { motion } from "framer-motion";

export default function ItemsInput() {
  const [showItemsInputTable, setShowItemsInputTable] = useState(false);
  return (
    <div className="flex flex-col gap-10 w-full h-full items-center">
      <div className="items-center justify-center flex space-x-2 w-full">
        <Checkbox
          className="from-[#f7f9f9] to-primary-base/90 bg-gradient-to-tr border-primary-500/15 border"
          checked={showItemsInputTable}
          onCheckedChange={() => setShowItemsInputTable(!showItemsInputTable)}
          id="terms1"
        />
        <label
          htmlFor="terms1"
          className="text-lg font-semibold text-accent-800"
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
          <MaterialsDataTable />
        </motion.div>
      )}
    </div>
  );
}
