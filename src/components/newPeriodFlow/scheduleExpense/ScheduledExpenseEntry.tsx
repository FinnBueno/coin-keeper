import type { FC } from "react";
import {
  planTypes,
  type PlanCategories,
  type ScheduledExpense,
} from "../../../repositories/periodManagement/IPeriodManagementRepository";
import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { toEuro } from "../../../util/money";

interface Props {
  plan: ScheduledExpense;
  onRemove: () => void;
  onEdit: () => void;
}

const categoryToEmoji: Record<keyof PlanCategories, string> = {
  events: "🎭",
  wantToHave: "💫",
  life: "🗓️",
  travel: "🚗",
  food: "🥪",
};

export const PlanEntry: FC<Props> = ({ plan, onRemove, onEdit }) => {
  return (
    <>
      <Typography fontWeight="bold" minWidth="max-content">
        {categoryToEmoji[plan.category]} {plan.title}
      </Typography>
      <Typography minWidth="max-content" textAlign="right">
        {planTypes[plan.type]} {toEuro(plan.amount)}
      </Typography>
      <Typography minWidth="max-content" textAlign="right">
        {plan.at.dayofmonth} {plan.at.month}
      </Typography>
      <Box minWidth="max-content">
        <IconButton onClick={onEdit}>
          <Edit />
        </IconButton>
        <IconButton onClick={onRemove}>
          <Delete />
        </IconButton>
      </Box>
    </>
  );
};
