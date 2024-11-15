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
      project_name: formData.get("projectName"),
      client: formData.get("client"),
      client_name: formData.get("clientName"),
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
