import { useSettings } from "./useSettings";

interface SavingCalculations {
  toSharedAccount: number;
  toPersonalAccount: number;
  personalSpending: number;
}

export const useSavingCalculations = (salary: number): SavingCalculations => {
  const { personalSavingsPerMonth, personalSpendingPerMonth } = useSettings();

  return {
    toPersonalAccount: personalSavingsPerMonth,
    personalSpending: personalSpendingPerMonth,
    toSharedAccount:
      salary - personalSpendingPerMonth - personalSavingsPerMonth,
  };
};
