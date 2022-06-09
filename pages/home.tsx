import type { NextPage } from 'next'
import { useContext, useEffect } from 'react'

import CreatePost from '../components/CreatePost'
import ProfileHeader from '../components/ProfileHeader'
import Posts from '../components/Posts'
import PostsContextProvider from '../context/posts'
import { UserContext } from '../context/user'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router = useRouter();
  const [user, _] = useContext(UserContext);

  useEffect(() => {
    if (!user) router.replace("/");
  }, [user])

  return (
    <div className="relative">
      <ProfileHeader />
      <main className="pt-20 px-8 md:grid grid-cols-5">
        <div className="col-start-2 col-span-2">
          <PostsContextProvider>
            <CreatePost />
            <div className="text-white font-mono font-bold text-xl">Posts</div>
            <Posts />
          </PostsContextProvider>
        </div>
        <div className="col-start-5">
          {/* Therapists */}
        </div>
      </main>
    </div>
  )
}

export default Home
