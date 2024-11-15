"use server";
import { Proposal } from "@/types";
import { Json } from "@/types_db";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const updateProposalEmailSentDetails = async (
  id: number,
  proposalDocFullPath: string,
  dateSent: Date[],
  sentTo: Json[]
): Promise<Proposal> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });
  console.log;

  const { data, error } = await supabase
    .from("proposals")
    .update({
      status: "Sent",
      date_sent: dateSent,
      proposal_doc_path: proposalDocFullPath,
      sent_to: sentTo,
    })
    .eq("id", id);

  if (error) {
    console.log(error);
  }

  console.log("UPDATE PROPOSAL EMAIL SENT DETAILS RETURNED DATA: ", data);

  return (data as any) || [];
};

export default updateProposalEmailSentDetails;
