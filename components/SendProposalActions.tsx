"use client";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import updateProposalEmailSentDetails from "@/actions/updateProposalEmailSentDetails";
import { toast } from "sonner";
import insertScheduledEmail from "@/actions/insertScheduledEmail";
import { Json } from "@/types_db";
import uploadProposalDoc from "@/actions/uploadProposalDoc";
import getScheduledEmails from "@/actions/getScheduledEmails";
import { useRouter } from "next/navigation";
import { Client, Estimate, Project, Proposal } from "@/types";
import { Item } from "./ui/fancy-multi-select";
import { ProposalItemsDetails } from "./ProposalItemsDetailsContext";
import {
  BlobProvider,
  Document,
  Page,
  pdf,
  Text,
  usePDF,
} from "@react-pdf/renderer";
import dynamic from "next/dynamic";

// Import `PDFViewer` dynamically to avoid server-side rendering issues
const ProposalPDFBuilderForUsePdf = dynamic(
  () => import("@/components/ProposalPDFBuilderForUsePdf").then(),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

interface SendProposalActionsProps {
  message: string;
  project: Project;
  to: Item[];
  cc: Item[];
  bcc: Item[];
  subject: string;
  scheduledDate: Date | undefined;
  proposal: Proposal;
  client: Client;
  proposalItems: Estimate[];
  proposalItemsDetails: ProposalItemsDetails;
}

export default function SendProposalActions({
  message,
  project,
  to,
  cc,
  bcc,
  subject,
  scheduledDate,
  proposal,
  client,
  proposalItems,
  proposalItemsDetails,
}: SendProposalActionsProps) {
  const router = useRouter();
  //   const [instance, updateInstance] = usePDF({
  //     document: (
  //       <ProposalPDFBuilderForUsePdf
  //         proposal={proposal}
  //         client={client}
  //         proposalItems={proposalItems}
  //         proposalItemsDetails={proposalItemsDetails}
  //       />
  //     ),
  //   });

  //   useEffect(
  //     () =>
  //       updateInstance(
  //         <ProposalPDFBuilderForUsePdf
  //           proposal={proposal}
  //           proposalItems={proposalItems}
  //           client={client}
  //           proposalItemsDetails={proposalItemsDetails}
  //         />
  //       ),
  //     [proposalItemsDetails]
  //   );

  //   const MyDoc = (
  //     <Document>
  //       <Page>
  //         <Text>Hi</Text>
  //       </Page>
  //     </Document>
  //   );

  //   const blob = pdf(MyDoc).toBlob();

  async function handleSendEmail(blob: any) {
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
      const blobData = blob;
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
    <BlobProvider
      document={
        <ProposalPDFBuilderForUsePdf
          proposal={proposal}
          client={client}
          proposalItems={proposalItems}
          proposalItemsDetails={proposalItemsDetails}
        />
      }
    >
      {({ blob, url, loading, error }) => {
        // Do whatever you need with blob here
        return (
          <>
            <Button
              className="text-textColor-700 font-bold w-[100px] h-8 2xl:w-32 2xl:h-9 text-[14.5px] 2xl:text-[18px] tracking-wide
        hover:text-black hover:duration-300"
            >
              <p className="underline underline-offset-2">Save</p>
            </Button>
            <Button
              onClick={() => handleSendEmail(blob)}
              className="bg-textColor-base text-textColor-50 text-[13.5px] w-[115px] h-7 2xl:text-base 2xl:w-40 2xl:h-9 shadow-md tracking-wide
  hover:bg-textColor-800 hover:duration-300"
            >
              Send
            </Button>
          </>
        );
      }}
    </BlobProvider>
  );
}
