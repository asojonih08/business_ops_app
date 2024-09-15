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
import { useMaterials } from "@/components/MaterialsContext";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { AutoComplete } from "@/components/ui/autocomplete";
import { useItemClassifications } from "@/components/ItemClassificationsContext";

interface EditableCellProps {
  variant: string;
  type?: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  emptyMessageItemName?: string;
  getValue: () => any;
  cellProps: {
    row: any;
    column: any;
    table: any;
  };
}

function EditableCell({
  variant = "input",
  type = "text",
  disabled = false,
  className = "",
  placeholder = "",
  emptyMessageItemName = "",
  getValue,
  cellProps,
}: EditableCellProps) {
  const initialValue = !getValue() ? "" : getValue();
  const { row, column, table } = cellProps;
  const [value, setValue] = useState(!initialValue ? "" : initialValue);
  const [searchValue, setSearchValue] = useState<string>("");

  const types = [
    {
      value: "Cabinet",
      label: "Cabinet",
    },
    {
      value: "Deck",
      label: "Deck",
    },
    {
      value: "Table",
      label: "Table",
    },
    {
      value: "Flooring",
      label: "Flooring",
    },
    {
      value: "Siding",
      label: "Siding",
    },
  ];

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  switch (variant) {
    case "input":
      return (
        <Input
          disabled={disabled}
          className={`${className}`}
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
        />
      );
    case "select":
      return (
        <Select value={value} onValueChange={(val) => setValue(val)}>
          <SelectTrigger
            onBlur={onBlur}
            className={`${className} h-7 -mr-12 text-sm`}
          >
            <SelectValue
              className="focus-visible:ring-0 text-sm"
              placeholder=""
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value="light"
              className="text-sm data-[highlighted]:bg-textColor-50 data-[highlighted]:text-textColor-600 text-textColor-500 selection:text-textColor-100 font-medium hover:bg-textColor-50 hover:rounded-lg"
            >
              Light
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
      );
    case "autocomplete":
      return (
        <AutoComplete
          selectedValue={value}
          onSelectedValueChange={setValue}
          searchValue={searchValue}
          onSearchValueChange={setSearchValue}
          items={types}
          emptyMessage={`No ${emptyMessageItemName} found.`}
          shouldFilter
          className={className}
          placeholder={placeholder}
        />
      );
  }
}

export type ItemClassification = {
  num: number | null;
  name: string | null;
  type: string | null;
  room: string | null;
};

export const columns: ColumnDef<ItemClassification>[] = [
  {
    accessorKey: "num",
    header: () => <div className="text-right font-bold">#</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">{row.getValue("num")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: () => <div className="font-bold">Name</div>,
    cell: ({ row, column, table }) => (
      <EditableCell
        variant={"input"}
        className="h-7 text-left font-medium overflow-hidden items-center  rounded-none  w-full
        hover:shadow-md hover:border-textColor-300 hover:border-[1.5px] 
        focus-visible:shadow-md focus-visible:ring-PRIMARY-500/70 focus-visible:ring-[1.5px] focus-visible:-ring-offset-1"
        getValue={() => row.getValue("room")}
        cellProps={{ row, column, table }}
      ></EditableCell>
    ),
  },
  {
    accessorKey: "type",
    header: () => <div className="font-bold">Type</div>,
    cell: ({ row, column, table }) => (
      <EditableCell
        variant={"autocomplete"}
        className="text-left font-medium overflow-hidden h-7 px-1.5 rounded-none text-textColor-500
        hover:shadow-md hover:border-textColor-300 hover:border-[1.5px] 
        focus-visible:shadow-md focus-visible:ring-PRIMARY-500/70 focus-visible:ring-[1.5px] focus-visible:-ring-offset-1"
        placeholder=""
        emptyMessageItemName={"type"}
        getValue={() => row.getValue("type")}
        cellProps={{ row, column, table }}
      />
    ),
  },
  {
    accessorKey: "room",
    header: () => <div className="text-left font-bold">Room</div>,
    size: 20,
    cell: ({ row, column, table }) => (
      <EditableCell
        variant={"autocomplete"}
        className="text-left font-medium overflow-hidden h-7 px-1.5 rounded-none text-textColor-500
      hover:shadow-md hover:border-textColor-300 hover:border-[1.5px] 
      focus-visible:shadow-md focus-visible:ring-PRIMARY-500/70 focus-visible:ring-[1.5px] focus-visible:-ring-offset-1"
        placeholder=""
        emptyMessageItemName={"room"}
        getValue={() => row.getValue("room")}
        cellProps={{ row, column, table }}
      />
    ),
  },
  {
    id: "delete",
    cell: ({ row }) => {
      const { itemClassifications, setItemClassifications } =
        useItemClassifications();
      function handleDeleteItemClassification(num: number) {
        if (itemClassifications.length === 1) return;
        console.log(
          "num",
          num,
          "type",
          row.getValue("type"),
          "room",
          row.getValue("room")
        );

        const newItemClassifications = itemClassifications.filter(
          (itemClassification) => num !== itemClassification["num"]
        );
        const updatedNumItemClassifications = newItemClassifications.map(
          (itemClassification, index) => {
            return { ...itemClassification, num: index + 1 };
          }
        );
        setItemClassifications(updatedNumItemClassifications);
      }
      return (
        <div
          onClick={() => handleDeleteItemClassification(row.getValue("num"))}
          className="text-center h-5"
        >
          <Button className="h-5 text-textColor-300 hover:text-textColor-500 hover:duration-300">
            <RiDeleteBin4Line className="h-5 w-5" />
          </Button>
        </div>
      );
    },
  },
];
