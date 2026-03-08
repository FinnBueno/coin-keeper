import { Button } from "@mui/material";
import { useState, type FC } from "react";
import { AppModal } from "../general/AppModal";
import { FlowManager } from "./FlowManager";
// import { FlowManager } from "./FlowManager";

export const ImportExpensesFlow: FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" size="large" onClick={handleOpen}>
        Import items
      </Button>
      <AppModal open={open} onClose={handleClose}>
        <FlowManager onComplete={handleClose} />
      </AppModal>
    </>
  );
};
