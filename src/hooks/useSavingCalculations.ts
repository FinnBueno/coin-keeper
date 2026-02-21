interface SavingCalculations {
  toSharedAccount: number;
  toPersonalAccount: number;
  personalSpending: number;
}

export const useSavingCalculations = (salary: number): SavingCalculations => {
  const getPersonalSpendingPerMonth = (): number =>
    +(localStorage.getItem("persona-spending-per-month") ?? 0);
  const getPersonalSavingsPerMonth = (): number =>
    +(localStorage.getItem("personal-savings-per-month") ?? 0);

  const toPersonalAccount = getPersonalSavingsPerMonth();
  const personalSpending = getPersonalSpendingPerMonth();

  return {
    toPersonalAccount,
    personalSpending,
    toSharedAccount: salary - personalSpending - toPersonalAccount,
  };
};
