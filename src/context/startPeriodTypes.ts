import { z } from "zod";
import { months, monthMaxDays, indexedMonthMaxDays } from "../util/months";

const planSchema = z.object({
  title: z.string("Required"),
  type: z.enum(["exact", "up_to"]),
  category: z.enum(["events", "want_to_have", "life", "travel", "food"]),
  amount: z.coerce.number().gt(0),
  at: z
    .object({
      dayofmonth: z.coerce.number().gte(1).lte(31),
      month: z.enum(months as [string, ...string[]]),
    })
    .refine(
      ({ dayofmonth, month }) =>
        month && monthMaxDays[month]
          ? dayofmonth <= monthMaxDays[month]()
          : true,
      {
        message: "Day exceeds the number of days in the month",
        path: ["dayofmonth"],
      },
    ),
});

export type NewPlan = z.infer<typeof planSchema>;

const dateInputSchema = z.string("Required").refine(
  (value) => {
    if (value.includes("/")) {
      const [day, month] = value.split("/");
      if (!day || !month) return false;
      if (isNaN(+month)) return false;
      if (isNaN(+day)) return false;
      const monthNumber = +month;
      const dayNumber = +day;
      if (monthNumber < 0 || monthNumber > 12) return false;
      const daysForMonth = indexedMonthMaxDays[monthNumber - 1]();
      if (dayNumber < 0 || dayNumber > daysForMonth) return false;
      return true;
    } else {
      if (isNaN(+value)) return false;

      const today = new Date();
      const currentDay = today.getDate();
      // if the input day is higher than or equal to the current day, assume it's the current month
      // if the input day is lower than the current day, assume it's the next month
      let month;
      if (+value >= currentDay) {
        month = months[today.getMonth() % 12];
      } else {
        month = months[(today.getMonth() + 1) % 12];
      }
      return +value > 0 && +value <= monthMaxDays[month]();
    }
  },
  {
    message: "Invalid",
  },
);

export type NewPlanDate = z.infer<typeof dateInputSchema>;

export const newPlansSchema = z.object({
  travelBudget: z.coerce.number("Required").gt(0, "Car won't fuel itself"),
  foodBudget: z.coerce.number("Required").gt(0, "You gotta eat something"),
  plans: z.array(planSchema),
  planInput: z.object({
    title: z.string("Required"),
    type: z.enum(["exact", "up_to"], "Invalid"),
    category: z.enum(
      ["events", "want_to_have", "life", "travel", "food"],
      "Invalid",
    ),
    amount: z.coerce.number("Required").gt(0, "Too low"),
    at: dateInputSchema,
  }),
});

export type NewMonthPlanning = z.infer<typeof newPlansSchema>;
export type NewMonthPlanningComplete = Omit<NewMonthPlanning, "planInput">;
