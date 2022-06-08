import type { AppProps } from 'next/app'
import '../styles/globals.css'
import initAuth from "../utils/initAuth";


initAuth();

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
