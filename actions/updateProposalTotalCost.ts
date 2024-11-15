"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const updateProposalTotalCost = async (id: number, totalCost: number) => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from("proposals")
    .update({
      total_cost: totalCost,
    })
    .eq("id", Number(id));

  if (error) {
    console.log(error);
  }

  return (data as any) || [];
};

export default updateProposalTotalCost;
