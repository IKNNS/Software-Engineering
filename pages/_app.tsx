import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'components/navbar'
import LabelBottomNavigation from '../components/navbar'

function MyApp({ Component, pageProps }: AppProps) {
  console.log("Navbar Test")
  return <>
  <Component {...pageProps} />
  <div> 
    <LabelBottomNavigation/>
  </div>
  </>
}

export default MyApp