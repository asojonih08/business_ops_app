"use server";
import { Project } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const insertProject = async (formData: FormData): Promise<Project[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });
  // console.log(formData);

  const { data, error } = await supabase.from("projects").insert({
    name: formData.get("name"),
    status: "pending approval",
    paid_in_full: false,
    street_address: formData.get("streetAddress"),
    apartment_or_suite_number: formData.get("aptSuiteNo"),
    state: formData.get("state"),
    zip_or_postal_code: formData.get("zipPostalCode"),
  });

  if (error) {
    console.log(error);
  }

  return (data as any) || [];
};

export default insertProject;
