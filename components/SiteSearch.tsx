import React from "react";

import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";

const ICON_SIZE_XL = 19;
const ICON_SIZE = 14;

export default function SiteSearch() {
  return (
    <div>
      <IoSearch
        className={`text-[${ICON_SIZE}px] xl:text-[${ICON_SIZE_XL}px] absolute my-2.5 xl:mt-2 ml-2 text-textColor-400`}
      />
      <Input
        className="h-8 text-sm xl:text-[15px] xl:h-9 bg-[#EAEDF1] placeholder:text-textColor-600/40 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-[#C4BEEE] focus:border-textColor-base/15 focus:duration-100 pl-8"
        placeholder="Search"
      />
    </div>
  );
}
