import type { NextPage } from 'next'
import Image from 'next/image'
import { withAuthUser, AuthAction } from 'next-firebase-auth'

import firebase from 'firebase/app'
import 'firebase/auth'

import Quote from '../components/Quote'
import Logo from "../public/logo-animated.gif"

const Home: NextPage = () => {
  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithRedirect(provider)
  };

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

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(Home)
