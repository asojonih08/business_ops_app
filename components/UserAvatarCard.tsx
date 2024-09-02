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
      <Avatar className="h-12 w-12">
        <AvatarImage src={placeholder_avatar.src} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      {showNameEmail && (
        <div className="flex flex-col py-2">
          <span className="text-[17px] text-textColor-base font-semibold">
            Jennifer Clomin
          </span>
          <span className="text-xs text-textColor-400">
            jennifer.clom@gmail.com
          </span>
        </div>
      )}
    </div>
  );
}
