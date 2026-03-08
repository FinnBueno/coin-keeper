import { useState, type FC } from "react";
import { Flex } from "../general/Flex";
import { Button, TextField, Typography } from "@mui/material";
import { useSettings } from "../../hooks/useSettings";

interface Props {
  onClose: () => void;
}

export const SettingsView: FC<Props> = ({ onClose }) => {
  const {
    personalSavingsPerMonth,
    personalSpendingPerMonth,
    setPersonalSavingsPerMonth,
    setPersonalSpendingPerMonth,
  } = useSettings();

  const [savingsInput, setSavingsInput] = useState<number>(
    personalSavingsPerMonth,
  );
  const [spendingInput, setSpendingInput] = useState<number>(
    personalSpendingPerMonth,
  );

  const handleSave = () => {
    setPersonalSavingsPerMonth(savingsInput);
    setPersonalSpendingPerMonth(spendingInput);
    onClose();
  };

  return (
    <Flex flexDirection="column" gap={2}>
      <Typography variant="h6" component="h2">
        Settings
      </Typography>
      <Flex flexWrap="wrap" gap={2}>
        <Flex flexGrow={1}>
          <TextField
            fullWidth
            label="Saving per month"
            slotProps={{
              input: {
                startAdornment: <span>€&nbsp;</span>,
              },
            }}
            type="number"
            name="savingsInput"
            value={savingsInput}
            onChange={(e) => setSavingsInput(+e.target.value)}
          />
        </Flex>
        <Flex flexGrow={1}>
          <TextField
            fullWidth
            label="Spending per month"
            slotProps={{
              input: {
                startAdornment: <span>€&nbsp;</span>,
              },
            }}
            type="number"
            name="savingsInput"
            value={spendingInput}
            onChange={(e) => setSpendingInput(+e.target.value)}
          />
        </Flex>
      </Flex>
      <Button variant="contained" onClick={handleSave}>
        Save
      </Button>
    </Flex>
  );
};
