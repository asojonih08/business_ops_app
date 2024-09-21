"use client";
import React, { useState } from "react";

import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import placeholder_avatar1 from "@/public/placeholder_avatar.png";
import placeholder_avatar2 from "@/public/placeholder_avatar_man1.png";
import placeholder_avatar3 from "@/public/placeholder_avatar_woman2.png";
import placeholder_avatar4 from "@/public/placeholder_avatar_man2.png";
import { Button } from "./ui/button";
import { FaPlus } from "react-icons/fa";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

const placeholder_avatars = [
  placeholder_avatar1,
  placeholder_avatar2,
  placeholder_avatar3,
  placeholder_avatar4,
];

function ClientCard({ avatarimg, name, company = "", email = "" }: any) {
  return (
    <div className="flex gap-2 items-center">
      <Avatar className="h-10 w-10 2xl:h-13 2xl:w-13">
        <AvatarImage src={avatarimg.src} />
        <AvatarFallback className="h-10 w-10 2xl:h-13 2xl:w-13">
          <p>CN</p>
        </AvatarFallback>
      </Avatar>
      {true && (
        <div className="flex flex-col py-2 items-start">
          <span className="text-xs 2xl:text-[18px] text-textColor-base font-semibold">
            {name}
          </span>
          <span className="text-[9px] 2xl:text-[12px] text-textColor-400">
            {company.length > 0 ? company : email}
          </span>
        </div>
      )}
    </div>
  );
}

export default function ClientSelect() {
  const [selectedKey, setSelectedKey] = useState(-1);
  function handleSelectClient(index: number) {
    console.log(index);
    setSelectedKey(index);
  }
  return (
    <>
    <Command className="rounded-lg border shadow-md md:min-w-[300px] h-[82%] overflow-visible">
      <CommandInput
        className="text-ACCENT-600 placeholder:text-ACCENT-500 font-medium text-xs 2xl:text-[16px]"
        placeholder="Search for a client..."
      />
      <CommandList className="max-h-96">
        <CommandEmpty className="font-medium text-xs 2xl:text-[16px] p-4 text-ACCENT-800">
          No results found.
        </CommandEmpty>

        {[0, 1, 2, 3].map((value, index) => (
          <CommandItem
            key={index}
            className={`${
              selectedKey === index
                ? "border-[2px] border-PRIMARY-500/50"
                : "border-transparent hover:bg-[#F8F9FA]"
            }  hover:border-PRIMARY-500/50 my-1 mx-1.5 rounded-xl border-[2px] h-16 2xl:h-20 p-0`}
          >
            <Button
              onClick={() => {
                console.log(value);
                setSelectedKey(value);
              }}
              className="w-full h-full justify-start"
            >
              <ClientCard
                avatarimg={placeholder_avatars[index]}
                name={"Jennifer Clomin"}
                company={"Design Co."}
              />
            </Button>
          </CommandItem>
        ))}
      </CommandList>
    </Command>
    
    <Sheet>
  <SheetTrigger asChild><Button className="w-full h-8 bg-PRIMARY-600/20 hover:bg-PRIMARY-600/30 duration-200"><FaPlus className="h-4 w-4 text-textColor-800/80" /></Button></SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>New Client</SheetTitle>
      <SheetDescription>
      </SheetDescription>
    </SheetHeader>
    <Label className="font-semibold text-ACCENT-800">Client Type</Label>
    <ToggleGroup
    className="bg-textColor-800/40 py-2 text-textColor-base"
          onValueChange={(value: string) => {
            // if (value.find((element) => element === "CC")) setSendCC(true);
            // else setSendCC(false);
            // if (value.find((element) => element === "BCC")) setSendBCC(true);
            // else setSendBCC(false);
          }}
          type="single"
        >
          <ToggleGroupItem className="mx-0 hover:bg-800/40 hover:text-textColor-base" value="Company">Company</ToggleGroupItem>
          <ToggleGroupItem className="mx-0" value="Individual">Individual</ToggleGroupItem>
        </ToggleGroup>
    <Label className="font-semibold text-ACCENT-800">Client Name</Label>
    <Input className="h-8"></Input>
  </SheetContent>
</Sheet>

    
    </>
  );
}
