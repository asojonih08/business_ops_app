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
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { AutoComplete } from "@/components/ui/autocomplete";
import { useItemClassifications } from "@/components/ItemClassificationsContext";
import { MILLWORK_TYPES, ROOMS_AREAS } from "@/constants";

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
  items?: any;
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
  items,
}: EditableCellProps) {
  const initialValue = !getValue() ? "" : getValue();
  const { row, column, table } = cellProps;
  const [value, setValue] = useState(!initialValue ? "" : initialValue);
  const [searchValue, setSearchValue] = useState<string>("");

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
          searchValue={value}
          onSearchValueChange={setValue}
          items={items}
          emptyMessage={`No ${emptyMessageItemName} found.`}
          shouldFilter
          className={className}
          placeholder={placeholder}
          onBlur={onBlur}
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
    header: () => <div className="text-right font-semibold">#</div>,
    cell: ({ row }) => (
      <div className="h-6 2xl:h-7 text-right font-medium">
        {row.getValue("num")}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: () => <div className="font-semibold">Name</div>,
    cell: ({ row, column, table }) => (
      <EditableCell
        variant={"input"}
        className="h-6 2xl:h-7 text-[12.5px] text-left font-medium overflow-hidden items-center  rounded-none  w-full
        hover:shadow-md hover:border-textColor-300 hover:border-[1.5px] 
        focus-visible:shadow-md focus-visible:ring-PRIMARY-500/70 focus-visible:ring-[1.5px] focus-visible:-ring-offset-1"
        getValue={() => row.getValue("name")}
        cellProps={{ row, column, table }}
      ></EditableCell>
    ),
  },
  {
    accessorKey: "type",
    header: () => <div className="font-semibold">Type</div>,
    cell: ({ row, column, table }) => (
      <EditableCell
        variant={"autocomplete"}
        className="h-6 2xl:h-7 text-[12.5px] text-left font-medium overflow-hidden px-1.5 rounded-none text-textColor-500
        hover:shadow-md hover:border-textColor-300 hover:border-[1.5px] 
        focus-visible:shadow-md focus-visible:ring-PRIMARY-500/70 focus-visible:ring-[1.5px] focus-visible:-ring-offset-1"
        placeholder=""
        emptyMessageItemName={"type"}
        getValue={() => row.getValue("type")}
        cellProps={{ row, column, table }}
        items={MILLWORK_TYPES}
      />
    ),
  },
  {
    accessorKey: "room",
    header: () => <div className="text-left font-semibold">Room</div>,
    size: 20,
    cell: ({ row, column, table }) => (
      <EditableCell
        variant={"autocomplete"}
        className="h-6 2xl:h-7 text-[12.5px] text-left font-medium overflow-hidden px-1.5 rounded-none text-textColor-500
        hover:shadow-md hover:border-textColor-300 hover:border-[1.5px] 
        focus-visible:shadow-md focus-visible:ring-PRIMARY-500/70 focus-visible:ring-[1.5px] focus-visible:-ring-offset-1"
        placeholder=""
        emptyMessageItemName={"room"}
        getValue={() => row.getValue("room")}
        cellProps={{ row, column, table }}
        items={ROOMS_AREAS}
      />
    ),
  },
  {
    id: "delete",
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { itemClassifications, setItemClassifications } =
        // eslint-disable-next-line react-hooks/rules-of-hooks
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
            <RiDeleteBin4Line className="h-[16px] w-[16px] 2xl:h-5 2xl:w-5" />
          </Button>
        </div>
      );
    },
  },
];
