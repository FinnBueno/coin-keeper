import type { FC } from "react";
import { Flex } from "../components/general/Flex";
import { Autorenew } from "@mui/icons-material";

export const LoadingPage: FC = () => {
  return (
    <Flex
      alignItems="center"
      width="100%"
      height="100vh"
      flexDirection="column"
      justifyContent="center"
    >
      <Autorenew
        sx={{
          fontSize: "72px",
          animation: "spin .75s ease-in-out infinite",
          "@keyframes spin": {
            from: { transform: "rotate(0deg)" },
            to: { transform: "rotate(180deg)" },
          },
        }}
      />
    </Flex>
  );
};
