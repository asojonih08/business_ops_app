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
  const { materials, setMaterials } = useMaterials();
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
    console.log(
      "type",
      row.getValue("type"),
      "description",
      row.getValue("description")
    );
    table.options.meta?.updateData(row.index, column.id, value);
    console.log(value);

    const isType = column.id === "type";
    if (
      isType &&
      row.getValue("quantity") === null &&
      row.getValue("rate") === null
    ) {
      console.log(
        "type",
        value,
        "quantity",
        row.getValue("quantity"),
        "rate",
        row.getValue("rate")
      );

      setMaterials((oldMaterials) =>
        oldMaterials.map((material, index) =>
          row.index === index
            ? {
                ...material,
                type: value,
                quantity: "1",
                rate: "0",
                amount: "0.00",
              }
            : material
        )
      );
    }

    const isRate = column.id === "rate";
    const isQuantity = column.id === "quantity";

    if (isQuantity || isRate) {
      const quantity = isQuantity
        ? Number(value === "" ? 0 : value)
        : row.getValue("quantity");

      const rate = isRate
        ? Number(value === "" ? 0 : value)
        : row.getValue("rate");

      if (quantity !== null && rate !== null)
        setMaterials((oldMaterials) =>
          oldMaterials.map((material, index) =>
            row.index === index
              ? {
                  ...material,
                  quantity: quantity === 0 ? "0" : quantity,
                  rate: rate === 0 ? "0.00" : rate,
                  amount: (
                    (isQuantity
                      ? Number(value)
                      : Number(row.getValue("quantity"))) *
                    (isRate ? Number(value) : Number(row.getValue("rate")))
                  ).toFixed(2),
                }
              : material
          )
        );
    }
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
          items={types}
          emptyMessage={`No ${emptyMessageItemName} found.`}
          shouldFilter
          className={className}
          placeholder={placeholder}
          onBlur={onBlur}
        />
      );
  }
}

export type Material = {
  num: number | null;
  type: string | null;
  description: string | null;
  quantity: string | null;
  rate: string | null;
  amount: string | null;
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
    accessorKey: "description",
    header: () => <div className="font-bold">Description</div>,
    cell: ({ row, column, table }) => (
      <EditableCell
        variant={"autocomplete"}
        className="text-left font-medium overflow-hidden h-7 px-1.5 rounded-none text-textColor-500
        hover:shadow-md hover:border-textColor-300 hover:border-[1.5px] 
        focus-visible:shadow-md focus-visible:ring-PRIMARY-500/70 focus-visible:ring-[1.5px] focus-visible:-ring-offset-1"
        placeholder=""
        emptyMessageItemName={"description"}
        getValue={() => row.getValue("description")}
        cellProps={{ row, column, table }}
      />
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
    accessorKey: "quantity",
    header: () => <div className="text-right font-bold">Quantity</div>,
    cell: ({ row, column, table }) => (
      <EditableCell
        className="text-right font-medium overflow-hidden h-7 px-1.5 rounded-none
        hover:shadow-md  hover:border-textColor-300 hover:border-[1.5px] 
        focus-visible:shadow-md focus-visible:ring-primary-500/70 focus-visible:ring-[1.5px] focus-visible:-ring-offset-1"
        variant="input"
        getValue={() => row.getValue("quantity")}
        cellProps={{ row, column, table }}
      />
    ),
  },
  {
    accessorKey: "rate",
    header: () => <div className="text-right font-bold">Rate</div>,
    cell: ({ row, column, table }) => {
      return (
        <EditableCell
          className="text-right font-medium overflow-hidden h-7 px-1.5 rounded-none
          hover:shadow-md hover:border-textColor-300 hover:border-[1.5px] 
          focus-visible:shadow-md focus-visible:ring-primary-500/70 focus-visible:ring-[1.5px] focus-visible:-ring-offset-1"
          variant="input"
          getValue={() => row.getValue("rate")}
          cellProps={{ row, column, table }}
        />
      );
    },
  },
  {
    accessorKey: "amount",

    header: () => <div className="text-right font-bold">Amount</div>,
    cell: ({ row, column, table }) => {
      return (
        <EditableCell
          className="disabled:cursor-default disabled:opacity-100 text-right font-medium overflow-hidden h-7 px-1.5 rounded-none
        
          focus-visible:shadow-md focus-visible:ring-primary-500/70 focus-visible:ring-[1.5px] focus-visible:-ring-offset-1"
          disabled
          variant="input"
          getValue={() => row.getValue("amount")}
          cellProps={{ row, column, table }}
        />
      );
    },
  },

  {
    id: "delete",
    cell: ({ row }) => {
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
        <div
          onClick={() => handleDeleteMaterial(row.getValue("num"))}
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
