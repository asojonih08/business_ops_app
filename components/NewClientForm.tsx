import React, { ChangeEvent, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { ToggleGroupItem, ToggleGroup } from "./ui/toggle-group";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import insertClient from "@/actions/insertClient";

export default function NewClientForm() {
  const [addPrimaryContactDetails, setAddPrimaryContactDetails] =
    useState(false);
  const [formData, setFormData] = useState({
    clientType: "Company",
    companyName: "",
    primaryContactName: "",
    primaryContactPosition: "",
    phoneNumber: "",
    emailAddress: "",
    referralSource: "",
  });

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData();

    data.append("clientType", formData.clientType);
    data.append("companyName", formData.companyName);
    data.append("primaryContactName", formData.primaryContactName);
    data.append("primaryContactPosition", formData.primaryContactPosition);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("emailAddress", formData.emailAddress);
    data.append("referralSource", formData.referralSource);

    insertClient(data);
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
      <Label className="font-semibold text-ACCENT-800">Client Type</Label>
      <ToggleGroup
        className="bg-[#F4F4F5] text-textColor-base h-8 w-fit rounded-sm grid grid-cols-2 gap-0 py-0 items-center px-1"
        value={formData.clientType}
        onValueChange={(value: string) => {
          if (value) setFormData({ ...formData, clientType: value });
        }}
        type="single"
      >
        <ToggleGroupItem
          className={`mx-0 hover:bg-none bg-[#F4F4F5] data-[state=on]:bg-white hover:text-textColor-base h-6 w-28 rounded-sm`}
          value="Company"
        >
          Company
        </ToggleGroupItem>
        <ToggleGroupItem
          className="mx-0 hover:bg-none bg-[#F4F4F5] data-[state=on]:bg-white hover:text-textColor-base h-6 w-28 rounded-sm"
          value="Individual"
        >
          Individual
        </ToggleGroupItem>
      </ToggleGroup>
      <Label className="font-semibold text-ACCENT-800">
        {formData.clientType === "Company" ? "Company" : "Client"} Name
      </Label>
      <Input
        type="text"
        className="h-8"
        name={
          formData.clientType === "Company"
            ? "companyName"
            : "primaryContactName"
        }
        value={
          formData.clientType === "Company"
            ? formData.companyName
            : formData.primaryContactName
        }
        onChange={
          formData.clientType === "Company"
            ? (e: ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, companyName: e.target.value })
            : (e: ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, primaryContactName: e.target.value })
        }
      ></Input>
      {formData.clientType === "Company" && (
        <div className="items-top flex space-x-2">
          <Checkbox
            checked={addPrimaryContactDetails}
            onCheckedChange={() =>
              setAddPrimaryContactDetails(
                (addPrimaryContactDetails) => !addPrimaryContactDetails
              )
            }
            id="terms1"
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Add primary contact details
            </label>
            <p className="text-sm text-muted-foreground">
              Would you like to add a primary contact?
            </p>
          </div>
        </div>
      )}
      {formData.clientType === "Company" && addPrimaryContactDetails && (
        <>
          <Label className="font-semibold text-ACCENT-800">
            Primary Contact Name
          </Label>
          <Input
            className="h-8"
            value={formData.primaryContactName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, primaryContactName: e.target.value })
            }
          ></Input>
          <Label className="font-semibold text-ACCENT-800">
            Primary Contact Position
          </Label>
          <Input
            className="h-8"
            value={formData.primaryContactPosition}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFormData({
                ...formData,
                primaryContactPosition: e.target.value,
              })
            }
          ></Input>
        </>
      )}
      <Label className="font-semibold text-ACCENT-800">Phone Number</Label>
      <Input
        className="h-8"
        value={formData.phoneNumber}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFormData({ ...formData, phoneNumber: e.target.value })
        }
      ></Input>
      <Label className="font-semibold text-ACCENT-800">Email Address</Label>
      <Input
        type="email"
        className="h-8"
        value={formData.emailAddress}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFormData({ ...formData, emailAddress: e.target.value })
        }
      ></Input>
      <Label className="font-semibold text-ACCENT-800">Referral Source</Label>
      <Input
        type="text"
        className="h-8"
        value={formData.referralSource}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFormData({ ...formData, referralSource: e.target.value })
        }
      ></Input>
      <span className="flex justify-end">
        <Button className="rounded-sm bg-PRIMARY-600/20 hover:bg-PRIMARY-600/30 duration-200 text-textColor-800 font-bold shadow-sm p-3 h-9">
          Add Client
        </Button>
      </span>
    </form>
  );
}
