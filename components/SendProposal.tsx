"use client";
import React, { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import ProposalItemsDetailsList from "@/components/ProposalItemsDetailsList";
import EmailDetails from "@/components/EmailDetails";
import { Client, Estimate, Project, Proposal } from "@/types";

import { useProposalItemsDetails } from "@/components/ProposalItemsDetailsContext";
import { toast } from "sonner";
import uploadProposalDoc from "@/actions/uploadProposalDoc";
import { Item } from "@/components/ui/fancy-multi-select";
import insertScheduledEmail from "@/actions/insertScheduledEmail";
import { Json } from "@/types_db";
import getScheduledEmails from "@/actions/getScheduledEmails";
import { useRouter } from "next/navigation";
import updateProposalEmailSentDetails from "@/actions/updateProposalEmailSentDetails";
import ProposalPDFBuilderForUsePdf from "./ProposalPDFBuilderForUsePdf";
import { usePDF } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
// import SendProposalActions from "./SendProposalActions";
// Import `PDFViewer` dynamically to avoid server-side rendering issues
const ProposalPDFViewer = dynamic(
  () => import("@/components/ProposalPDFViewer").then(),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

// console.log("PROPOSAL PDF BUILDER: ", ProposalPDFBuilder);

// console.log("PROPOSAL PDF Viewer: ", ProposalPDFViewer);
// console.log("Separator:", Separator);
// console.log("ScrollArea:", ScrollArea);
// console.log("Button:", Button);
// console.log("ProposalItemsDetailsList:", ProposalItemsDetailsList);
// console.log("EmailDetails:", EmailDetails);
// console.log("ProposalPDFViewer:", ProposalPDFViewer);
// console.log("usePDF:", usePDF);
// console.log("useProposalItemsDetails:", useProposalItemsDetails);

interface SendProposalProps {
  proposal: Proposal;
  proposalItems: Estimate[];
  clients: Client[];
  client: Client;
  project: Project;
}

export default function SendProposal({
  proposal,
  proposalItems,
  clients,
  client,
  project,
}: SendProposalProps) {
  const { proposalItemsDetails } = useProposalItemsDetails();
  const defaultSubject = "Proposal - " + project.street_address;
  const defaultWelcome = "Hello,";
  const defaultMessage = `attached is the proposal for ${project.street_address}. Please get back to us with any questions or concerns.`;
  const [to, setTo] = useState<Item[]>([]);
  const [cc, setCc] = useState<Item[]>([]);
  const [bcc, setBcc] = useState<Item[]>([]);
  const [subject, setSubject] = useState<string>(defaultSubject);
  const [message, setMessage] = useState<string>(
    defaultWelcome + "\n" + defaultMessage
  );
  const [scheduledDate, setScheduledDate] = useState<Date>();

  const router = useRouter();

  const [instance, updateInstance] = usePDF();

  useEffect(
    () =>
      updateInstance(
        <ProposalPDFBuilderForUsePdf
          proposal={proposal ?? []}
          proposalItems={proposalItems ?? []}
          client={client ?? null}
          proposalItemsDetails={proposalItemsDetails}
        />
      ),
    [proposalItemsDetails]
  );

  async function handleSendEmail() {
    // console.log("Handle Send Email");
    const parsedMessage = message.split("\n");
    const hmtlMessage = parsedMessage[0] + "<br></br>" + parsedMessage[1];
    try {
      const blobToBase64 = (blob: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise((resolve) => {
          reader.onloadend = () => {
            resolve(reader.result);
          };
        });
      };
      // console.log("PDF URL: ", instance.url?.split("blob:")[1]);
      // console.log("PDF BLOB STREAM: ", instance.blob?.stream);
      // console.log("INSTANCE", instance);
      // console.log("INSTANCE BLOB STREAM: ", instance.blob?.text());
      const blobData = instance.blob;
      const base64Result = await blobToBase64(blobData);

      const proposalFileName =
        "Proposal-" + project.street_address.split(" ").join("-") + ".pdf";
      // console.log("Proposal PDF File Name: ", proposalFileName);

      const emailDetails = {
        emailService: "resend",
        to: to.map((toItem) => toItem.value),
        cc: cc.map((ccItem) => ccItem.value),
        bcc: bcc.map((bccItem) => bccItem.value),
        subject,
        message: hmtlMessage,
        attachments: [
          {
            content: base64Result,
            encoding: "base64",
            filename: proposalFileName,
          },
        ],
      };

      if (!scheduledDate) {
        const res = await fetch("/api/sendEmail", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(emailDetails),
        });

        const data = await res.json();
        if (res.ok) {
          toast.success("Email Sent", {
            onAutoClose: () => router.push("/proposals"),
          });
          const uploadedProposalDoc = await uploadProposalDoc(
            proposalFileName,
            (base64Result as string).split(",")[1]
          );

          console.log("UPLOADED PROPOSAL DOC: ", uploadedProposalDoc);

          // console.log("UPLOAD Proposal PDF DATA: ", data);
          const updatedProposal = await updateProposalEmailSentDetails(
            proposal.id!,
            uploadedProposalDoc.fullPath,
            proposal.date_sent
              ? [
                  ...proposal.date_sent.map((date) => new Date(date)),
                  new Date(),
                ]
              : [new Date()],
            to.map((item) => item.value) as Json[]
          );
        } else {
          toast.error("Email Not Sent");
        }
      } else {
        // console.log("EMAIL SCHEDULED FOR: ", scheduledDate);
        const insertedScheduledEmail = proposal.id
          ? await insertScheduledEmail(
              emailDetails as Json,
              scheduledDate!,
              proposal.id
            )
          : [];

        if (insertedScheduledEmail) {
          toast.success(
            "Email Scheduled For " +
              (scheduledDate.getMonth() < 10
                ? "0" + scheduledDate.getMonth()
                : scheduledDate.getMonth()) +
              "/" +
              (scheduledDate.getDay() < 10
                ? "0" + scheduledDate.getDay()
                : scheduledDate.getDay()) +
              "/" +
              scheduledDate.getFullYear() +
              " " +
              (scheduledDate.getHours() < 10
                ? "0" + scheduledDate.getHours()
                : scheduledDate.getHours()) +
              ":" +
              (scheduledDate.getMinutes() < 10
                ? "0" + scheduledDate.getMinutes()
                : scheduledDate.getMinutes()),
            {
              onAutoClose: () => router.push("/proposals"),
            }
          );

          const uploadedProposalDoc = await uploadProposalDoc(
            proposalFileName,
            (base64Result as string).split(",")[1]
          );

          console.log("INSERTED SCHEDULED EMAIL: ", insertedScheduledEmail);

          console.log("UPLOADED PROPOSAL DOC: ", uploadedProposalDoc);

          console.log("PROPOSAL.SENT_TO: ", proposal.sent_to);

          // console.log("UPLOAD Proposal PDF DATA: ", data);
          const updatedProposal = await updateProposalEmailSentDetails(
            proposal.id!,
            uploadedProposalDoc.fullPath,
            proposal.date_sent
              ? [
                  ...proposal.date_sent.map((date) => new Date(date)),
                  scheduledDate,
                ]
              : [scheduledDate],
            proposal.sent_to
              ? [...proposal.sent_to, ...to.map((item) => item.value)]
              : to.map((item) => item.value)
          );
          console.log(
            "TO: ",
            to.map((item) => item.value)
          );
          console.log(
            "UPDATED PROPOSAL AFTER SENT (SCHEDULED): ",
            updatedProposal
          );
        }
      }
      const scheduledEmails = await getScheduledEmails();
      // console.log("ALL SCHEDULED EMAILS: ", scheduledEmails);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex h-full w-full rounded-2xl bg-white px-16 2xl:px-20">
      <div className="w-1/2 my-[36px] 2xl:my-[120px] h-full">
        <ScrollArea className="h-[80%] pr-16 2xl:pr-20 mr-4">
          <p className="text-[18px] 2xl:text-[26px] text-textColor-800 font-bold my-4 mt-7 2xl:my-5">
            Email
          </p>
          <EmailDetails
            proposal={proposal}
            clients={clients}
            client={client}
            project={project}
            to={to}
            setTo={setTo}
            cc={cc}
            setCc={setCc}
            bcc={bcc}
            setBcc={setBcc}
            subject={subject}
            setSubject={setSubject}
            message={message}
            setMessage={setMessage}
            scheduledDate={scheduledDate}
            setScheduledDate={setScheduledDate}
          />

          <Separator className="h-[1.5px] w-full bg-textColor-300/45 my-8" />

          <div className="flex flex-col">
            <p className="text-[18px] 2xl:text-[26px] text-textColor-800 font-bold mb-3.5 2xl:mb-5">
              Items
            </p>
            <ProposalItemsDetailsList proposalItems={proposalItems} />
          </div>
        </ScrollArea>
        <Separator className="h-[2px] 2xl:h-[3px] bg-gradient-to-r from-ACCENT-50 via-ACCENT-700 to-ACCENT-50 w-[97%] my-3 bg" />
        <div className="flex justify-end mr-5 mt-[4.5%]">
          {/* <SendProposalActions
            bcc={bcc}
            cc={cc}
            client={client}
            message={message}
            project={project}
            proposal={proposal}
            proposalItems={proposalItems}
            proposalItemsDetails={proposalItemsDetails}
            scheduledDate={scheduledDate}
            subject={subject}
            to={to}
          /> */}
          <Button
            className="text-textColor-700 font-bold w-[100px] h-8 2xl:w-32 2xl:h-9 text-[14.5px] 2xl:text-[18px] tracking-wide
          hover:text-black hover:duration-300"
          >
            <p className="underline underline-offset-2">Save</p>
          </Button>
          <Button
            onClick={handleSendEmail}
            className="bg-textColor-base text-textColor-50 text-[13.5px] w-[115px] h-7 2xl:text-base 2xl:w-40 2xl:h-9 shadow-md tracking-wide
          hover:bg-textColor-800 hover:duration-300"
          >
            Send
          </Button>
        </div>
      </div>
      <div className="w-1/2 my-[32px] 2xl:my-[120px] h-[92%] pt-1 px-9 rounded-2xl border-[2px] border-ACCENT-200/15 bg-ACCENT-200/15 flex flex-col overflow-y-clip">
        <div className="h-[50px] 2xl:h-[140px] w-full flex items-center justify-between">
          <p className="text-[16.5px] 2xl:text-[24px] font-bold text-textColor-700">
            Preview
          </p>
          <span className="shadow-sm w-1/8 border-[1.8px] 2xl:border-[2px] rounded-lg border-textColor-700/60 text-[11px] 2xl:text-sm text-textColor-700/75 font-bold px-1.5 mr-2.5 py-0.5">
            PDF
          </span>
        </div>

        <Separator className="w-full h-[1.5px] bg-textColor-700/10 rounded-full mb-3" />
        <div className="w-full h-full bg-white rounded-t-2xl shadow-xl">
          <ProposalPDFViewer
            proposal={proposal}
            proposalItems={proposalItems}
            client={client}
            proposalItemsDetails={proposalItemsDetails}
          />
        </div>
      </div>
    </div>
  );
}
