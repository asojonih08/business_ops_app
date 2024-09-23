import { Estimate } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getEstimatesByProject = async (
  projectId: number
): Promise<Estimate[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from("estimates")
    .select("*")
    .eq("project", projectId)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  }
  return (data as any) || [];
};

export default getEstimatesByProject;
