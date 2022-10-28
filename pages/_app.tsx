import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'components/navbar'
import LabelBottomNavigation from '../components/navbar'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
  <Component {...pageProps} />
  <div>
    <LabelBottomNavigation/>
  </div>
  </>
}

export default MyApp