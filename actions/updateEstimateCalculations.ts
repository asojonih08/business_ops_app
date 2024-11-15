"use server";
import { EstimateTotals } from "@/app/proposals/create-proposal/[proposalId]/types";
import { Estimate, EstimateInputs } from "@/types";
import { Json } from "@/types_db";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const updateEstimateCalculations = async (
    id: number,
    item_name: string,
    type: string,
    room: string,
    estimateInputs: EstimateInputs,
    estimateCalculations: EstimateTotals
): Promise<Estimate> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from("estimates")
    .update({
      item_name: item_name,
      type: type,
      room: room,
      fabrication_hours: estimateInputs.fabricationHours,
      installation_hours: estimateInputs.installationHours,
      subcontractor_cost: estimateInputs.subcontractorCost,
      independent_contractor_cost: estimateInputs.independentContractorCost,
      delivery_cost: estimateInputs.deliveryCost,
      gas_cost: estimateInputs.gasCost,
      equipment_rental_cost: estimateInputs.equipmentRentalCost,
      miscellaneous_cost: estimateInputs.miscellaneousCost,
      status: "Completed",
      total_fabrication_employees_wage: estimateCalculations.laborCost.fabricationEmployeesWagesTotal,
      total_installation_employees_wage: estimateCalculations.laborCost.installationEmployeesWagesTotal,
      payroll_tax_rate: 0.2, // Needs to be saved in DB
      workers_comp_rate: 0.11, // Needs to be saved in DB
      fabrication_employees_payroll_tax: estimateCalculations.laborCost.fabricationEmployeesPayrollTax,
      installation_employees_payroll_tax: estimateCalculations.laborCost.installationEmployeesPayrollTax,
      fabrication_employees_workers_comp: estimateCalculations.laborCost.fabricationWorkersComp,
      installation_employees_workers_comp: estimateCalculations.laborCost.installationWorkersComp,
      total_fabrication_cost: estimateCalculations.laborCost.totalFabricationCost,
      total_installation_cost: estimateCalculations.laborCost.totalInstallationCost,
      total_labor_cost: estimateCalculations.laborCost.totalLaborCost,
      yearly_expected_working_hours: 153, // Needs to be saved in DB
      fixture_ratio: estimateCalculations.fixtureRatio,
      is_fixture: estimateCalculations.fixture,
      overhead_rate: estimateCalculations.overheadRate,
      overhead_cost: estimateCalculations.overheadCost,
      sales_tax_rate: 0.1, // Needs to be saved in DB
      sales_tax: estimateCalculations.salesTax,
      breakeven_no_tax_profit: estimateCalculations.breakevenNoTaxProfit,
      breakeven_tax_no_profit: estimateCalculations.breakevenTaxNoProfit,
      profit_margin_rate: estimateCalculations.profitMarginRate,
      profit: estimateCalculations.profit,
      total_cost_no_tax: estimateCalculations.totalCostNoTax,
      total_cost: estimateCalculations.totalCost
    })
    .eq("id", Number(id));
    //For testing
    const waiting = await new Promise((res)=> setTimeout(res, 3000));
  if (error) {
    console.log(error);
  }

  return (data as any) || [];
};

export default updateEstimateCalculations;
