import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'components/navbar'
import LabelBottomNavigation from '../components/navbar'
import { useRouter } from 'next/router'

const pathname = [
  '/home',
  '/',
  '/history',
  '/account'
]

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  if (pathname.includes(router.pathname)) {
    return (
      <div>
        <Component {...pageProps} />
        <LabelBottomNavigation />
      </div>
    )
  }
  return <>
  <Component {...pageProps} />
  </>
}

export default MyApp