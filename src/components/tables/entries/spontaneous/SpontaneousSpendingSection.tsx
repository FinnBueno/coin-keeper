import type { FC } from "react";
import type { BankExportStatement } from "../../../../services/banking";
import { Flex } from "../../../general/Flex";
import { Box, Divider, Typography } from "@mui/material";
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
            <Box
              component="span"
              sx={{
                px: "2px",
                backgroundColor: item.amount < 0 ? "#fdf5f5" : "#f6ffe0",
                border:
                  item.amount < 0
                    ? "solid 1.5px #fa5336"
                    : "solid 1.5px #31c34a",
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
