import type { AppProps } from 'next/app'
import '../styles/globals.css'

import { initializeApp } from 'firebase/app';
import UserContextProvider from '../context/user';

function MyApp({ Component, pageProps }: AppProps) {
  initializeApp({
    apiKey: "AIzaSyBzvvZybZodHygtxyOPy-6eVnZye9HCN7g",
    authDomain: "judgeless.firebaseapp.com",
    projectId: "judgeless",
    storageBucket: "judgeless.appspot.com",
    messagingSenderId: "332078085109",
    appId: "1:332078085109:web:f5bf149e4217eec70766bc"
  })

  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  );
}

export default MyApp
