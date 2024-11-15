import {
  EstimateTotals,
  EstimateComponents,
  LaborCostTotals,
  MaterialsCostTotals,
} from "../types";
import calculateLaborCost from "./calculateLaborCost";

const calculateEstimate = async (estimateInputs: EstimateComponents) => {
  //TODO: retrieve from database
  const defaultProfitMargin = 0.15;
  const salesTaxRate = 0.1;
  const monthlyFixedCosts = {
    carRegistration: 41.67,
    carInsurance: 80,
    operatingSalaries: 1_200,
    bond: 6.67,
    gas: 1_680,
    officeCost: 30,
    tools: 300,
    rent: 4000,
    cellPhone: 75,
    fee: 14,
    phone: 68,
    carMaintenance: 150,
    ownersSalary: 5_460,
    seTax: 835.38,
    license: 23.33,
    generalLiabilityInsurance: 79.17,
    workersCompFees: 100,
    accounting: 450,
    ownersPayrollTax: 750,
  };
  const expectedWorkingHours = 153;
  let totalFixedCostsMonthly = 0;

  for (const fixedCost in monthlyFixedCosts) {
    if (monthlyFixedCosts.hasOwnProperty(fixedCost)) {
      const value =
        monthlyFixedCosts[fixedCost as keyof typeof monthlyFixedCosts];
      if (typeof value === "number") {
        totalFixedCostsMonthly += value;
      }
    }
  }

  // const overheadCostRate = await getOverheadCostsRate();
  const overheadRate = totalFixedCostsMonthly / expectedWorkingHours;

  const laborCost: LaborCostTotals = calculateLaborCost(
    estimateInputs.laborCostInputs
  );
  //   const materialsCost: MaterialsCostTotals = calculateMaterialsCost(
  //     estimateInputs.materialsCostInputs
  //   );

  const materialsCostTotals: MaterialsCostTotals = {
    materialsMarkup: estimateInputs.materialsCostTotals.materialsMarkup,
    totalMaterialsCost: estimateInputs.materialsCostTotals.totalMaterialsCost,
    totalMaterialsCostNoMarkup:
      estimateInputs.materialsCostTotals.totalMaterialsCostNoMarkup,
  };

  const estimate: EstimateTotals = {
    laborCost: laborCost,
    materialsCostTotals: materialsCostTotals,
    fixtureRatio: 0,
    fixture: false,
    overheadRate: overheadRate,
    overheadCost: overheadRate * laborCost.totalLaborHours,
    salesTaxRate: salesTaxRate,
    salesTax: 0,
    breakevenNoTaxProfit: 0,
    breakevenTaxNoProfit: 0,
    profitMarginRate: estimateInputs.profitMarginRate,
    profit: 0,
    totalCostNoTax: 0,
    totalCost: 0,
  };

  estimate.fixtureRatio =
    (laborCost.totalFabricationCost + materialsCostTotals.totalMaterialsCost) /
    (laborCost.totalLaborCost + materialsCostTotals.totalMaterialsCost);
  if (estimate.fixtureRatio >= 0.9) {
    estimate.fixture = true;
  }
  estimate.breakevenNoTaxProfit =
    laborCost.totalLaborCost +
    materialsCostTotals.totalMaterialsCost +
    estimate.overheadCost +
    laborCost.subcontractorCost +
    laborCost.independentContractorCost +
    laborCost.deliveryFee +
    laborCost.gasFee +
    laborCost.equipmentRentalFee +
    laborCost.miscellaneousFees;

  estimate.profit =
    estimate.profitMarginRate *
    (laborCost.totalLaborCost +
      estimate.overheadCost +
      laborCost.subcontractorCost +
      laborCost.independentContractorCost);
  estimate.totalCostNoTax = estimate.breakevenNoTaxProfit + estimate.profit;

  if (estimate.fixture) {
    estimate.salesTax =
      salesTaxRate * (estimate.totalCostNoTax - laborCost.subcontractorCost);
  } else {
    estimate.salesTax = materialsCostTotals.totalMaterialsCost * salesTaxRate;
  }

  estimate.breakevenTaxNoProfit =
    estimate.breakevenNoTaxProfit + estimate.salesTax;

  estimate.totalCost = estimate.totalCostNoTax + estimate.salesTax;

  return estimate;
};

export default calculateEstimate;
