"use client";
import { RiDeleteBin4Line } from "react-icons/ri";
import { FaRegPlusSquare } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    cell: ({ row }) => (
      <div className="text-right font-medium">{row.getValue("num")}</div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <div className="overflow-hidden">
        <Select>
          {" "}
          <SelectTrigger className="border-0 hover:border-[1.5px] focus-visible:ring-0 focus-visible:ring-transparent focus-visible:border-transparent h-6 w-[140px] -mr-12 text-sm">
            <SelectValue className="text-sm" placeholder="" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value="light"
              className="text-sm data-[highlighted]:bg-textColor-50 data-[highlighted]:text-textColor-600 text-textColor-500 selection:text-textColor-100 font-medium hover:bg-textColor-50 hover:rounded-lg"
            >
              Light
            </SelectItem>
            <SelectItem
              value="dark"
              className="text-sm text-textColor-500 font-medium hover:bg-textColor-50 hover:rounded-lg"
            >
              Dark
            </SelectItem>
            <SelectItem
              value="system"
              className="text-sm text-textColor-500 font-medium hover:bg-textColor-50 hover:rounded-lg"
            >
              System
            </SelectItem>
            <SelectItem
              value="addNew"
              className="text-sm text-textColor-500 font-medium hover:bg-textColor-50 hover:rounded-lg"
            >
              <div className="flex items-center gap-1">
                <FaRegPlusSquare size={13} />
                <span className="text-sm">Add New</span>
              </div>
            </SelectItem>
          </SelectContent>{" "}
        </Select>
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: () => <div className="text-right font-bold">Description</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {row.getValue("description")}
      </div>
    ),
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-right font-bold">Quantity</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">{row.getValue("quantity")}</div>
    ),
  },
  {
    accessorKey: "rate",
    header: () => <div className="text-right font-bold">Rate</div>,
    cell: ({ row }) => {
      const rate = parseFloat(row.getValue("rate"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(rate);
      if (!rate) return null;
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "amount",

    header: () => <div className="text-right font-bold">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      if (!amount) return null;
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },

  {
    id: "delete",
    cell: ({ row }) => (
      <div className="text-center h-5">
        <Button className="h-5 text-textColor-300 hover:text-textColor-500 hover:duration-300">
          <RiDeleteBin4Line className="h-5 w-5" />
        </Button>
      </div>
    ),
  },
];
