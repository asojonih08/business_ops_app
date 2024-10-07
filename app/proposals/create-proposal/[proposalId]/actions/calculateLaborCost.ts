import { LaborCostInputs, LaborCostTotals } from "../types";

export const calculateLaborCost = (laborCostInputs: LaborCostInputs) => {
  //TODO: retrieve from database
  const fabricationHourlyWages = [25, 35];
  const installationHourlyWages = [25, 35];
  const payrollTaxRate = 0.2;
  const workersCompRate = 0.11;

  const laborCostTotals: LaborCostTotals = {
    fabricationEmployeesWagesTotal: 0,
    installationEmployeesWagesTotal: 0,
    fabricationEmployeesPayrollTax: 0,
    installationEmployeesPayrollTax: 0,
    fabricationWorkersComp: 0,
    installationWorkersComp: 0,
    totalFabricationCost: 0,
    totalInstallationCost: 0,
    totalLaborCost: 0,
    totalLaborHours:
      laborCostInputs.fabricationHours + laborCostInputs.installationHours,
    subcontractorCost: laborCostInputs.subcontractorCost,
    independentContractorCost: laborCostInputs.independentContractorCost,
    totalContractorCost:
      laborCostInputs.subcontractorCost +
      laborCostInputs.independentContractorCost,
    deliveryFee: laborCostInputs.deliveryCost,
    gasFee: laborCostInputs.gasCost,
    equipmentRentalFee: laborCostInputs.equipmentRentalCost,
    miscellaneousFees: laborCostInputs.miscellaneousCost,
    totalOtherFees:
      laborCostInputs.deliveryCost +
      laborCostInputs.gasCost +
      laborCostInputs.equipmentRentalCost +
      laborCostInputs.miscellaneousCost,
  };

  //FABRICATION
  const fabricationTotalsWages = fabricationHourlyWages.map(
    (wage) => wage * laborCostInputs.fabricationHours
  );

  laborCostTotals.fabricationEmployeesWagesTotal =
    fabricationTotalsWages.reduce((acc, currentValue) => acc + currentValue, 0);

  laborCostTotals.fabricationEmployeesPayrollTax =
    laborCostTotals.fabricationEmployeesWagesTotal * payrollTaxRate;

  laborCostTotals.fabricationWorkersComp =
    laborCostTotals.fabricationEmployeesWagesTotal * workersCompRate;

  laborCostTotals.totalFabricationCost =
    laborCostTotals.fabricationEmployeesWagesTotal +
    laborCostTotals.fabricationEmployeesPayrollTax +
    laborCostTotals.fabricationWorkersComp;

  //INSTALLATION
  const installationTotalsWages = installationHourlyWages.map(
    (wage) => wage * laborCostInputs.installationHours
  );

  laborCostTotals.installationEmployeesWagesTotal =
    installationTotalsWages.reduce(
      (acc, currentValue) => acc + currentValue,
      0
    );

  laborCostTotals.installationEmployeesPayrollTax =
    laborCostTotals.installationEmployeesWagesTotal * payrollTaxRate;

  laborCostTotals.installationWorkersComp =
    laborCostTotals.installationEmployeesWagesTotal * workersCompRate;

  laborCostTotals.totalInstallationCost =
    laborCostTotals.installationEmployeesWagesTotal +
    laborCostTotals.installationEmployeesPayrollTax +
    laborCostTotals.installationWorkersComp;

  laborCostTotals.totalLaborCost =
    laborCostTotals.totalFabricationCost +
    laborCostTotals.totalInstallationCost;

  return laborCostTotals;
};

export default calculateLaborCost;
