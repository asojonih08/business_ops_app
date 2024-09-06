"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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
import { useMaterials } from "@/components/MaterialsContext";
import { columns } from "./columns";
import { useEffect, useState } from "react";

export function DataTable() {
  const { materials, setMaterials } = useMaterials();
  const [data, setData] = useState(materials);

  useEffect(() => setData(materials), [materials]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex: number, columnId: number, value: any) => {
        setMaterials((old) =>
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
    },
  });

  return (
    <Table>
      <TableHeader>
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
      </TableHeader>
      <TableBody className="w-36 text-textColor-500 font-medium">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row, index) => (
            <TableRow
              className={`w-36 h-14 ${
                index % 2 === 1 ? "bg-accent-50/50" : ""
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
