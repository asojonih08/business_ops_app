import Link from "next/link";
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
import ClientSelect from "@/components/ClientSelect";
import ProjectSelect from "@/components/ProjectSelect";
import ItemsInput from "@/components/ItemsInput";
import { Button } from "@/components/ui/button";
import { FaLongArrowAltRight } from "react-icons/fa";
import { BsArrowRightSquareFill } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";

export default function page() {
  return (
    <div className="w-full h-full bg-white p-6 rounded-2xl flex flex-col gap-10 items-center justify-center">
      {/* <Link href={"/proposals/create-proposal/project1"}>Test</Link> */}
      <div className="flex w-full justify-center gap-[8%]">
        <div className="h-96 flex flex-col gap-4">
          <span className="font-semibold text-accent-800 text-xl">
            Choose Client
          </span>
          <ClientSelect />
        </div>
        <div className="flex flex-col gap-4 w-[680px] ">
          <span className="font-semibold text-accent-800 text-xl">
            Choose Project
          </span>
          <div className="px-10 h-96 from-[#f7f9f9] to-accent-base/40 bg-gradient-to-tr rounded-xl drop-shadow-md overflow-y-scroll">
            <ProjectSelect />
          </div>
        </div>
      </div>
      <div></div>
      <div className="flex w-full h-1/3 px-32">
        <ItemsInput />
      </div>
      <div className="w-full px-36 flex justify-center">
        <Button
          className="from-accent-100 to-accent-base/40 bg-gradient-to-r font-semibold text-accent-950 text-lg w-1/3 drop-shadow-md duration-500 px-0 py-0
                hover:bg-primary-300/70
        "
        >
          <Link
            className="flex items-center gap-1.5 w-full h-full justify-center rounded-md border-none"
            href={"/proposals/create-proposal"}
          >
            Next <FaArrowRightLong />
          </Link>
        </Button>
      </div>
    </div>
  );
}
