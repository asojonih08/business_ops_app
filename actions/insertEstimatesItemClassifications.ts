"use server";
import { Estimate } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const insertEstimatesItemClassifications = async (
  formData: FormData
): Promise<Estimate[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });
  // console.log(formData);
  let itemClassifications: Object[] = [];
  const itemClassificationsCount = Number(
    formData.get("itemClassificationsCount")
  );
  const project = Number(formData.get("project"));
  const client = formData.get("client");
  const proposal = Number(formData.get("proposal"));
  for (let i = 0; i < itemClassificationsCount; i++) {
    let itemClassificationValues = formData.getAll("item" + i);
    const item = {
      item_name: itemClassificationValues[0],
      type: itemClassificationValues[1],
      room: itemClassificationValues[2],
      project: project,
      client: client,
      proposal: proposal,
      status: "Draft",
    };
    itemClassifications = [...itemClassifications, item];
  }

  const { data, error } = await supabase
    .from("estimates")
    .insert(itemClassifications)
    .select("*");

  if (error) {
    console.log(error);
  }

  return (data as any) || [];
};

export default insertEstimatesItemClassifications;
