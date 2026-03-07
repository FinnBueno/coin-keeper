import type { FC } from "react";
import { Button } from "@mui/material";
import { Flex } from "../components/general/Flex";
import { authService } from "../hooks/useAuth";

export const AuthPage: FC = () => {
  return (
    <Flex
      alignItems="center"
      width="100%"
      height="100vh"
      flexDirection="column"
      justifyContent="center"
    >
      <Button variant="contained" onClick={() => authService.initiateSignIn()}>
        Sign in with Google
      </Button>
    </Flex>
  );
};
