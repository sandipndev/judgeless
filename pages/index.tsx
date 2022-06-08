import Slider from "react-slick";
import type { NextPage } from 'next'
import Image from 'next/image'
import { withAuthUser, AuthAction, withAuthUserTokenSSR } from 'next-firebase-auth'

import firebase from 'firebase/app'
import 'firebase/auth'

import Quote from '../components/Quote'
import FullPageLoader from '../components/FullPageLoader'
import Logo from "../public/logo-animated.gif"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const Home: NextPage = () => {
  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithRedirect(provider)
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoPlaySpeed: 1000,
  };

  return (
    <header className="w-screen flex flex-col justify-center items-center space-y-4">
      <Image src={Logo} alt="Logo" />
      <div className="text-white w-5/6 sm:w-1/2">
        <Slider className="text-white w-full" {...settings}>
          <Quote body="Don't be afraid. Be focused. Be determined. Be hopeful. Be empowered." by="Michelle Obama" title="Focus" />
          <Quote body="We should not give up and we should not allow the problem to defeat us." by="A. P. J. Abdul Kalam" title="Motivation" />
          <Quote body="A life spent making mistakes is not only more honorable, but more useful than a life spent doing nothing." by="John Keats" title="Mistakes" />
        </Slider>
      </div>
      <button className="btn" onClick={login}>
        Login/Register with Google
      </button>
    </header>
  )
}

export const getServerSideProps = withAuthUserTokenSSR()()

export default withAuthUser({
  LoaderComponent: FullPageLoader,
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(Home)
