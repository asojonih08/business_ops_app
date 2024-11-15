"use client";

//https://medium.com/@vishnuksvichu12345/multiple-selection-input-field-with-search-functionality-using-shadcn-ui-c9944b5db647

import * as React from "react";
import { SquarePlus, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

export type Item = Record<"value" | "label", string>;

interface FancyMultiSelectProps {
  items: Item[];
  initialItems: Item[];
  placeholder: string;
  inputValidator?: (value: string) => boolean;
  setSelectedItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

export function FancyMultiSelect({
  items,
  initialItems,
  placeholder,
  inputValidator,
  setSelectedItems,
}: FancyMultiSelectProps) {
  // console.log("ITEMS: ", items);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Item[]>(initialItems);
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => setSelectedItems(selected), [selected]);

  const handleUnselect = React.useCallback((item: Item) => {
    setSelected((prev) => prev.filter((s) => s.value !== item.value));
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  const selectables = items.filter((item) => !selected.includes(item));

  function handleAddNewItem(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter") {
      setSelected((prev) => [
        ...prev,
        { value: inputValue, label: inputValue },
      ]);
    }
  }

  function handleAddItemClick() {
    if (inputValidator ? inputValidator(inputValue) : true) {
      setSelected((prev) => [
        ...prev,
        { value: inputValue, label: inputValue },
      ]);
      setInputValue("");
    } else console.log("EMAIL NOT IN CORRECT FORMAT");
  }

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((item) => {
            return (
              <Badge key={item.value} variant="secondary">
                {item.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(item);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(item)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList>
          {inputValue.length > 0 && (
            <CommandEmpty
              onKeyDown={handleAddNewItem}
              onClick={handleAddItemClick}
              className={`group absolute top-0 z-10 w-full h-10 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in hover:cursor-pointer flex items-center justify-center transition-colors duration-300 ${
                inputValidator
                  ? inputValidator(inputValue)
                    ? "bg-green-50"
                    : "bg-gray-100"
                  : "bg-green-50"
              }`}
            >
              <SquarePlus
                className={`h-6 w-6 group-hover:scale-110 transition-all duration-300 ${
                  inputValidator
                    ? inputValidator(inputValue)
                      ? "text-textColor-900 "
                      : "text-textColor-500"
                    : "text-textColor-900 "
                }`}
              />
            </CommandEmpty>
          )}

          {open && selectables.length > 0 ? (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-[280px] overflow-scroll">
                {selectables.map((item) => {
                  return (
                    <CommandItem
                      key={item.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={(value) => {
                        setInputValue("");
                        setSelected((prev) => [...prev, item]);
                      }}
                      className={"cursor-pointer"}
                    >
                      {item.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}
