"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  TableMeta as ReactTableMeta,
} from "@tanstack/react-table";
import { ProposalDetail } from "./proposal-details-columns";
import { Dispatch, SetStateAction, useRef } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  deleteDataRow: (id: number) => void;
  setData: Dispatch<SetStateAction<ProposalDetail[]>>;
}

interface TableMeta {
  deleteRow: (rowIndex: number) => void;
  updateData: (rowIndex: number, columnId: number, value: any) => void;
}

// TODO: check quantity and rate for valid number input

export function ProposalDetailsDataTable<TData, TValue>({
  columns,
  data,
  deleteDataRow,
  setData,
}: DataTableProps<TData, TValue>) {
  const bottomOfTableRef = useRef<HTMLTableElement>(null);
  const prevDataLength = useRef<number>(data.length);

  // useEffect(() => setData(itemClassifications), [itemClassifications]);
  // useEffect(() => {
  //   if (data.length > prevDataLength.current)
  //     bottomOfTableRef.current?.scrollIntoView({
  //       behavior: "smooth",
  //       block: "end",
  //     });
  //   // Update the previous data length to the current length
  //   prevDataLength.current = data.length;
  // }, [data, prevDataLength]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      deleteRow: (rowIndex: number) => {
        deleteDataRow(rowIndex);
      },
      updateData: (rowIndex: number, columnId: number, value: any) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    } as TableMeta,
  });

  return (
    <Table ref={bottomOfTableRef} className="border-b">
      {/* <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow className="h-12" key={headerGroup.id}>
            {headerGroup.headers.map((header, index) => {
              return (
                <TableHead
                  className={`w-20 p-2.5 ${
                    index !== 0 ? "border-l-2" : ""
                  } border-textColor-100 font-bold`}
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
      </TableHeader> */}
      <TableBody className="text-textColor-500 font-medium border-t-[1.5px]">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row, index) => (
            <TableRow
              className={`h-8 2xl:h-11 hover:bg-PRIMARY-50/40 ${
                index % 2 === 1 ? "bg-ACCENT-50/50" : ""
              }`}
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell, index) => (
                <TableCell
                  className={`${
                    index !== 0 ? "border-l-2" : ""
                  } border-textColor-100 p-2.5`}
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
