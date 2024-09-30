"use client";
import {
  RiDeleteBin4Line,
  RiDeleteBin5Fill,
  RiDeleteBin5Line,
  RiDeleteBin6Line,
  RiDeleteBinLine,
  RiEditLine,
} from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ColumnDef } from "@tanstack/react-table";
import { useMaterials } from "@/components/MaterialsContext";
import { FaEdit, FaRegEdit } from "react-icons/fa";
import { GrTrash } from "react-icons/gr";
import { FaRegTrashCan } from "react-icons/fa6";
import { useSelecetedProposalItem } from "@/components/SelectedItemContext";

export type ProposalItem = {
  num: number | null;
  name: string | null;
  room: string | null;
  fixture: string | null;
  amount: number | null;
  status: string | null;
};

export const columns: ColumnDef<ProposalItem>[] = [
  {
    accessorKey: "num",
    header: () => (
      <div className="uppercase text-[10px] text-textColor-600/60">#</div>
    ),
    cell: ({ row }) => (
      <div className="font-semibold text-[13px] text-textColor-600/85 capitalize">
        {row.getValue("num")}
      </div>
    ),
  },
  {
    accessorKey: "room",
    header: () => (
      <div className="uppercase text-[10px] text-textColor-600/60">Room</div>
    ),
    cell: ({ row }) => (
      <div className="text-[11.5px] 2xl:text-[13px] text-textColor-600/85 capitalize font-medium">
        {row.getValue("room")}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: () => (
      <div className="uppercase text-[10px] text-textColor-600/60">Name</div>
    ),
    cell: ({ row }) => (
      <div className="text-[11.5px] 2xl:text-[13px] text-textColor-600/85 capitalize font-medium">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "fixture",
    header: () => (
      <div className="uppercase text-[10px] text-textColor-600/60">Fixture</div>
    ),
    cell: ({ row }) => (
      <div className="text-[11.5px] 2xl:text-[13px] text-textColor-600/85 capitalize font-medium">
        {row.getValue("fixture")}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: () => (
      <div className="uppercase text-[10px] text-textColor-600/60">Amount</div>
    ),
    cell: ({ row }) => (
      <div className="text-[11.5px] 2xl:text-[13px] text-textColor-600/85 capitalize font-medium">
        ${row.getValue("amount")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => (
      <div className="uppercase text-[10px] text-textColor-600/60">Status</div>
    ),
    cell: ({ row }) => (
      <div className="text-[11.5px] 2xl:text-[13px] text-textColor-600/85 capitalize font-medium">
        <span
          className={`${
            row.getValue("status") === "Draft"
              ? "text-yellow-700/80 rounded-xl bg-yellow-200/30 px-[7px] py-[1px] border border-yellow-700/15"
              : "text-[#11523D]/80 rounded-xl bg-[#EBFEF6] px-[7px] py-[1px] border border-[#11523D]/15"
          }`}
        >
          {row.getValue("status")}
        </span>
      </div>
    ),
  },

  {
    id: "action",
    cell: ({ row }) => {
      const { selectedProposalItem, setSelectedProposalItem } =
        useSelecetedProposalItem();
      const { materials, setMaterials } = useMaterials();
      function handleDeleteMaterial(num: number) {
        if (materials.length === 1) return;
        console.log(
          "num",
          num,
          "type",
          row.getValue("type"),
          "description",
          row.getValue("description"),
          "quantity",
          row.getValue("quantity"),
          "rate",
          row.getValue("rate"),
          "amount",
          row.getValue("amount")
        );

        const newMaterials = materials.filter(
          (material) => num !== material["num"]
        );
        const updatedNumMaterials = newMaterials.map((material, index) => {
          return { ...material, num: index + 1 };
        });
        setMaterials(updatedNumMaterials);
      }
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="text-center h-[18px] w-full text-textColor-600/85 hover:text-textColor-base hover:duration-200 mt-1">
            <BsThreeDots className="h-[14.5px] w-[14.5px] 2xl:h-4 2xl:w-4 mx-auto" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="rounded-lg min-w-[116px] w-[116px]"
            align="end"
          >
            <DropdownMenuItem
              onClick={() =>
                setSelectedProposalItem(Number(row.getValue("num")) - 1)
              }
              className="hover:bg-accent-200/30 hover:cursor-pointer -my-0.5"
            >
              <div className="w-full flex justify-between items-center">
                <span className="text-[13px] text-[#020406]">Edit</span>
                <FaEdit className="text-textColor-900/75" size={13.5} />
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="mx-1.5 bg-textColor-900/10 h-[0.7px]" />
            <DropdownMenuItem className="hover:bg-accent-200/30 hover:cursor-pointer -my-0.5">
              <div className="w-full flex justify-between items-center">
                <span className="text-[13px] text-[#FD4238]">Delete</span>
                <RiDeleteBin6Line className="text-[#FF3B30]" size={13.5} />
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
