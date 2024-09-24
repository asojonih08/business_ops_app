
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
  const [clientType, setClientType] = useState("Company");
  const [companyName, setCompanyName] = useState("");
  const [primaryContactName, setPrimaryContactName] = useState("");
  const [primaryContactPosition, setPrimaryContactPosition] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [referralSource, setReferralSource] = useState("");
  
  function handleFormSubmit (e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

  return (
    <form 
      className="flex flex-col gap-4"
      action={insertClient({
        client_type: clientType,
      company_name: companyName,
      primary_contact_name: primaryContactName,
      primary_contact_postion: primaryContactPosition,
      phone_number: phoneNumber,
      email_address: emailAddress,
      referral_source: referralSource
      })}
      onSubmit={handleFormSubmit}
    >
      <Label className="font-semibold text-ACCENT-800">Client Type</Label>
      <ToggleGroup
        className="bg-[#F4F4F5] text-textColor-base h-8 w-fit rounded-sm grid grid-cols-2 gap-0 py-0 items-center px-1"
        value={clientType}
        onValueChange={(value: string) => {
          if (value) setClientType(value);
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
        {clientType === "Company" ? "Company" : "Client"} Name
      </Label>
      <Input 
        type="text"
        className="h-8"
        value={clientType === "Company" ? companyName : primaryContactName}
        onChange={clientType === "Company" ? (e:ChangeEvent<HTMLInputElement>)=> setCompanyName(e.target.value) : (e:ChangeEvent<HTMLInputElement>)=>setPrimaryContactName(e.target.value)}
        ></Input>
      {clientType === "Company" && (
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
      {clientType === "Company" && addPrimaryContactDetails && (
        <>
          <Label className="font-semibold text-ACCENT-800">
            Primary Contact Name
          </Label>
          <Input
            className="h-8"
            value={primaryContactName}
            onChange={(e:ChangeEvent<HTMLInputElement>)=> setPrimaryContactName(e.target.value)}
            ></Input>
          <Label className="font-semibold text-ACCENT-800">
            Primary Contact Position
          </Label>
          <Input
            className="h-8"
            value={primaryContactPosition}
            onChange={(e:ChangeEvent<HTMLInputElement>)=>setPrimaryContactPosition(e.target.value)}
            ></Input>
        </>
      )}
      <Label className="font-semibold text-ACCENT-800">Phone Number</Label>
      <Input 
        className="h-8"
        value={phoneNumber}
        onChange={(e:ChangeEvent<HTMLInputElement>)=>setPhoneNumber(e.target.value)}
        ></Input>
      <Label className="font-semibold text-ACCENT-800">Email Address</Label>
      <Input 
        type="email" 
        className="h-8"
        value={emailAddress}
        onChange={(e:ChangeEvent<HTMLInputElement>)=>setEmailAddress(e.target.value)}
        ></Input>
      <Label className="font-semibold text-ACCENT-800">Referral Source</Label>
      <Input 
        type="text" 
        className="h-8"
        value={referralSource}
        onChange={(e:ChangeEvent<HTMLInputElement>)=> setReferralSource(e.target.value)}
        ></Input>
      <span className="flex justify-end">
        <Button 
          type="submit"
          className="rounded-sm bg-PRIMARY-600/20 hover:bg-PRIMARY-600/30 duration-200 text-textColor-800 font-bold shadow-sm p-3 h-9">
          Add Client
        </Button>
      </span>

    </form>
  );
}
