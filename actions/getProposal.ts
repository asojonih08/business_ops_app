"use server";
import { Proposal } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getProposal = async (id: number): Promise<Proposal> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from("proposals")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
  }

  return (data as any) || [];
};

export default getProposal;
