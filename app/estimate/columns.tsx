"use client";

import { ColumnDef } from "@tanstack/react-table";
import { StringToBoolean } from "class-variance-authority/types";

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
    header: "#",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "rate",
    header: "Rate",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
