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
  Cloud,
  CreditCard,
  Delete,
  Download,
  Edit,
  Eye,
  EyeIcon,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Send,
  Settings,
  Trash,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ColumnDef } from "@tanstack/react-table";
import { FaEdit, FaRegEdit } from "react-icons/fa";
import { useSelecetedProposalItem } from "@/components/SelectedItemContext";
import deleteEstimate from "@/actions/deleteEstimate";
import { toast } from "sonner";
import { ArrowUpDown } from "lucide-react";

export type Proposal = {
  id: number | null | undefined;
  createdAt: string | null;
  projectName: string | null;
  clientName: string | null;
  status: string | null;
  totalCost: number | null;
  estimatesAmount: number | null;
  dateSent: string | null;
};

export const proposal_columns: ColumnDef<Proposal>[] = [
  {
    accessorKey: "id",
    header: () => null,
    cell: ({ row }) => null,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span className="uppercase text-[10px] text-textColor-600/60">
          Created At
        </span>
        <ArrowUpDown className="ml-2 h-3 w-3 text-textColor-600/60" />
      </Button>
    ),
    cell: ({ row }) => {
      const createdAtDate = new Date(row.getValue("createdAt"));
      const formattedDate = createdAtDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return (
        <div className="text-[11.5px] 2xl:text-[13px] text-textColor-600/85 capitalize font-medium">
          {formattedDate}
        </div>
      );
    },
  },
  {
    accessorKey: "projectName",
    header: () => (
      <div className="uppercase text-[10px] text-textColor-600/60">
        Project Name
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-[11.5px] 2xl:text-[13px] text-textColor-600/85 capitalize font-medium">
        {row.getValue("projectName")}
      </div>
    ),
  },
  {
    accessorKey: "clientName",
    header: () => (
      <div className="uppercase text-[10px] text-textColor-600/60">
        {" "}
        Client Name
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-[11.5px] 2xl:text-[13px] text-textColor-600/85 capitalize font-medium">
        {row.getValue("clientName")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => (
      <div className="uppercase text-[10px] text-textColor-600/60">Status</div>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <div
          className={`text-[11.5px] 2xl:text-[13px] text-textColor-600/85 capitalize font-medium`}
        >
          <span
            className={`p-1 px-1.5 rounded-lg
            ${status === "Draft" ? `border border-[#FAD800]` : ""}
            ${status === "Sent" ? `border border-[#64D9FF]` : ""}
            ${status === "Cancelled" ? `border border-[#FF2A04]` : ""}
            ${status === "Completed" ? `border border-[#00E200]` : ""}
            `}
          >
            {row.getValue("status")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "totalCost",
    header: () => (
      <div className="uppercase text-[10px] text-textColor-600/60">
        Total Cost
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-[11.5px] 2xl:text-[13px] text-textColor-600/85 capitalize font-medium">
        ${Number(row.getValue("totalCost")).toFixed(2)}
      </div>
    ),
  },
  {
    accessorKey: "estimatesAmount",
    header: () => (
      <div className="uppercase text-[10px] text-textColor-600/60">
        Estimates
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-[11.5px] 2xl:text-[13px] text-textColor-600/85 capitalize font-medium">
        {Number(row.getValue("estimatesAmount"))}
      </div>
    ),
  },
  {
    accessorKey: "dateSent",
    header: () => (
      <div className="uppercase text-[10px] text-textColor-600/60">
        Last Date Sent
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-[11.5px] 2xl:text-[13px] text-textColor-600/85 capitalize font-medium">
        {row.getValue("dateSent") === ""
          ? "Not sent"
          : row.getValue("dateSent")}
      </div>
    ),
  },
  {
    id: "action",
    cell: ({ row, table }) => {
      const { selectedProposalItem, setSelectedProposalItem } =
        useSelecetedProposalItem();

      async function handleDeleteItem() {
        console.log("delete id: ", row.getValue("id"));
        const deletedNum: number = row.getValue("num");
        const deletedName: string = row.getValue("name");
        deleteEstimate(row.getValue("id"));
        if (selectedProposalItem === deletedNum - 1) {
          if (selectedProposalItem === 0) {
            setSelectedProposalItem(0);
          } else {
            setSelectedProposalItem(0);
          }
        }
        // table.options.meta?.refreshItems();

        toast("Item " + deletedName + " was deleted");
      }
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-full w-full">
              <BsThreeDots className="h-5 w-5 text-textColor-600" />{" "}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 text-textColor-600">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Edit className="h-3.5 w-3.5 mr-1" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Trash className="h-3.5 w-3.5 mr-1" />
                <span>Delete</span>
              </DropdownMenuItem>
              <DropdownMenuLabel>Document</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <EyeIcon className="h-3.5 w-3.5 mr-1" />
                <span>View</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="h-3.5 w-3.5 mr-1" />
                <span>Download</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Send className="h-3.5 w-3.5 mr-1" />
                <span>Send</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
