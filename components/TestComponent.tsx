"use client";
import React, { useState } from "react";
import { AutoComplete } from "./ui/autocomplete";

export default function TestComponent() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");

  const cars = [
    {
      value: "Toyota",
      label: "Toyota",
    },
    {
      value: "Nissan",
      label: "Nissan",
    },
    {
      value: "Ford",
      label: "Ford",
    },
    {
      value: "Dodge",
      label: "Dodge",
    },
    {
      value: "Chevrolet",
      label: "Chevrolet",
    },
  ];
  return (
    <AutoComplete
      selectedValue={selectedValue}
      onSelectedValueChange={setSelectedValue}
      searchValue={searchValue}
      onSearchValueChange={setSearchValue}
      items={cars}
      emptyMessage="No pokemon found."
    />
  );
}
