import React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { IoIosArrowDown } from "react-icons/io";
import UserAvatarCard from "./UserAvatarCard";
import UserAccountMenu from "./UserAccountMenu";

export default function UserAccountCard() {
  return (
    <div className="flex gap-2 items-center mx-3">
      <UserAvatarCard />
      <Popover>
        <PopoverTrigger>
          <IoIosArrowDown
            size={20}
            className=" text-textColor-400 ml-6 
            hover:duration-100 hover:cursor-pointer hover:bg-gray-100 hover:rounded-2xl hover:ring-[5px] hover:ring-textColor-100 hover:text-textColor-base"
          />
        </PopoverTrigger>
        <PopoverContent
          side="right"
          sideOffset={12}
          align={"start"}
          alignOffset={10}
          className="ml-12 mb-2.5 shadow-sm h-[450px] w-[19rem] rounded-2xl"
        >
          <UserAccountMenu />
        </PopoverContent>
      </Popover>
    </div>
  );
}
