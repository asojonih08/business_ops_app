import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import placeholder_avatar from "@/public/placeholder_avatar.png";

interface UserAvatarCardProps {
  showNameEmail: boolean;
}

export default function UserAvatarCard({
  showNameEmail = true,
}: UserAvatarCardProps) {
  return (
    <div className="flex gap-2 items-center">
      <Avatar className="h-10 w-10 xl:h-11 xl:w-11">
        <AvatarImage src={placeholder_avatar.src} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      {showNameEmail && (
        <div className="flex flex-col py-2">
          <span className="text-xs xl:text-[16px] text-textColor-base font-semibold">
            Jennifer Clomin
          </span>
          <span className="text-[9px] xl:text-[10px] text-textColor-400">
            jennifer.clom@gmail.com
          </span>
        </div>
      )}
    </div>
  );
}
