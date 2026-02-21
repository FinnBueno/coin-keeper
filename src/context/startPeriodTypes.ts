import { z } from "zod";
import { months, monthMaxDays } from "../util/months";

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

export type ScheduledExpense = z.infer<typeof planSchema>;
