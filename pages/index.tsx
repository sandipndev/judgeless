import { useCallback, useContext, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'

import { getAuth, signInWithRedirect, getRedirectResult, GoogleAuthProvider } from 'firebase/auth'

import Quote from '../components/Quote'
import Logo from "../public/logo-animated.gif"
import { UserContext } from '../context/user'
import { useRouter } from 'next/router'
import FullPageLoader from '../components/FullPageLoader'

const Home: NextPage = () => {
  const router = useRouter();
  const [_, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(getAuth(), provider);
  };

  const setAuthIfAvailable = useCallback(async () => {
    const auth = getAuth();
    const result = await getRedirectResult(auth);
    if (result) {
      setUser(result.user);
      router.replace("/home");
    } else {
      setLoading(false);
    }
  }, [router, setUser, setLoading])

  useEffect(() => {
    setAuthIfAvailable();
  }, [setAuthIfAvailable])

  if (loading) 
    return <FullPageLoader />
  else 
    return (
      <header className="w-screen flex flex-col justify-center items-center space-y-4">
        <Image src={Logo} alt="Logo" />
        <Quote body="Don't be afraid. Be focused. Be determined. Be hopeful. Be empowered." by="Michelle Obama" title="Focus" />
        <button className="btn" onClick={login}>
          Login/Register with Google
        </button>
      </header>
    )
}

export default Home
