import { CircularProgress, Stack } from "@mui/material";

import React from "react";

type CircularProps = {
  color?: string;
};

export const LoaderCircular = ({ color = "#fff" }: CircularProps) => {
  return (
    <Stack alignItems="center" justifyContent="center">
      <CircularProgress
        size={30}
        sx={{
          color: color,
        }}
      />
    </Stack>
  );
};
