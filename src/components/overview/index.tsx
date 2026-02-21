import type { FC } from "react";
import { BalanceInfo } from "./BalanceInfo";
import { Flex } from "../general/Flex";
import { CurrentPeriodInfo } from "./CurrentPeriodInfo";
import { ImportButtons } from "./ImportButtons";

export const Overview: FC = () => (
  <Flex width="100%" maxWidth="lg" justifyContent="space-between" px={4}>
    <BalanceInfo />
    <Flex flexDirection="column" alignItems="flex-end">
      <CurrentPeriodInfo />
      <ImportButtons />
    </Flex>
  </Flex>
);
