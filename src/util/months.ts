export const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
] as const;

const dutchMonths = [
  "januari",
  "februari",
  "maart",
  "april",
  "mei",
  "juni",
  "juli",
  "augustus",
  "september",
  "october",
  "november",
  "december",
] as const;

export type Months = (typeof months)[number];

export const monthMaxDays: Record<string, () => number> = {
  january: () => 31,
  february: () => (new Date().getFullYear() % 4 === 0 ? 29 : 28),
  march: () => 31,
  april: () => 30,
  may: () => 31,
  june: () => 30,
  july: () => 31,
  august: () => 31,
  september: () => 30,
  october: () => 31,
  november: () => 30,
  december: () => 31,
};

export const indexedMonthMaxDays = Object.values(monthMaxDays).reduce(
  (total, current, index) => {
    total[index] = current;
    return total;
  },
  {} as Record<number, () => number>,
);

export const dutchMonthNameToIndex = (dutchMonthName: string) => {
  return dutchMonths.findIndex((m) => m === dutchMonthName);
};
