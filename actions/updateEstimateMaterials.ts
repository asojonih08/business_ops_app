"use server";
import { Estimate } from "@/types";
import { Json } from "@/types_db";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const updateEstimateMaterials = async (
  id: number,
  materials: Json[],
  materialsMarkupRate: number,
  materialsCostNoMarkup: number,
  materialsCost: number
): Promise<Estimate> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from("estimates")
    .update({
      materials: materials,
      materials_cost: materialsCost,
      materials_markup_rate: materialsMarkupRate,
      materials_cost_no_markup: materialsCostNoMarkup
    })
    .eq("id", Number(id));

  if (error) {
    console.log(error);
  }

  return (data as any) || [];
};

export default updateEstimateMaterials;
