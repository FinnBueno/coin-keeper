import type { FC } from "react";
import { Overview } from "../components/overview";
import { Flex } from "../components/general/Flex";
import { FinancialTables } from "../components/tables";

export const MainPage: FC = () => {
  return (
    <Flex
      alignItems="center"
      width="100%"
      flexDirection="column"
      gap={2}
      flexGrow={1}
    >
      <Overview />
      <FinancialTables />
    </Flex>
  );
};
