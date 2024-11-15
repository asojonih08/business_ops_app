"use server";
import { ScheduledEmail } from "@/types";
import { Json } from "@/types_db";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const insertScheduledEmail = async (
  emailDetails: Json,
  scheduledAt: Date,
  proposalId: number
): Promise<ScheduledEmail> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });
  // console.log(formData);

  const { data, error } = await supabase
    .from("scheduled_emails")
    .insert({
      email_details: emailDetails,
      proposal: proposalId,
      scheduled_date: scheduledAt,
    })
    .select()
    .single();

  if (error) {
    console.log(error);
  }

  return (data as any) || [];
};

export default insertScheduledEmail;
