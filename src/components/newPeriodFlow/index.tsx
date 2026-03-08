import { Button } from "@mui/material";
import { useState, type FC } from "react";
import { AppModal } from "../general/AppModal";
import { FlowManager } from "./FlowManager";

export const NewPeriodFlow: FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        variant="contained"
        size="large"
        color="error"
        onClick={handleOpen}
      >
        New period
      </Button>
      <AppModal open={open} onClose={handleClose}>
        <FlowManager onComplete={handleClose} />
      </AppModal>
    </>
  );
};
