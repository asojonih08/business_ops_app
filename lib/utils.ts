import { Material } from "@/app/proposals/materials-columns";
import { Json } from "@/types_db";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseMaterials(materials: Json[]): Material[] {
  const parsedMaterials: Material[] = [];

  materials.forEach((material, index) => {
    if (
      typeof material === "object" &&
      material !== null &&
      !Array.isArray(material)
    ) {
      const parsedMaterial: Material = {
        num: index + 1, // starting num from 1
        type: material.type as string | null,
        description: material.description as string | null,
        quantity: material.quantity as string | null,
        rate: material.rate as string | null,
        amount: material.amount as string | null,
      };
      parsedMaterials.push(parsedMaterial);
    }
  });

  return parsedMaterials;
}

export function convertMaterialsToJson(materials: Material[]): Json[] {
  return materials.map((material) => {
    const { num, quantity, rate, amount, ...rest } = material; // Omit 'num' and destructure other values

    return {
      ...rest,
      quantity: quantity ? parseFloat(quantity) : null, // Convert quantity to number or null if empty
      rate: rate ? parseFloat(rate) : null, // Convert rate to number or null if empty
      amount: amount ? parseFloat(amount) : null, // Convert amount to number or null if empty
    } as Json;
  });
}
