import type { NextPage } from 'next'
import Image from 'next/image'
import {
  useAuthUser,
  withAuthUser,
  AuthAction,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'

import FullPageLoader from '../components/FullPageLoader'
import CreatePost from '../components/CreatePost'

const Home: NextPage = () => {
  const user = useAuthUser()

  return (
    <main className="w-screen flex flex-col justify-center items-center space-y-4 text-white">
      <div className="my-4">Logged In as {user.displayName}</div>
      {user.photoURL && <Image className="rounded-full" height="100" width="100" src={user.photoURL} alt={user.displayName + "'s photo"} />}
      <pre className="max-w-sm mb-4">
        <div>ID: {user.id}</div>
        <div>Name: {user.displayName}</div>
        <div>Email: {user.email}</div>
        <div>Phone: {user.phoneNumber || "Not available"}</div>
      </pre>
      <button className="btn" onClick={user.signOut}>Sign out</button>
      <CreatePost />
    </main>
  )
}

export const getServerSideProps = withAuthUserTokenSSR()()

export default withAuthUser({
  LoaderComponent: FullPageLoader,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
})(Home)
