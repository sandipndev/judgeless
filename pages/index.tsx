import type { NextPage } from 'next'
import Image from 'next/image'
import Logo from "../public/logo-animated.gif"

const Home: NextPage = () => {
  return <>
    <header className="min-w-screen min-h-screen bg-gray-200 flex flex-col space-y-8 items-center justify-center px-5 py-5">
      <Image src={Logo} alt="Logo" />
      <div className="w-full mx-auto rounded-lg bg-white shadow-lg px-5 pt-5 pb-10 text-gray-800" style={{ maxWidth: "500px" }}>
        <div className="w-full mb-10">
          <div className="text-3xl text-indigo-500 text-left leading-tight h-3">“</div>
          <p className="text-sm text-gray-600 text-center px-5">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam obcaecati laudantium recusandae, debitis eum voluptatem ad, illo voluptatibus temporibus odio provident.</p>
          <div className="text-3xl text-indigo-500 text-right leading-tight h-3 -mt-3">”</div>
        </div>
        <div className="w-full">
          <p className="text-md text-indigo-500 font-bold text-center">Inspirational Quote</p>
          <p className="text-xs text-gray-500 text-center">Nick Jonas</p>
        </div>
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Login/Register with Google</button>
    </header>
  </>
}

export default Home
