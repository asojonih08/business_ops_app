export interface LaborCostTotals {
  fabricationEmployeesWagesTotal: number;
  installationEmployeesWagesTotal: number;
  fabricationEmployeesPayrollTax: number;
  installationEmployeesPayrollTax: number;
  fabricationWorkersComp: number;
  installationWorkersComp: number;
  totalFabricationCost: number;
  totalInstallationCost: number;
  totalLaborCost: number;
  totalLaborHours: number;
  subcontractorCost: number;
  independentContractorCost: number;
  totalContractorCost: number;
  deliveryFee: number;
  gasFee: number;
  equipmentRentalFee: number;
  miscellaneousFees: number;
  totalOtherFees: number;
}

export type LaborCostInputs = {
  fabricationHours: number;
  installationHours: number;
  subcontractorCost: number;
  independentContractorCost: number;
  deliveryCost: number;
  gasCost: number;
  equipmentRentalCost: number;
  miscellaneousCost: number;
};

export interface MaterialsCostTotals {
  totalMaterialsCostNoMarkup: number;
  materialsMarkup: number;
  totalMaterialsCost: number;
}

export interface EstimateComponents {
  laborCostInputs: LaborCostInputs;
  materialsCostTotals: MaterialsCostTotals;
  profitMarginRate: number;
}

export interface EstimateTotals {
  laborCost: LaborCostTotals;
  materialsCostTotals: MaterialsCostTotals;
  fixtureRatio: number;
  fixture: boolean;
  overheadRate: number;
  overheadCost: number;
  salesTaxRate: number;
  salesTax: number;
  breakevenNoTaxProfit: number;
  breakevenTaxNoProfit: number;
  profitMarginRate: number;
  profit: number;
  totalCostNoTax: number;
  totalCost: number;
}
