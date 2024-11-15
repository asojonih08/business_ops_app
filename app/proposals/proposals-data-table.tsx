"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Settings2 } from "lucide-react";
import { BsCalendarRange } from "react-icons/bs";
import { ICON_SIZE, ICON_SIZE_XL } from "@/constants";
import { IoSearch } from "react-icons/io5";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  // refreshProposalItems: () => void;
}

export function ProposalsDataTable<TData, TValue>({
  columns,
  data,
}: // refreshProposalItems,
DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [periodTimeFilter, setPeriodTimeFilter] = useState<string>();

  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
    // meta: {
    //   refreshItems: refreshProposalItems,
    // }
  });

  function handleTimePeriodFilterSelection(value: string) {}

  return (
    <div>
      <div className="w-full flex justify-between items-center pt-12 pb-5">
        <Select>
          <SelectTrigger
            className="h-8 2xl:h-11 w-[120px] bg-white border-[1.8px] border-textColor-300/50 shadow-sm rounded-lg text-xs 2xl:text-base text-textColor-600 font-medium tracking-wide duration-150
          hover:border-ACCENT-600/60 hover:text-textColor-900"
          >
            <SelectValue placeholder="All Time" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="All Time">All Time</SelectItem>
              <SelectItem value="Last Week">Last Week</SelectItem>
              <SelectItem value="Last Month">Last Month</SelectItem>
              <SelectItem value="Last Year">Last Year</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2.5">
          <span className="w-48">
            <IoSearch
              style={{ fontSize: ICON_SIZE }}
              className={`2xl:text-[${ICON_SIZE_XL}px] absolute my-2 ml-2 2xl:my-2 2xl:ml-2 text-textColor-400`}
              size={16}
            />
            <Input
              className="pl-8 h-8 text-xs] 2xl:text-base 2xl:h-8 text-textColor-700 focus:text-textColor-800 font-medium placeholder:text-xs 2xl:placeholder:text-sm placeholder:text-textColor-600/40 bg-[#F8F9FD] border-transparent rounded-lg \
              focus-visible:ring-transparent focus-visible:border-PRIMARY-300/70 focus-visible:border-[0.5px] focus:bg-ACCENT-200/30"
              placeholder="Project Name"
              value={
                (table.getColumn("projectName")?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn("projectName")
                  ?.setFilterValue(event.target.value)
              }
            />
          </span>
          <Button
            className="h-8 2xl:h-11 bg-white border-[1.8px] border-textColor-300/50 shadow-sm rounded-lg text-xs 2xl:text-base text-textColor-600 font-medium tracking-wide duration-150
        hover:border-ACCENT-600/60 hover:text-textColor-900"
          >
            <span className="flex items-center gap-1 2xl:gap-1.5">
              <BsCalendarRange className="h-[14px] w-[14px] 2xl:h-[17px] 2xl:w-[17px]" />
              <span>Date Range</span>
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="h-8 2xl:h-11 bg-white border-[1.8px] border-textColor-300/50 shadow-sm rounded-lg w-[88px] 2xl:w-[120px] text-xs 2xl:text-base text-textColor-600 font-medium tracking-wide duration-150
              hover:border-ACCENT-600/60 hover:text-textColor-900"
              >
                <span className="flex items-center gap-1 2xl:gap-1.5">
                  <Settings2 className="h-[14px] w-[14px] 2xl:h-[17px] 2xl:w-[17px]" />
                  <span>Status</span>
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-40 text-textColor-600"
            >
              <DropdownMenuLabel className="text-xs">
                Choose Status Filter
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:bg-white">
                <RadioGroup
                  value={
                    (table.getColumn("status")?.getFilterValue() as string) ??
                    ""
                  }
                  onValueChange={(value) =>
                    table.getColumn("status")?.setFilterValue(value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="" id="all" />
                    <Label htmlFor="all" className="text-xs">
                      All
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Draft" id="draft" />
                    <Label htmlFor="draft" className="text-xs">
                      Draft
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Sent" id="sent" />
                    <Label htmlFor="sent" className="text-xs">
                      Sent
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Completed" id="completed" />
                    <Label htmlFor="completed" className="text-xs">
                      Completed
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Cancelled" id="cancelled" />
                    <Label htmlFor="cancelled" className="text-xs">
                      Cancelled
                    </Label>
                  </div>
                </RadioGroup>
              </DropdownMenuItem>
              <DropdownMenuGroup></DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/proposals/create-proposal"
            className="hover:text-blue-700"
          >
            <Button
              className="teacking-wide text-xs 2xl:text-base w-32 2xl:w-40 h-8 rounded-md border-none bg-transparent from-ACCENT-100 to-ACCENT-base/40 bg-gradient-to-r font-semibold text-ACCENT-900 drop-shadow-sm duration-300 px-0 py-0
                hover:bg-PRIMARY-300/70
        "
            >
              <span className="flex items-center gap-1 2xl:gap-1.5">
                <FaPlus className="h-[14px] w-[14px] 2xl:h-[17px] 2xl:w-[17px]" />{" "}
                <span>New Proposal</span>
              </span>
            </Button>
          </Link>
        </div>
      </div>
      <div className="rounded-md border-none">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className="border-none hover:bg-transparent"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className="h-[36px] px-3 py-0.5 bg-[#F8FAFC] items-center"
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="border-b-[1.7px] border-textColor-100 h-12"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      className={`${index === 0 ? "rounded-l-sm" : ""} ${
                        index === row.getVisibleCells().length - 1
                          ? "rounded-r-sm"
                          : ""
                      } h-[31px] px-3 py-0.5`}
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
