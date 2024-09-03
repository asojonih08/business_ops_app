import React from "react";

import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";

const ICON_SIZE_3XL = 19;
const ICON_SIZE = 14;

export default function SiteSearch() {
  return (
    <div>
      <IoSearch style={{fontSize: ICON_SIZE}} className={`3xl:text-[${ICON_SIZE_3XL}px] absolute my-2.5 ml-2 text-textColor-400`} />
      <Input
        className="h-8 text-sm 3xl:text-[19px] 3xl:h-11 bg-[#EAEDF1] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-[#C4BEEE] focus:border-textColor-base/15 focus:duration-100 pl-8"
        placeholder="Search"
      />
    </div>
  );
}
