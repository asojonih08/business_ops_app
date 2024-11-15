"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { FiSend } from "react-icons/fi";
import { useRouter, usePathname } from "next/navigation";

interface SaveSendProposalDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export default function SaveSendProposalDialog({
  isOpen,
  setIsOpen,
}: SaveSendProposalDialogProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="h-36">
        <DialogHeader>
          <DialogTitle className="font-medium text-base">
            All proposal items have been marked{" "}
            <span className="font-bold">completed</span>
          </DialogTitle>
          <DialogDescription>
            Would you like to save or send the proposal now?
          </DialogDescription>
        </DialogHeader>
        <div className="w-full flex justify-end items-center gap-3.5">
          <Button
            onClick={() => router.push("/proposals")}
            className="h-8 bg-white border-[1.8px] border-textColor-300/50 shadow-sm rounded-lg w-[80px] text-[11px] 2xl:text-base text-textColor-600 font-medium tracking-wide duration-150
          hover:border-ACCENT-600/60 hover:text-textColor-900"
          >
            <span className="flex items-center gap-1 2xl:gap-1.5">
              <span>Save</span>
            </span>
          </Button>
          <Button
            onClick={() => router.push(`${pathname}/send`)}
            className="h-8 bg-white border-[1px] border-textColor-300/10 shadow-sm rounded-lg w-[80px] text-[11px] 2xl:text-base text-textColor-600 font-medium tracking-wide duration-150
          hover:border-ACCENT-600/60 hover:text-textColor-900 from-ACCENT-100 to-ACCENT-400/65 bg-gradient-to-r"
          >
            <span className="flex items-center gap-1 2xl:gap-1.5">
              <FiSend />
              <span>Send</span>
            </span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
