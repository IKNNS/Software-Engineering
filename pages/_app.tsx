import "../styles/globals.css"
import type { AppProps } from "next/app"
import React from "react"
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material"
import { initFirebase } from "../firebase/FirebaseApp"
import Controller from "components/common/Controller"
const theme = createTheme({
  typography: {
    fontFamily: [
      "kanit",
      "-apple-system",
      "BlinkMacSystemFont",
      ""Segoe UI"",
      "Roboto",
      ""Helvetica Neue"",
      "Arial",
      "sans-serif",
      ""Apple Color Emoji"",
      ""Segoe UI Emoji"",
      ""Segoe UI Symbol"",
    ].join(","),
  },
  palette: {
    secondary: {
      main: "#90969D"
    },
    info: {
      main: "#0165FF"
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          paddingLeft: "8px",
          paddingRight: "8px",
          paddingTop: "4px",
          paddingBottom: "4px",
          borderRadius: "10px",
          fontSize: "1rem",
          fontWeight: 400,
        }
      }
    }
  }
});

function MyApp({ Component, pageProps }: AppProps) {

  initFirebase();

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
        <Controller />
      </ThemeProvider>
  )

}

export default MyApp