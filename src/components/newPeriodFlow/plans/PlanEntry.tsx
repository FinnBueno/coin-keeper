import type { FC } from "react";
import type { NewPlan } from "../../../context/startPeriodTypes";
import { Delete, Edit } from "@mui/icons-material";
import { Box, Grid, IconButton, ListItem, Typography } from "@mui/material";
import { toEuro } from "../../../util/money";

interface Props {
  plan: NewPlan;
  onRemove: () => void;
  onEdit: () => void;
}

const categoryToEmoji: Record<NewPlan["category"], string> = {
  events: "🎭",
  want_to_have: "💫",
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
        {plan.type === "up_to" && "Up to "}
        {toEuro(plan.amount)}
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
