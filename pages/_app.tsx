import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'components/navbar'
import LabelBottomNavigation from '../components/navbar'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  if (router.pathname == '/home' || router.pathname == '/notification' || router.pathname == '/history' || router.pathname == '/account') {
    return (
      <div>
        <Component {...pageProps}/>
        <LabelBottomNavigation />
      </div>
    )
  }
  return <>
  <Component {...pageProps} />
  </>
}

export default MyApp