"use client";
import React, { useEffect, useRef, useState } from "react";
import { Label } from "./ui/label";
import { FancyMultiSelect } from "./ui/fancy-multi-select";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { FaRegEdit } from "react-icons/fa";

export default function EmailDetails() {
  const [editSubject, setEditSubject] = useState(false);
  const subjectInputRef = useRef<HTMLInputElement>(null);
  const [editMessage, setEditMessage] = useState(false);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  // const CCOrBCCInputRef = useRef<any>(null);

  const [sendCC, setSendCC] = useState<boolean>(false);
  const [sendBCC, setSendBCC] = useState<boolean>(false);

  function handleEditSubjectClick() {
    setEditSubject((editSubject) => !editSubject);
  }
  function handleEditMessageClick() {
    setEditMessage((editMessage) => !editMessage);
  }

  useEffect(() => subjectInputRef.current?.focus(), [editSubject]);
  useEffect(() => messageInputRef.current?.focus(), [editMessage]);
  // useEffect(() => CCOrBCCInputRef.current?.focus(), [CCOrBCC]);
  return (
    <div className="flex flex-col gap-2.5 2xl:gap-3">
      <Label className="text-[14.5px] 2xl:text-lg text-textColor-700 font-semibold">
        To
      </Label>
      <span className="flex gap-1.5 justify-center items-center text-center font-medium">
        <FancyMultiSelect />
        <ToggleGroup
          onValueChange={(value: string[]) => {
            if (value.find((element) => element === "CC")) setSendCC(true);
            else setSendCC(false);
            if (value.find((element) => element === "BCC")) setSendBCC(true);
            else setSendBCC(false);
          }}
          type="multiple"
        >
          <ToggleGroupItem value="CC">CC</ToggleGroupItem>
          <ToggleGroupItem value="BCC">BCC</ToggleGroupItem>
        </ToggleGroup>
      </span>
      {sendCC && (
        <>
          <Label className="text-[14.5px] 2xl:text-lg text-textColor-700 font-semibold">
            CC
          </Label>
          <FancyMultiSelect />
        </>
      )}
      {sendBCC && (
        <>
          <Label className="text-[14.5px] 2xl:text-lg text-textColor-700 font-semibold">
            BCC
          </Label>
          <FancyMultiSelect />
        </>
      )}
      <Label className="text-[14.5px] 2xl:text-lg text-textColor-700 font-semibold">
        Subject
      </Label>
      {editSubject ? (
        <Input className="h-9" ref={subjectInputRef} />
      ) : (
        <span className="h-9 border rounded-sm border-textColor-200 flex justify-between items-center pl-4">
          <p className="text-textColor-500 font-medium">
            Proposal - 1234 Redwood Street
          </p>
          <Button className="px-2.5" onClick={handleEditSubjectClick}>
            <FaRegEdit
              className="h-[14px] w-[14.5px] 2xl:h-[19px] 2xl:w-[19.5px] text-textColor-500 duration-200
                        hover:text-textColor-base"
            />
          </Button>
        </span>
      )}
      <Label className="text-[14.5px] 2xl:text-lg text-textColor-700 font-semibold">
        Message
      </Label>
      {editMessage ? (
        <Textarea
          ref={messageInputRef}
          className="h-[180px] max-h-[200px] 2xl:h-[200px] 2xl:max-h-[240px]"
        />
      ) : (
        <span className="h-[180px] border rounded-sm border-textColor-200 p-4 relative">
          <span className="flex justify-between items-center"></span>
          <p className="text-textColor-500 font-medium">
            Hello, <br></br>attached is the proposal for 1234 Redwood Street.
            Please get back to us with any questions or concerns.
          </p>
          <Button onClick={handleEditMessageClick}>
            <FaRegEdit
              className="absolute top-3 right-3 h-[14px] w-[14.5px] 2xl:h-[19px] 2xl:w-[19.5px] text-textColor-500 duration-200
                        hover:text-textColor-base"
            />
          </Button>
        </span>
      )}
      <Label className="text-[14.5px] 2xl:text-lg text-textColor-700 font-semibold">
        Attachments
      </Label>
      <Input className="w-[50%] 2xl:w-[40%]" type="file" />
    </div>
  );
}
