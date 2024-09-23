"use client";
import React, { Dispatch, SetStateAction, useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import placeholder_avatar1 from "@/public/placeholder_avatar.png";
import placeholder_avatar2 from "@/public/placeholder_avatar_man1.png";
import placeholder_avatar3 from "@/public/placeholder_avatar_woman2.png";
import placeholder_avatar4 from "@/public/placeholder_avatar_man2.png";
import { Button } from "./ui/button";
import { Client } from "@/types";

const placeholder_avatars = [
  placeholder_avatar1,
  placeholder_avatar2,
  placeholder_avatar3,
  placeholder_avatar4,
];

function ClientCard({ avatarimg, title, subtitle }: any) {
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
            {title}
          </span>
          <span className="text-[9px] 2xl:text-[12px] text-textColor-400">
            {subtitle}
          </span>
        </div>
      )}
    </div>
  );
}

interface ClientSelectProps {
  selectedKey: number;
  setSelectedKey: Dispatch<SetStateAction<number>>;
  searchClients: Client[];
  setSearchClients: Dispatch<SetStateAction<Client[]>>;
}

export default function ClientSelect({
  selectedKey,
  setSelectedKey,
  searchClients,
  setSearchClients,
}: ClientSelectProps) {
  return (
    <Command className="rounded-lg border shadow-md md:min-w-[300px] h-full overflow-visible">
      <CommandInput
        className="text-ACCENT-600 placeholder:text-ACCENT-500 font-medium text-xs 2xl:text-[16px]"
        placeholder="Search for a client..."
      />
      <CommandList className="max-h-96">
        <CommandEmpty className="font-medium text-xs 2xl:text-[16px] p-4 text-ACCENT-800">
          No results found.
        </CommandEmpty>

        {searchClients.map((client, index) => (
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
                console.log(index);
                setSelectedKey(index);
              }}
              className="w-full h-full justify-start"
            >
              <ClientCard
                avatarimg={placeholder_avatars[index]}
                title={
                  client.client_type === "company"
                    ? client.company_name
                    : client.primary_contact_name
                }
                subtitle={
                  client.client_type === "company" &&
                  client.primary_contact_name
                    ? client.primary_contact_name
                    : client.email_address
                }
              />
            </Button>
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  );
}
