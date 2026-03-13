import { parse } from "node-html-parser";
import type { HTMLElement } from "node-html-parser";
import type { PlanCategory } from "../repositories/periodManagement/IPeriodManagementRepository";
import { dutchMonthNameToIndex } from "../util/months";
import { getRandomId } from "../util/id";

export interface BankExportStatement {
  id: string;
  title: string;
  dateLabel: string;
  amount: number;
  category?: PlanCategory;
  plannedExpenseId?: string;
}

interface DailyBankExport {
  dateLabel: string;
  items: Record<number, BankExportStatement>;
}

export interface BankExportLastRun {
  dateLabel: number;
  amountOfEntries: number;
  wasTrimmedBySalaryEntry: boolean;
}

export interface BankExport {
  dayEntries: Record<number, DailyBankExport>;
  scannedUpTo: BankExportLastRun;
}

/**
 * This function scans a given HTML input and extracts sorted bank statements from it. It also returns the date and
 *  entry up to which it was able to scan. This is normally the most recent day and item in the data set
 * The bank statements are grouped by day and ordered by occurrence.
 * This function scans the given input from top to bottom.
 * This function does not scan beyond the day specified by "lastScanDateLabel"
 * This function does not scan beyond the item "lastScanEntryIndex" on the "lastScanDateLabel"
 * After completing the scan, any items that appear above a salary entry will be trimmed, and the scannedUpTo properties will
 *  report the scan ran up to the salary entry. This is to prevent scans from being cross periods. By supplying the next scan
 *  with the values from scannedUpTo, the salary entry in question will be skipped. This is intentional.
 * @param input
 * @param lastScanDateLabel
 * @param lastScanEntryAmountOnNewestDate
 * @returns
 */
export function parseStatementsFromHtml(
  input: string,
  lastScanDateLabel: number,
  lastScanEntryAmountOnNewestDate: number,
): BankExport {
  if (typeof input !== "string") throw new TypeError("input must be a string");
  if (input.length === 0) throw new TypeError("input cannot be empty");
  const root = parse(input);
  try {
    const items = root.querySelector("ap-transaction-container")!.children;
    if ((items?.length ?? 0) === 0) {
      return {
        dayEntries: {},
        scannedUpTo: {
          dateLabel: lastScanDateLabel,
          amountOfEntries: lastScanEntryAmountOnNewestDate,
          wasTrimmedBySalaryEntry: false,
        },
      };
    }

    // these values are used to determine the last scan values for the next time this function is called
    let startingDateLabel: number | undefined;
    let newestDateTransactionCount = 0;
    // map through different days
    // each day is composed from its own separate table element
    const statementsPerDay = items.reduce<BankExport>(
      (total, node) => {
        // find the date label in the table head
        const dateLabelRaw = node.querySelector(
          `thead tr th:first-child`,
        )?.innerHTML;

        const dateLabel = dateLabelRaw
          ?.replace("Gisteren - ", "")
          .replace("Vandaag - ", "")
          .trim();

        if (!dateLabel)
          throw new Error(`Could not parse date label for ${node}`);

        const [day, month] = dateLabel.split(" ");
        const monthAsIndex = dutchMonthNameToIndex(month);
        const technicalDateLabel = +(monthAsIndex + `${day}`.padStart(2, "0"));

        // don't include anything at or beyond the last scan date label
        if (lastScanDateLabel && technicalDateLabel < lastScanDateLabel)
          return total;

        const transactions = parseTransactionsForDay(
          dateLabel,
          node,
          lastScanDateLabel === technicalDateLabel
            ? lastScanEntryAmountOnNewestDate
            : undefined,
        );

        if (!startingDateLabel) {
          startingDateLabel = technicalDateLabel;
          if (technicalDateLabel === lastScanDateLabel) {
            newestDateTransactionCount =
              Object.keys(transactions.items).length +
              lastScanEntryAmountOnNewestDate;
          } else {
            newestDateTransactionCount = Object.keys(transactions.items).length;
          }
        }

        return {
          ...total,
          dayEntries: {
            ...total.dayEntries,
            [technicalDateLabel]: transactions,
          },
        };
      },
      {
        dayEntries: {},
        scannedUpTo: {
          dateLabel: startingDateLabel!,
          amountOfEntries: newestDateTransactionCount,
          wasTrimmedBySalaryEntry: false,
        },
      },
    );

    if (startingDateLabel === undefined)
      throw new Error("Could not find value for highestDateLabel");

    if (
      lastScanDateLabel &&
      statementsPerDay.dayEntries[lastScanDateLabel] &&
      Object.keys(statementsPerDay.dayEntries[lastScanDateLabel].items ?? {})
        .length === 0
    ) {
      delete statementsPerDay.dayEntries[lastScanDateLabel];
    }

    return trimContentAboveSalary({
      ...statementsPerDay,
      scannedUpTo: {
        dateLabel: startingDateLabel!,
        amountOfEntries: newestDateTransactionCount,
        wasTrimmedBySalaryEntry: false,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("input does not contain required data");
  }
}

function parseTransactionsForDay(
  dateLabel: string,
  root: HTMLElement,
  lastScanEntryAmountOnNewestDate?: number,
): DailyBankExport {
  let entryNames = root
    .querySelectorAll("tbody tr td:first-child > div > div > div")
    .map((e) => e.innerHTML);

  let entryAmount = root
    .querySelectorAll(
      "tbody tr td:nth-child(2) > div > ap-amount-display > span",
    )
    .map((e) => e.innerHTML);

  if (entryNames.length !== entryAmount.length) {
    throw new Error(
      `Found ${entryNames.length} names and ${entryAmount.length} amounts`,
    );
  }

  // remove all items that were already scanned
  if (lastScanEntryAmountOnNewestDate !== undefined) {
    entryNames = entryNames.slice(0, -lastScanEntryAmountOnNewestDate);
    entryAmount = entryAmount.slice(0, -lastScanEntryAmountOnNewestDate);
  }

  return entryNames.reduce(
    (total, current, index) => {
      const amount = +entryAmount[index]
        .replace("<!----> ", "")
        .replace(".", "")
        .replace(",", ".");

      const bankExportStatement: BankExportStatement = {
        id: getRandomId(),
        title: current.trim(),
        amount: amount,
        dateLabel,
        category: undefined,
        plannedExpenseId: undefined,
      };
      const result: DailyBankExport = {
        ...total,
        items: {
          ...total.items,
          [index]: bankExportStatement,
        },
      };
      return result;
    },
    { dateLabel, items: {} },
  );
}

function trimContentAboveSalary(statementsPerDay: BankExport): BankExport {
  const indexOfDayWithSalary = Object.entries(
    statementsPerDay.dayEntries,
  ).findIndex(([_, day]) => {
    return !!Object.values(day.items).find(
      (item) => item.title === "COOLBLUE BV" && item.amount > 2500,
    );
  });

  if (indexOfDayWithSalary === -1) return statementsPerDay;

  // we know there is a salary entry somewhere in here

  // get the key and value of the day with the salary
  const [keyOfDayWithSalary, valueOfDayWithSalary] = Object.entries(
    statementsPerDay.dayEntries,
  )[indexOfDayWithSalary];

  // remove everything above the day with the salary entry
  const dayEntriesBeforeSalaryInclusive = Object.entries(
    statementsPerDay.dayEntries,
  );
  dayEntriesBeforeSalaryInclusive.splice(indexOfDayWithSalary + 1);

  // we then go remove all items above the salary entry on the day of the salary
  // find the index of the salary entry
  const entryIndexOfSalaryEntry = Object.values(
    valueOfDayWithSalary.items,
  ).findIndex((item) => item.title === "COOLBLUE BV" && item.amount > 2500);
  const [dayWithSalaryKey, dayWithSalaryValue] =
    dayEntriesBeforeSalaryInclusive[dayEntriesBeforeSalaryInclusive.length - 1];
  // update the entire day to remove the salary entry and everything above it
  dayEntriesBeforeSalaryInclusive[dayEntriesBeforeSalaryInclusive.length - 1] =
    [
      dayWithSalaryKey,
      {
        ...dayWithSalaryValue,
        items: Object.entries(dayWithSalaryValue.items)
          .splice(entryIndexOfSalaryEntry + 1)
          .reduce((total, [_, v], i) => ({ ...total, [i]: v }), {}),
      },
    ];

  const dayEntries: BankExport["dayEntries"] =
    dayEntriesBeforeSalaryInclusive.reduce(
      (total, [k, v]) => ({ ...total, [+k]: v }),
      {},
    );
  return {
    dayEntries,
    scannedUpTo: {
      dateLabel: +dayWithSalaryKey,
      amountOfEntries:
        Object.keys(dayEntries[keyOfDayWithSalary as unknown as number].items)
          .length + 1, // +1 to skip the salary entry on next run
      wasTrimmedBySalaryEntry: true,
    },
  };
}
