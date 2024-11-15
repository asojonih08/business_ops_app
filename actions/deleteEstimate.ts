"use server";
import { Client } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const deleteEstimate = async (id: number)=> {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { error } = await supabase
    .from("estimates")
    .delete()
    .eq("id", id);

  if (error) {
    console.log(error);
  }
};

export default deleteEstimate;