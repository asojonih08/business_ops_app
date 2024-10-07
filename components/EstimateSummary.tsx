"use client";
import React, { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { useEstimateInputs } from "./EstimateInputsContext";
import calculateEstimate from "@/app/proposals/create-proposal/[proposalId]/actions/calculateEstimate";
import {
  EstimateComponents,
  EstimateTotals,
  LaborCostInputs,
  MaterialsCostTotals,
} from "@/app/proposals/create-proposal/[proposalId]/types";
import { Estimate } from "@/types";
import { useSelecetedProposalItem } from "./SelectedItemContext";
//TODO: LABOR COST, FIXED COST, and MATERIALS COST NOT UPDATING
const summaryLabels_1 = [
  "Labor Cost",
  "Overhead Cost",
  "Material Cost",
  "Contractor Cost",
  "Additional Cost",
  "Fixture",
  "Sales Tax",
];

const summaryLabels_2 = [
  "Profit Margin %",
  "Profit",
  "Breakeven",
  "Total Cost Pretax",
];

interface EstimateSummaryProps {
  proposalItems: Estimate[];
}

export default function EstimateSummary({
  proposalItems,
}: EstimateSummaryProps) {
  const { estimateInputs, setEstimateInputs } = useEstimateInputs();
  const { selectedProposalItem } = useSelecetedProposalItem();
  const [estimateCalculations, setEstimateCalculations] =
    useState<EstimateTotals>();
  const currentProposalItem = proposalItems[selectedProposalItem];
  const summaryValues = [
    estimateCalculations?.laborCost.totalLaborCost,
    estimateCalculations?.fixedCosts,
    currentProposalItem.materials_cost,
    estimateInputs.independentContractorCost + estimateInputs.subcontractorCost,
    estimateInputs.deliveryCost +
      estimateInputs.gasCost +
      estimateInputs.equipmentRentalCost +
      estimateInputs.miscellaneousCost,
    estimateCalculations?.salesTax,
    estimateCalculations ? estimateCalculations?.profitMargin * 100 : null,
    estimateCalculations?.profit,
    estimateCalculations?.breakevenTaxNoProfit,
    estimateCalculations?.totalCostNoTax,
  ];

  useEffect(() => {
    const calcEstimate = async () => {
      const laborCostInputs: LaborCostInputs = {
        fabricationHours: estimateInputs.fabricationHours,
        installationHours: estimateInputs.installationHours,
        subcontractorCost: estimateInputs.subcontractorCost,
        independentContractorCost: estimateInputs.independentContractorCost,
        deliveryCost: estimateInputs.deliveryCost,
        gasCost: estimateInputs.gasCost,
        equipmentRentalCost: estimateInputs.equipmentRentalCost,
        miscellaneousCost: estimateInputs.miscellaneousCost,
      };
      const materialsCostTotals: MaterialsCostTotals = {
        totalMaterialsCost: currentProposalItem.materials_cost,
        materialsMarkup: currentProposalItem.materials_markup_rate,
        totalMaterialsCostNoMarkup:
          currentProposalItem.materials_cost /
          (1 + 0.01 * currentProposalItem.materials_markup_rate),
      };
      const estimateComponents: EstimateComponents = {
        laborCostInputs: laborCostInputs,
        materialsCostTotals: materialsCostTotals,
        profitMargin: 0.2,
      };
      const estimateCalc = await calculateEstimate(estimateComponents);
      setEstimateCalculations(estimateCalc);
    };
    calcEstimate();
  }, [estimateInputs]);

  return (
    <div className="flex flex-col gap-4 2xl:gap-6">
      <div className="flex items-center">
        <h1 className="text-[15px] 2xl:text-[22px] font-bold text-textColor-base">
          Estimate Summary
        </h1>
        <span className="h-5 2xl:h-6"></span>
      </div>

      <Separator className="w-full h-[1.3px] 2xl:h-[2px] mx-auto bg-textColor-300/15" />

      <div className="text-[10px] 2xl:text-[14px] rounded-2xl bg-ACCENT-200/15 drop-shadow-sm w-full h-[85%] py-2 pb-5 2xl:py-6 2xl:pb-10">
        {summaryLabels_1.map((label, index) => (
          <div
            key={label}
            className={`${
              index % 2 === 1
                ? "bg-ACCENT-200/35 py-0.5 2xl:py-1.5 px-[3.5px] rounded-sm"
                : ""
            } w-[95%] mx-auto my-1.5 2xl:my-2.5`}
          >
            <span className="flex justify-between">
              <span className="text-textColor-400 font-medium">{label}</span>
              <span className="text-textColor-800 font-semibold tracking-wide">
                {summaryLabels_1[index] !== "Fixture" && "$ "}{" "}
                {summaryLabels_1[index] !== "Fixture"
                  ? summaryValues[index]?.toFixed(2)
                  : estimateCalculations?.fixture
                  ? "Yes"
                  : "No"}
              </span>
            </span>
            {/* <Separator className="w-full h-[0.5px]" /> */}
          </div>
        ))}
        <div className="2xl:text-[14.5px] flex items-center w-[95%] justify-between mx-auto my-4 2xl:my-9">
          <div className="flex flex-col items-center w-[46%]">
            {summaryLabels_2.map(
              (label, index) =>
                index <= 1 && (
                  <div key={label} className="w-[95%] mx-auto">
                    <span className="flex justify-between my-1">
                      <span className="text-textColor-600 font-semibold">
                        {label}
                      </span>
                      <span className="text-textColor-800 font-bold tracking-wide">
                        {label !== "Profit Margin %" && "$ "}{" "}
                        {label === "Profit Margin %"
                          ? summaryValues[index + 6]
                          : summaryValues[index + 6]?.toFixed(2)}
                      </span>
                    </span>
                  </div>
                )
            )}
          </div>
          <Separator
            orientation="vertical"
            className="h-12 w-[1.2px] 2xl:h-16 2xl:w-[1.5px]"
          />
          <div className="flex flex-col items-center w-[46%]">
            {summaryLabels_2.map(
              (label, index) =>
                index >= 2 && (
                  <div key={label} className="w-[95%] mx-auto">
                    <span className="flex justify-between my-1">
                      <span className="text-textColor-600 font-semibold">
                        {label}
                      </span>
                      <span className="text-textColor-800 font-bold tracking-wide">
                        $ {summaryValues[index + 6]?.toFixed(2)}
                      </span>
                    </span>
                  </div>
                )
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 2xl:gap-8">
          <Separator className="w-full h-[1.5px] 2xl:h-[2px] bg-textColor-200/70 bg-opacity-10" />
          <span className="flex w-[92%] justify-between mx-auto">
            <span className="text-base 2xl:text-xl text-textColor-900 font-bold tracking-wider">
              Total
            </span>
            <span className="text-lg 2xl:text-xl text-textColor-900 font-bold tracking-widest">
              ${estimateCalculations?.totalCost.toFixed(2)}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
