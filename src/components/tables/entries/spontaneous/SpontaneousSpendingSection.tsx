import type { FC } from "react";
import type { BankExportStatement } from "../../../../services/banking";
import { Flex } from "../../../general/Flex";
import { Divider, Typography } from "@mui/material";
import { toEuro } from "../../../../util/money";

interface Props {
  items: BankExportStatement[];
}

export const SpontaneousSpendingSection: FC<Props> = ({ items }) => {
  return (
    <Flex flexDirection="column">
      {items.map((item) => (
        <Flex flexDirection="column">
          <Typography
            variant="h6"
            noWrap
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {/* todo: allow the title to be changed */}
            {item.title}
          </Typography>
          <Typography>
            {toEuro(item.amount)} on {item.dateLabel}
          </Typography>
          <Divider />
        </Flex>
      ))}
    </Flex>
  );
};
