import type { FC } from "react";
import { Flex } from "./Flex";
import { Box, Tooltip } from "@mui/material";
import { toEuro } from "../../util/money";

interface Props {
  value: number;
  max: number;
  color: string;
}

export const ProgressBar: FC<Props> = ({ color, value, max }) => {
  const tooltip = `${toEuro(value)} / ${toEuro(max)} (${Math.floor((value / max) * 100)}%)`;
  return (
    <Flex
      width="100%"
      flexDirection="column"
      position="relative"
      minHeight="10px"
      my={1}
      borderRadius={4}
      overflow="clip"
    >
      <Tooltip title={value > max ? `‼️ ${tooltip} ‼️ ` : tooltip}>
        <Box
          position="absolute"
          top="0"
          width="100%"
          height="10px"
          bgcolor={color}
          sx={{ opacity: 0.2 }}
          boxShadow="inset 0 0 5px #333"
        />
      </Tooltip>
      <Box
        position="absolute"
        top="0"
        width="100%"
        height="10px"
        bgcolor={color}
        left={0}
        sx={{
          transformOrigin: "center left",
          transform: `scaleX(${value / max})`,
          pointerEvents: "none",
        }}
      />
    </Flex>
  );
};
