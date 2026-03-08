import type { FC } from "react";
import type { BankExportStatement } from "../../../../services/banking";
import { Flex } from "../../../general/Flex";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import { toEuro } from "../../../../util/money";

interface Props {
  items: BankExportStatement[];
}

export const SpontaneousSpendingSection: FC<Props> = ({ items }) => {
  const { palette } = useTheme();
  return (
    <Flex flexDirection="column">
      {items.map((item, index) => (
        <Flex flexDirection="column" key={index}>
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
            <Box
              component="span"
              sx={{
                px: "2px",
                backgroundColor:
                  item.amount < 0
                    ? palette.moneyLabel.negative.background
                    : palette.moneyLabel.positive.background,
                border: `solid 1.5px ${item.amount < 0 ? palette.moneyLabel.negative.main : palette.moneyLabel.positive.main}`,
                borderRadius: "4px",
              }}
            >
              {toEuro(item.amount)}
            </Box>{" "}
            on {item.dateLabel}
          </Typography>
          <Divider />
        </Flex>
      ))}
    </Flex>
  );
};
