"use client";
import { RiDeleteBin4Line } from "react-icons/ri";
import { FaRegPlusSquare } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, } from "@/components/ui/select";
import { ColumnDef } from "@tanstack/react-table";

export type Material = {
  num: number | null;
  type: string | null;
  description: string | null;
  quantity: number | null;
  rate: number | null;
  amount: number | null;
};

export const columns: ColumnDef<Material>[] = [
  {
    accessorKey: "num",
    header: () => <div className="text-right font-bold">#</div>,
    cell: ({row}) => <div className="text-right font-bold">{row.getValue("num")}</div>
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({row}) => <Select> <SelectTrigger className="border-0 hover:border-[1.5px] focus-visible:ring-0 focus-visible:ring-transparent focus-visible:border-transparent w-[160px]">
    <SelectValue placeholder="" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light" className="font-normal hover:bg-textColor-50 hover:rounded-lg flex items-center gap-2 p-2">Light</SelectItem>
    <SelectItem value="dark" className="font-normal hover:bg-textColor-50 hover:rounded-lg flex items-center gap-2 p-2">Dark</SelectItem>
    <SelectItem value="system" className="font-normal hover:bg-textColor-50 hover:rounded-lg flex items-center gap-2 p-2">System</SelectItem>
    <SelectItem value="system" className="font-normal hover:bg-textColor-50 hover:rounded-lg flex items-center gap-2 p-2"><div className="font-normal hover:bg-textColor-50 hover:rounded-lg flex items-center gap-2 p-2"><FaRegPlusSquare size={14} /><span>Add New</span></div></SelectItem>
  </SelectContent>  </Select>
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-right font-bold">Quantity</div>,
    cell: ({row}) => <div className="text-right font-bold">{row.getValue("quantity")}</div>
  },
  {
    accessorKey: "rate",
    header: () => <div className="text-right font-bold">Rate</div>,
    cell: ({ row }) => {
      const rate = parseFloat(row.getValue("rate"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(rate)
      if (!rate) return null;
      return <div className="text-right font-medium">{formatted}</div>}
  },
  {
    accessorKey: "amount",

    header: () => <div className="text-right font-bold">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      if (!amount) return null;
      return <div className="text-right font-medium">{formatted}</div>}
  },

  {
    id: "delete",
    cell: ({ row }) => 
      <div className="text-center"><Button><RiDeleteBin4Line size={20} /></Button></div>
    
  },

];
