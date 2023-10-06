import { Typography } from "@mui/material";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export const SimpleTypographyError = ({
  error,
}: {
  error: FetchBaseQueryError | SerializedError;
}) => {
  return (
    <Typography
      variant="body1"
      sx={(theme) => ({
        color: theme.palette.error.main,
        fontSize: ".9rem",
        padding: "0px 20px 20px",
        fontWeight: theme.typography.fontWeightBold,
        textAlign: "center",
      })}
    >
      {"status" in error
        ? "error" in error
          ? error.error
          : JSON.stringify(error.data).replace(/^"(.*)"$/, "$1")
        : error.message}
    </Typography>
  );
};
