import type { FC } from "react";
import { BalanceInfo } from "./BalanceInfo";
import { Flex } from "../general/Flex";
import { CurrentPeriodInfo } from "./CurrentPeriodInfo";
import { ImportButtons } from "./ImportButtons";

export const Overview: FC = () => (
  <Flex
    width="100%"
    maxWidth={{
      xs: "100%",
      lg: "lg",
    }}
    justifyContent="space-between"
    px={3}
    flexWrap="wrap"
    gap={2}
  >
    <BalanceInfo />
    <Flex
      flexGrow={1}
      flexDirection="column"
      alignItems="flex-end"
      justifyContent="space-between"
      mb={1}
      display={{
        md: "inherit",
        xs: "none",
      }}
    >
      <CurrentPeriodInfo />
      <ImportButtons />
    </Flex>
  </Flex>
);
