import { capitalize } from "@mui/material";
import type {
  DateAt,
  ScheduledExpense,
} from "../repositories/periodManagement/IPeriodManagementRepository";
import { months } from "./months";

export function parseEasyDate(inputAt: string): DateAt {
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

export function easyDate(at: DateAt) {
  return `${capitalize(at.month)} ${numberToNth(at.dayofmonth)}`;
}

function numberToNth(dayofmonth: number) {
  switch (dayofmonth % 10) {
    case 1:
      return `${dayofmonth}st`;
    case 2:
      return `${dayofmonth}nd`;
    default:
      return `${dayofmonth}th`;
  }
}

export function hasPassed(at: DateAt) {
  const now = new Date();
  const monthIndex = months.findIndex((v) => v === at.month);
  if (monthIndex === -1)
    throw new Error(`Month ${at.month} is not a valid month`);
  console.log(now.getMonth(), now.getDate(), monthIndex, at.dayofmonth);
  if (monthIndex > now.getMonth()) {
    // the event is in the next month
    return false;
  } else {
    // the event is in this month
    if (at.dayofmonth > now.getDate()) return false;
    return true;
  }
}
