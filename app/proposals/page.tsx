import Link from "next/link";
import React, { useState } from "react";

import ClientSelect from "@/components/ClientSelect";
import ProjectSelect from "@/components/ProjectSelect";
import ItemsInput from "@/components/ItemsInput";
import { Button } from "@/components/ui/button";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NewClientForm from "@/components/NewClientForm";
import NewProjectForm from "@/components/NewProjectForm";

export default function page() {
  return (
    <div className="w-full h-full bg-white px-12 py-12 2xl:px-0 2xl:py-0 p-6 rounded-2xl flex flex-col gap-8 items-center justify-center">
      {/* <Link href={"/proposals/create-proposal/project1"}>Test</Link> */}
      <div className="flex w-full justify-center gap-[8%]">
        <div className="h-64 2xl:h-96 flex flex-col gap-4">
          <span className="font-semibold text-ACCENT-800 text-[15px] 2xl:text-xl w-[300px] 2xl:w-[400px] flex justify-between">
            <p>Choose Client</p>
            <Sheet>
              <SheetTrigger asChild>
                <Button className="p-0 w-7 h-7 bg-PRIMARY-600/20 hover:bg-PRIMARY-600/30 duration-200">
                  <FaPlus className="h-3.5 w-3.5 text-textColor-800/80" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="mb-4">New Client</SheetTitle>
                  <SheetDescription></SheetDescription>
                </SheetHeader>
                <NewClientForm />
              </SheetContent>
            </Sheet>
          </span>
          <ClientSelect />
        </div>
        <div className="flex flex-col gap-4 w-[540px] 2xl:w-[680px] ">
          <span className="font-semibold text-ACCENT-800 text-[15px] 2xl:text-xl flex justify-between">
            <p>Choose Project</p>
            <Sheet>
              <SheetTrigger asChild>
                <Button className="w-7 h-7 p-0 bg-PRIMARY-600/20 hover:bg-PRIMARY-600/30 duration-200">
                  <FaPlus className="w-3.5 h-3.5 text-textColor-800/80" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="mb-4">New Project</SheetTitle>
                  <SheetDescription></SheetDescription>
                </SheetHeader>
                <NewProjectForm />
              </SheetContent>
            </Sheet>
          </span>
          <div className="px-10 h-64 2xl:h-96 from-[#f7f9f9] to-ACCENT-base/40 bg-gradient-to-tr rounded-xl drop-shadow-md overflow-y-scroll">
            <ProjectSelect />
          </div>
        </div>
      </div>
      <div className="flex w-full h-[40%] px-32">
        <ItemsInput />
      </div>
      <div className="w-full px-36 flex justify-center pt-4 2xl:pt-10">
        <Button
          className="bg-transparent from-ACCENT-100 to-ACCENT-base/40 bg-gradient-to-r font-semibold text-ACCENT-950 text-sm 2xl:text-lg w-[26%] 2xl:w-[28%] drop-shadow-md duration-500 px-0 py-0
                hover:bg-PRIMARY-300/70
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
