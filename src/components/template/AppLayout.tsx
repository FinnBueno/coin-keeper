import type { FC, ReactNode } from "react";
import { Header } from "../general/Header";
import { Flex } from "../general/Flex";

interface Props {
  children: ReactNode;
}

export const AppLayout: FC<Props> = ({ children }) => (
  <Flex width="100%" height="100%" flexDirection="column" gap={2}>
    <Header />
    <Flex flexGrow={1} justifyContent="center" width="100%">
      <Flex
        justifyContent="center"
        alignItems="center"
        width="100%"
        flexDirection="column"
      >
        {children}
      </Flex>
    </Flex>
  </Flex>
);
