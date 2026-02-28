import { Typography } from "@mui/material";
import type { FC } from "react";
import { DontBreak } from "../../../general/DontBreak";
import { toEuro } from "../../../../util/money";

interface Props {
  spent: number;
  amount: number;
}

export const ItemCompleteBody: FC<Props> = ({ spent, amount }) => {
  let note = "";
  const isOverspent = spent > amount;
  if (isOverspent) {
    note = `You overspent by ${toEuro(spent - amount)}`;
  } else if (spent < amount) {
    note = `You saved ${toEuro(amount - spent)}`;
  }
  return (
    <Typography>
      {isOverspent ? "‼️ " : "✅ "}You've spent {toEuro(spent)} of the allocated{" "}
      <DontBreak>{toEuro(amount)}</DontBreak> ({note})
    </Typography>
  );
};
