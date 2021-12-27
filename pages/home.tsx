import type { NextPage } from 'next'
import { withAuthUser, AuthAction } from 'next-firebase-auth'

import FullPageLoader from '../components/FullPageLoader'
import CreatePost from '../components/CreatePost'
import ProfileHeader from '../components/ProfileHeader'

const Home: NextPage = () => {

  return (
    <div className="relative">
      <ProfileHeader />
      <main className="pt-20 px-8 md:grid grid-cols-5">
        <div className="col-start-2 col-span-2">
          <CreatePost />
        </div>
        <div className="col-start-5">
          {/* Therapists */}
        </div>
      </main>
    </div>
  )
}

export default withAuthUser({
  LoaderComponent: FullPageLoader,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
})(Home)
