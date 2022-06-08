import type { NextPage } from 'next'

import FullPageLoader from '../components/FullPageLoader'
import CreatePost from '../components/CreatePost'
import ProfileHeader from '../components/ProfileHeader'
import Posts from '../components/Posts'
import PostsContextProvider from '../context/posts'

const Home: NextPage = () => {

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
