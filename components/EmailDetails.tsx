"use client";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Label } from "./ui/label";
import { FancyMultiSelect, Item } from "./ui/fancy-multi-select";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { FaRegEdit } from "react-icons/fa";
import { Client, Project, Proposal } from "@/types";
import validator from "validator";
import { TimePickerInput } from "./ui/time-picker-input";
import { TimePickerDemo } from "./ui/time-picker-demo";
import { DateTimePicker } from "./ui/date-time-picker";

interface EmailDetailsProps {
  proposal: Proposal;
  clients: Client[];
  client: Client;
  project: Project;
  to: Item[];
  setTo: Dispatch<SetStateAction<Item[]>>;
  cc: Item[];
  setCc: Dispatch<SetStateAction<Item[]>>;
  bcc: Item[];
  setBcc: Dispatch<SetStateAction<Item[]>>;
  subject: string;
  setSubject: Dispatch<SetStateAction<string>>;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  scheduledDate: Date | undefined;
  setScheduledDate: (date: Date | undefined) => void;
}

export default function EmailDetails({
  proposal,
  clients,
  client,
  project,
  to,
  setTo,
  cc,
  setCc,
  bcc,
  setBcc,
  subject,
  setSubject,
  message,
  setMessage,
  scheduledDate,
  setScheduledDate,
}: EmailDetailsProps) {
  const [editSubject, setEditSubject] = useState(false);
  const subjectInputRef = useRef<HTMLInputElement>(null);
  const [editMessage, setEditMessage] = useState(false);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  // const CCOrBCCInputRef = useRef<any>(null);

  const [sendCC, setSendCC] = useState<boolean>(false);
  const [sendBCC, setSendBCC] = useState<boolean>(false);

  let emails;
  if (clients)
    emails = clients.map((client) => {
      return client.email_address;
    });
  // console.log("EMAILS", emails);

  let emailItems: Item[] = [];
  if (emails) {
    emailItems = emails.map((email) => {
      return { value: email ?? "", label: email ?? "" };
    });
  }

  let clientEmail = "";

  if (client) clientEmail = client.email_address ?? "";

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
        <FancyMultiSelect
          items={emailItems ?? ([] as Item[])}
          initialItems={[{ value: clientEmail, label: clientEmail }]}
          placeholder="Add an email"
          inputValidator={validator.isEmail}
          setSelectedItems={setTo}
        />
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
          <FancyMultiSelect
            items={emailItems ?? ([] as Item[])}
            initialItems={[]}
            placeholder="Add an email"
            setSelectedItems={setCc}
          />
        </>
      )}
      {sendBCC && (
        <>
          <Label className="text-[14.5px] 2xl:text-lg text-textColor-700 font-semibold">
            BCC
          </Label>
          <FancyMultiSelect
            items={emailItems ?? ([] as Item[])}
            initialItems={[]}
            placeholder="Add an email"
            setSelectedItems={setBcc}
          />
        </>
      )}
      <Label className="text-[14.5px] 2xl:text-lg text-textColor-700 font-semibold">
        Subject
      </Label>
      {editSubject ? (
        <Input
          className="h-8"
          defaultValue={subject}
          value={subject}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSubject(e.target.value)
          }
          ref={subjectInputRef}
        />
      ) : (
        <span className="h-8 border rounded-sm border-textColor-200 flex justify-between items-center pl-4">
          <p className="text-textColor-500 font-medium text-[12.5px] 2xl:text-base">
            {subject}
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
          className="text-[12.5px] h-[180px] max-h-[200px] 2xl:h-[200px] 2xl:max-h-[240px]"
          defaultValue={message}
          value={message}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setMessage(e.target.value)
          }
        />
      ) : (
        <span className="h-[180px] border rounded-sm border-textColor-200 p-4 relative">
          <span className="flex justify-between items-center"></span>
          <p className="text-textColor-500 font-medium text-[12.5px] 2xl:text-base">
            {message.split("\n")[0]} <br></br> {message.split("\n")[1]}
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
      <Label className="text-[14.5px] 2xl:text-lg text-textColor-700 font-semibold">
        Schedule
      </Label>
      <DateTimePicker date={scheduledDate} setDate={setScheduledDate} />
    </div>
  );
}
