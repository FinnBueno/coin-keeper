import { type FC } from "react";
import { Flex } from "../general/Flex";
import { NewPeriodFlow } from "../newPeriodFlow";
import { ImportExpensesFlow } from "../importExpensesFlow";

export const ImportButtons: FC = () => {
  return (
    <Flex gap={2}>
      <ImportExpensesFlow />
      <NewPeriodFlow />
    </Flex>
  );
};
