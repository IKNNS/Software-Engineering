import '../styles/globals.css'
import type { AppProps } from 'next/app'
import LabelBottomNavigation from 'components/common/navbar'
import { useRouter } from 'next/router'
import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material'
import { initFirebase } from '../firebase/FirebaseApp'

const pathname = [
  '/home',
  '/notification',
  '/history',
  '/userinfo'
]

const theme = createTheme({
  typography: {
    fontFamily: [
      'kanit',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter()
  initFirebase();

  if (pathname.includes(router.pathname)) {
    return (
      <ThemeProvider theme={theme}>
          <Component {...pageProps} />
          <LabelBottomNavigation />
      </ThemeProvider>
    )
  }
  return <>
    <Component {...pageProps} />
  </>
}

export default MyApp