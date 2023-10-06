import { createTheme } from "@mui/material/styles";
import React from "react";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    mainHeader: React.CSSProperties;
    "parag-1-black": React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    mainHeader?: React.CSSProperties;
    "parag-1-black"?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    mainHeader: true;
    "parag-1-black": true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    "pill-primary": true;
    "pill-secondary": true;
  }
}

export const theme = createTheme({
  palette: {
    background: {
      // light orange
      paper: "#FFFBF5",
      // light blue
      default: "#F4FDFF",
    },
    primary: {
      main: "#0077B6",
      dark: "#01497C",
      light: "#00B4D8",
    },
    secondary: {
      main: "#E85D04",
      dark: "#C14B00",
      light: "#F48C06",
    },
    common: {
      black: "#525252",
      white: "#fff",
    },
    grey: {
      A100: "#DFDFDF",
      A200: "#A0A0A0",
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    mainHeader: {
      textTransform: "uppercase",
      fontWeight: 700,
      color: "#01497C",
      fontSize: "1.3rem",
      marginBottom: 15,
      display: "block",
    },
    "parag-1-black": {
      textAlign: "justify",
      color: "#000",
      fontSize: ".8rem",
      lineHeight: "1.8",
    },
  },
  components: {
    MuiTextField: {
      variants: [
        {
          props: { variant: "outlined" },
          style: ({ theme }) => ({
            "& .MuiOutlinedInput-root": {
              fontSize: ".8rem",
              fontWeight: theme.typography.fontWeightBold,
              color: theme.palette.common.black,
              background: theme.palette.common.white,
              borderRadius: 10,
              "&.Mui-error": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.error.main,
                },
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
            },
            "& .MuiFormLabel-root": {
              fontSize: ".8rem",
              color: theme.palette.common.black,
              "&.Mui-focused": {
                color: theme.palette.primary.main,
                top: -8,
              },
            },
          }),
        },
      ],
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "pill-primary" },
          style: ({ theme }) => ({
            fontWeight: 600,
            color: theme.palette.common.white,
            backgroundColor: theme.palette.primary.light,
            borderRadius: 50,
            boxShadow: theme.shadows[1],
            fontSize: ".85rem",
            padding: theme.spacing(1, 4),
            textTransform: "none",
            "&:hover": {
              backgroundColor: theme.palette.primary.main,
            },
          }),
        },
        {
          props: { variant: "pill-secondary" },
          style: ({ theme }) => ({
            fontWeight: 600,
            color: theme.palette.common.white,
            backgroundColor: theme.palette.secondary.light,
            borderRadius: 50,
            boxShadow: theme.shadows[1],
            fontSize: ".85rem",
            padding: theme.spacing(1, 4),
            textTransform: "none",
            "&:hover": {
              backgroundColor: theme.palette.secondary.main,
            },
          }),
        },
      ],
    },
  },
});
