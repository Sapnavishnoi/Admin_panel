import { lightGreen, red } from "@mui/material/colors";

const theme = {
  palette: {
    common: {
      white: "#fff",
      offWhite: "#f2f2f2",
      black: "#000",
      grey: "#e6e6e6",
      red: "#ce181e"
    },
    primary: {
      main: "#000099"
    },
    secondary: {
      main: "#233044",
      dark: "#1e293a",
      label: "#EEEEEEB3"
    },
    success: {
      light: lightGreen[100],
      main: lightGreen[500],
      dark: lightGreen[900]
    },
    danger: {
      light: red[100],
      main: red[500],
      dark: red[900]
    },
    button: {
      backgrounColor: "#ce181e",
      secondaryTextColor: "#505d69"
    },
  },
  typography: {
    fontFamily: [ "Open Sans", "sans-serif" ].join(","),
    fontSize: 14
  },
  overrides: {
    MuiDivider: {
      root: {
        marginTop: 1,
      },
    },
    MuiButton: {
      root: {
        fontWeight: "bold",
      }
    }
  }
}

export default theme;
