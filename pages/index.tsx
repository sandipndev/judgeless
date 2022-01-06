import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import type { NextPage } from 'next'
import Image from 'next/image'
import { withAuthUser, AuthAction, withAuthUserTokenSSR } from 'next-firebase-auth'

import firebase from 'firebase/app'
import 'firebase/auth'

import Quote from '../components/Quote'
import FullPageLoader from '../components/FullPageLoader'
import Logo from "../public/logo-animated.gif"

const Home: NextPage = () => {
  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithRedirect(provider)
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };

  return (
    <header className="w-screen flex flex-col justify-center items-center space-y-4">
      <Image src={Logo} alt="Logo" />
      <div className="text-white inline-block">
        <h2> Single Item</h2>
        <Slider {...settings}>
          <div>
            <h3 className="text-white">1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
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
