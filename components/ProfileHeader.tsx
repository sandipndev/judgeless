import type { NextPage } from "next"
import Image from 'next/image'
import { useState } from "react"
import { useAuthUser } from "next-firebase-auth"

import Logo from "../public/logo-animated.gif"

const ProfileHeader: NextPage = () => {
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
  const user = useAuthUser()

  return (
    <>
      <header
        className="flex flex-row items-center justify-center md:justify-between px-4 fixed w-screen z-10"
        style={{ backgroundColor: "#1f1b1c" }}
      >
        <Image height="80" width="300" src={Logo} alt="Judgeless Logo" />
        <button onClick={() => setShowProfileMenu(s => !s)} className="hidden md:flex h-10 px-2 space-x-1 items-center justify-center focus:outline-none bg-white hover:bg-gray-300 cursor-pointer rounded-full mr-8">
          {user.photoURL && <Image className="rounded-full" height="30" width="30" src={user.photoURL} alt={user.displayName + "'s photo"} />}
          <p className="font-semibold text-sm">{user.displayName}</p>
        </button>
        <div className="md:hidden absolute right-4">
          {user.photoURL && <Image className="rounded-full" height="35" width="35" src={user.photoURL} alt={user.displayName + "'s photo"} />}
        </div>
        {showProfileMenu &&
          <div className="absolute right-4 md:right-12 top-16">
            <button className="btn" onClick={user.signOut}>Sign out</button>
          </div>
        }
      </header>
    </>
  )
}

export default ProfileHeader
