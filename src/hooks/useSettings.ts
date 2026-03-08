interface Settings {
  personalSpendingPerMonth: number;
  personalSavingsPerMonth: number;
  setPersonalSpendingPerMonth: (_: number) => void;
  setPersonalSavingsPerMonth: (_: number) => void;
}

const PERSONAL_SPENDING_KEY = "personal-spending-per-month";
const PERSONAL_SAVINGS_KEY = "personal-savings-per-month";

const PERSONAL_SPENDING_DEFAULT = 400;
const PERSONAL_SAVINGS_DEFAULT = 300;

const setPersonalSpendingPerMonth = (value: number) => {
  localStorage.setItem(PERSONAL_SPENDING_KEY, `${value}`);
};

const setPersonalSavingsPerMonth = (value: number) => {
  localStorage.setItem(PERSONAL_SAVINGS_KEY, `${value}`);
};

const verifyLocalStorageExists = (key: string, defaultValue: number) => {
  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, `${defaultValue}`);
  }
};

verifyLocalStorageExists(PERSONAL_SPENDING_KEY, PERSONAL_SPENDING_DEFAULT);
verifyLocalStorageExists(PERSONAL_SAVINGS_KEY, PERSONAL_SAVINGS_DEFAULT);

export const useSettings = (): Settings => {
  return {
    personalSpendingPerMonth: +(
      localStorage.getItem(PERSONAL_SPENDING_KEY) ?? PERSONAL_SPENDING_DEFAULT
    ),
    personalSavingsPerMonth: +(
      localStorage.getItem(PERSONAL_SAVINGS_KEY) ?? PERSONAL_SAVINGS_DEFAULT
    ),
    setPersonalSpendingPerMonth,
    setPersonalSavingsPerMonth,
  };
};
