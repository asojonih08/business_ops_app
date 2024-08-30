import React from "react";

import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";

export default function SiteSearch() {
  return (
    <div>
      <IoSearch className="absolute my-2.5 ml-2 text-textColor-400" size={19} />
      <Input
        className="bg-gray-200 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-[#C4BEEE] focus:border-textColor-base/15 focus:duration-100 pl-8"
        placeholder="Search"
      />
    </div>
  );
}
