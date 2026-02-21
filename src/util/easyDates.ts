import type { ScheduledExpense } from "../context/startPeriodTypes";
import { months } from "./months";

export function parseEasyDate(inputAt: string): ScheduledExpense["at"] {
  let dayofmonth;
  let month;
  const today = new Date();
  if (inputAt.includes("/")) {
    const [day, monthIndex] = inputAt.split("/");
    dayofmonth = +day;
    month = months[(+monthIndex - 1) % 12];
  } else {
    dayofmonth = +inputAt;
    const currentDay = today.getDate();
    // if the input day is higher than or equal to the current day, assume it's the current month
    // if the input day is lower than the current day, assume it's the next month
    if (dayofmonth >= currentDay) {
      month = months[today.getMonth() % 12];
    } else {
      month = months[(today.getMonth() + 1) % 12];
    }
  }

  return {
    dayofmonth,
    month,
  };
}
