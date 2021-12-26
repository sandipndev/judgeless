import type { NextPage } from 'next'
import React, { useRef } from "react"
import Image from 'next/image'
import {
  useAuthUser,
  withAuthUser,
  AuthAction,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'
import FullPageLoader from '../components/FullPageLoader'

const Home: NextPage = () => {
  const user = useAuthUser()
  const postTitle = useRef<HTMLInputElement>(null);
  const postBody = useRef<HTMLTextAreaElement>(null);
  const postAnonymously = useRef<HTMLInputElement>(null);

  const createPost = async (e: any) => {
    e.preventDefault();

    const post = { title: postTitle.current?.value, body: postBody.current?.value, anonymous: postAnonymously.current?.checked }

    await fetch("/api/post/create", {
      method: "POST",
      headers: {
        authorization: await user.getIdToken() || "No Auth",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    })
  }

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
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={createPost}>
        <div className="text-xl text-gray-700 mb-1 font-bold">Create Post</div>
        <hr className="mb-6" />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input ref={postTitle} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Title" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="body">
            Body
          </label>
          <textarea ref={postBody} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-20" id="body" placeholder="Body"></textarea>
        </div>
        <div className="md:flex mb-4">
          <label className="md:w-2/3 block text-gray-500 font-bold">
            <input ref={postAnonymously} className="mr-2 leading-tight" type="checkbox" />
            <span className="text-sm">
              Post Anonymously
            </span>
          </label>
        </div>
        <button className="btn" type="submit">Create</button>
      </form>
      <button className="btn" onClick={user.signOut}>Sign out</button>
    </main>
  )
}

export const getServerSideProps = withAuthUserTokenSSR()()

export default withAuthUser({
  LoaderComponent: FullPageLoader,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
})(Home)
