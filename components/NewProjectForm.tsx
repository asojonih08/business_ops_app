"use client";
import React, {
  ChangeEvent,
  FormEventHandler,
  ReactEventHandler,
  useEffect,
  useState,
} from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AutoComplete } from "./ui/autocomplete";
import { Checkbox } from "./ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function NewProjectForm() {
  const [streetAddress, setStreetAddress] = useState("");
  const [aptSuiteNo, setAptSuiteNo] = useState("");
  const [stateSearchValue, setStateSearchValue] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [zipPostalCode, setZipPostalCode] = useState("");
  const [makeAddressProjectName, setMakeAddressProjectName] = useState(false);
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    if (makeAddressProjectName) setProjectName(streetAddress);
    else setProjectName("");
  }, [makeAddressProjectName]);
  return (
    <div className="flex flex-col gap-4">
      <Label className="font-semibold text-ACCENT-800 text-lg">Address</Label>
      <Label className="font-semibold text-ACCENT-800">Street Address</Label>
      <Input
        className="h-8"
        placeholder="Street Address"
        value={streetAddress}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setStreetAddress(e.target.value)
        }
      ></Input>
      <Label className="font-semibold text-ACCENT-800">
        Apartment / Suite Number
      </Label>
      <Input className="h-8" placeholder="Apt / Suite No."></Input>
      <Label className="font-semibold text-ACCENT-800">State</Label>
      <AutoComplete
        searchValue={stateSearchValue}
        onSearchValueChange={setStateSearchValue}
        selectedValue={stateValue}
        onSelectedValueChange={setStateValue}
        items={[{ value: "CA", label: "CA" }]}
        placeholder="State"
      />
      <Label className="font-semibold text-ACCENT-800">Zip / Postal Code</Label>
      <Input className="h-8" placeholder="Zip / Postal Code"></Input>

      <div className="items-top flex space-x-2 my-2.5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Checkbox
                disabled={!streetAddress}
                checked={makeAddressProjectName}
                onCheckedChange={() =>
                  setMakeAddressProjectName(
                    (makeAddressProjectName) => !makeAddressProjectName
                  )
                }
                id="terms1"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Street address is required</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Make the street address the project name
          </label>
          <p className="text-sm text-muted-foreground">
            Would you like to use the project street address in place of the
            project name?
          </p>
        </div>
      </div>

      <Label className="font-semibold text-ACCENT-800">Project Name</Label>

      <Input
        className="h-8"
        placeholder="Project Name"
        disabled={makeAddressProjectName}
        value={projectName}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setProjectName(e.target.value)
        }
      ></Input>
      <span className="flex justify-end">
        <Button className="rounded-sm bg-PRIMARY-600/20 hover:bg-PRIMARY-600/30 duration-200 text-textColor-800 font-bold shadow-sm p-3 h-9">
          Add Project
        </Button>
      </span>
    </div>
  );
}
