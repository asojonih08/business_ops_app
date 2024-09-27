"use client";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
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
import insertProject from "@/actions/insertProject";
import { Client } from "@/types";
import { ClientCard } from "./ClientCard";

import placeholder_avatar1 from "@/public/placeholder_avatar.png";
import placeholder_avatar2 from "@/public/placeholder_avatar_man1.png";
import placeholder_avatar3 from "@/public/placeholder_avatar_woman2.png";
import placeholder_avatar4 from "@/public/placeholder_avatar_man2.png";

/*
TODO:
    Client Name controlled by selection in Choose Client
    Additional Contacts
*/

interface NewProjectFormProps {
  selectedClient: Client | null;
  refreshProjects: () => void;
  setOpenProjectForm: Dispatch<SetStateAction<boolean>>;
}

export default function NewProjectForm({
  selectedClient,
  refreshProjects,
  setOpenProjectForm,
}: NewProjectFormProps) {
  const [stateSearchValue, setStateSearchValue] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [makeAddressProjectName, setMakeAddressProjectName] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    streetAddress: "",
    aptSuiteNo: "",
    state: "",
    zipPostalCode: "",
  });

  useEffect(() => {
    if (makeAddressProjectName)
      setFormData({ ...formData, name: formData.streetAddress });
    else setFormData({ ...formData, name: "" });
  }, [makeAddressProjectName]);

  useEffect(() => {
    setFormData({ ...formData, state: stateValue });
  }, [stateValue]);

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData();

    data.append("name", formData.name);
    data.append("streetAddress", formData.streetAddress);
    data.append("aptSuiteNo", formData.aptSuiteNo);
    data.append("state", formData.state);
    data.append("zipPostalCode", formData.zipPostalCode);
    data.append("clientId", selectedClient?.id ?? "");

    insertProject(data);
    setOpenProjectForm(false);
    refreshProjects();
  }

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
      <Label className="font-semibold text-ACCENT-800 text-lg">Client</Label>
      <div className="w-full border-2 border-PRIMARY-500/50 py-2.5 px-3.5 rounded-md">
        <ClientCard
          avatarimg={placeholder_avatar3}
          title={
            selectedClient?.client_type === "Company"
              ? selectedClient.company_name
              : selectedClient?.primary_contact_name
          }
          subtitle={selectedClient?.email_address}
        />
      </div>
      <Label className="font-semibold text-ACCENT-800 text-lg">Address</Label>
      <Label className="font-semibold text-ACCENT-800">Street Address</Label>
      <Input
        className="h-8"
        placeholder="Street Address"
        value={formData.streetAddress}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFormData({ ...formData, streetAddress: e.target.value })
        }
      ></Input>
      <Label className="font-semibold text-ACCENT-800">
        Apartment / Suite Number
      </Label>
      <Input
        className="h-8"
        placeholder="Apt / Suite No."
        value={formData.aptSuiteNo}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFormData({ ...formData, aptSuiteNo: e.target.value })
        }
      ></Input>
      <Label className="font-semibold text-ACCENT-800">State</Label>
      <AutoComplete
        searchValue={stateSearchValue}
        onSearchValueChange={setStateSearchValue}
        selectedValue={formData.state}
        onSelectedValueChange={setStateValue}
        items={[{ value: "CA", label: "CA" }]}
        placeholder="State"
      />
      <Label className="font-semibold text-ACCENT-800">Zip / Postal Code</Label>
      <Input
        className="h-8"
        placeholder="Zip / Postal Code"
        value={formData.zipPostalCode}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFormData({ ...formData, zipPostalCode: e.target.value })
        }
      ></Input>

      <div className="items-top flex space-x-2 my-2.5">
        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <TooltipTrigger type="button">
              <Checkbox
                type="button"
                className="disabled:border-textColor-700/50"
                disabled={!formData.streetAddress}
                onClick={(e) => e.stopPropagation()}
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
        value={formData.name}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFormData({ ...formData, name: e.target.value })
        }
      ></Input>
      <Label className="font-semibold text-ACCENT-800">
        Additional Contacts
      </Label>
      <span className="flex justify-end">
        <Button
          type="submit"
          className="rounded-sm bg-PRIMARY-600/20 hover:bg-PRIMARY-600/30 duration-200 text-textColor-800 font-bold shadow-sm p-3 h-9"
        >
          Add Project
        </Button>
      </span>
    </form>
  );
}
