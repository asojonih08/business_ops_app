"use server";
import { Proposal } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const insertProposal = async (formData: FormData): Promise<Proposal[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });
  // console.log(formData);

  const { data, error } = await supabase
    .from("proposals")
    .insert({
      project: formData.get("project"),
      status: formData.get("status"),
      is_subdivided: true,
    })
    .select("*");

  if (error) {
    console.log(error);
  }

  return (data as any) || [];
};

export default insertProposal;
