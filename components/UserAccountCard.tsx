import React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { IoIosArrowDown } from "react-icons/io";
import UserAvatarCard from "./UserAvatarCard";
import UserAccountMenu from "./UserAccountMenu";

const ICON_SIZE = 14;
const ICON_SIZE_3XL = 19;

interface UserAccountCardProps {
  showNameEmailArrow: boolean;
}

export default function UserAccountCard({
  showNameEmailArrow = true,
}: UserAccountCardProps) {
  return (
    <div className="flex gap-2 items-center justify-between mx-3">
      {showNameEmailArrow && (
        <UserAvatarCard showNameEmail={showNameEmailArrow} />
      )}
      <Popover>
        <PopoverTrigger>
          {showNameEmailArrow ? (
            <IoIosArrowDown
            style={{fontSize: ICON_SIZE}}
              className={`3xl:text-[${ICON_SIZE_3XL}px] text-textColor-400 
            hover:duration-100 hover:cursor-pointer hover:bg-gray-100 hover:rounded-2xl hover:ring-[5px] hover:ring-textColor-100 hover:text-textColor-base`}
            />
          ) : (
            <UserAvatarCard showNameEmail={showNameEmailArrow} />
          )}
        </PopoverTrigger>
        <PopoverContent
          side="right"
          sideOffset={showNameEmailArrow ? 12 : -10}
          align={"start"}
          className="ml-12 mb-[13.5px] shadow-sm h-[410px] w-[17rem] 3xl:h-[452px] 3xl:w-[19rem] rounded-2xl"
        >
          <UserAccountMenu />
        </PopoverContent>
      </Popover>
    </div>
  );
}
