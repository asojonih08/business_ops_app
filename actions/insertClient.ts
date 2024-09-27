"use server";
import { Client } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const insertClient = async (formData: FormData): Promise<Client[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });
  // console.log(formData);

  const { data, error } = await supabase.from("clients").insert({
    client_type: formData.get("clientType"),
    company_name: formData.get("companyName"),
    primary_contact_name: formData.get("primaryContactName"),
    primary_contact_position: formData.get("primaryContactPosition"),
    phone_number: formData.get("phoneNumber"),
    email_address: formData.get("emailAddress"),
    referral_source: formData.get("referralSource"),
  });

  if (error) {
    console.log(error);
  }

  revalidatePath("/proposals/create-proposal");
  return (data as any) || [];
};

export default insertClient;
