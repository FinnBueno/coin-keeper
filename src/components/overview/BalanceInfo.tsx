import { Box, Typography } from "@mui/material";
import type { FC } from "react";
import { useDataClient } from "../../context/DatabaseContext";
import { toEuro } from "../../util/money";
import { Flex } from "../general/Flex";

export const BalanceInfo: FC = () => {
  const {
    currentBalance,
    finalBalance,
    currentPeriod,
    hasSharedSaveBeenMade,
    hasPersonalSaveBeenMade,
    savedToShared,
    savedToPersonal,
  } = useDataClient();
  if (!currentPeriod) return null;
  // todo: continue this logic
  // if the minimum save has been made, show it as green
  // if less than the minimum was saved, show the remainder that must be transferred
  // then fix the logic that says "how much left at end of month"
  const totalSaving =
    currentPeriod.toSharedAccount + currentPeriod.toPersonalAccount;
  let toShared = currentPeriod.toSharedAccount;
  let toPersonal = currentPeriod.toPersonalAccount;
  if (hasSharedSaveBeenMade && !hasPersonalSaveBeenMade) {
    toPersonal = totalSaving - savedToShared;
  } else if (hasPersonalSaveBeenMade && !hasSharedSaveBeenMade) {
    toShared = totalSaving - savedToPersonal;
  }
  return (
    <Box
      display="flex"
      flexGrow={1}
      justifyContent="space-between"
      flexDirection="column"
    >
      <Typography variant="body1">
        {hasSharedSaveBeenMade ? (
          <>
            ✅ You've saved{" "}
            <span style={{ fontWeight: "bold" }}>{toEuro(savedToShared)}</span>{" "}
            to your joint account.
          </>
        ) : (
          <>
            ⚠️ Transfer{" "}
            <span style={{ fontWeight: "bold" }}>{toEuro(toShared)}</span> to
            your joint account.
          </>
        )}
      </Typography>
      <Typography variant="body1" mb={2}>
        {hasPersonalSaveBeenMade ? (
          <>
            ✅ You've saved{" "}
            <span style={{ fontWeight: "bold" }}>
              {toEuro(savedToPersonal)}
            </span>{" "}
            to your personal account.
          </>
        ) : (
          <>
            ⚠️ Transfer{" "}
            <span style={{ fontWeight: "bold" }}>{toEuro(toPersonal)}</span> to
            your personal account.
          </>
        )}
      </Typography>
      <Flex gap={4}>
        <Flex flexDirection="column">
          <Typography variant="h5">Current balance</Typography>
          <Typography
            fontSize={{
              xs: "3rem",
              sm: "3.75rem",
            }}
            variant="h2"
            fontWeight="bold"
          >
            {toEuro(currentBalance)}
          </Typography>
        </Flex>
        <Flex flexDirection="column">
          <Typography variant="h5">You'll end with...</Typography>
          <Typography
            fontSize={{
              xs: "3rem",
              sm: "3.75rem",
            }}
            variant="h2"
            fontWeight="bold"
          >
            {toEuro(finalBalance)}
          </Typography>
        </Flex>
      </Flex>
    </Box>
  );
};
