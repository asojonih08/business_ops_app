"use server";
import { Project } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getProjects = async (): Promise<Project[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

    // //For testing
    // await new Promise((res)=> setTimeout(res, 2000));

  if (error) {
    console.log(error);
  }
  return (data as any) || [];
};

export default getProjects;
