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
      <Avatar className="h-10 w-10 3xl:h-12 3xl:w-12">
        <AvatarImage src={placeholder_avatar.src} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      {showNameEmail && (
        <div className="flex flex-col py-2">
          <span className="text-xs 3xl:text-[17px] text-textColor-base font-semibold">
            Jennifer Clomin
          </span>
          <span className="text-[9px] 3xl:text-xs text-textColor-400">
            jennifer.clom@gmail.com
          </span>
        </div>
      )}
    </div>
  );
}
