"use server";
import { Proposal } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const updateProposalEstimates = async (
  formData: FormData
): Promise<Proposal[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const estimates = formData
    .getAll("estimates")
    .map((estimate) => Number(estimate));

  // console.log("upadteEstimates: ", estimates);

  const { data, error } = await supabase
    .from("proposals")
    .update({ estimates: estimates })
    .eq("id", Number(formData.get("proposal")));

  if (error) {
    console.log(error);
  }

  return (data as any) || [];
};

export default updateProposalEstimates;
