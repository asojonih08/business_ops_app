"use server";
import { Estimate } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getEstimatesByProposal = async (id: number): Promise<Estimate[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from("estimates")
    .select("*")
    .eq("proposal", id)
    .order("created_at", { ascending: true });

  if (error) {
    console.log(error);
  }
  return (data as any) || [];
};

export default getEstimatesByProposal;
