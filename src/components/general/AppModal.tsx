import { Box, Modal } from "@mui/material";
import type { FC, ReactNode } from "react";

interface Props {
  children: ReactNode[] | ReactNode;
  open: boolean;
  onClose: () => void;
}

export const AppModal: FC<Props> = ({ children, open, onClose }) => (
  <Modal open={open} onClose={onClose}>
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "calc(50% - 32px)",
        transform: "translate(-50%, -50%)",
        width: "calc(min(100%, 640px) - 32px)",
        bgcolor: "background.paper",
        border: "2px solid #000",
        m: "32px",
        boxShadow: 24,
        p: 4,
      }}
    >
      {children}
    </Box>
  </Modal>
);
