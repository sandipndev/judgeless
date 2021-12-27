import type { NextPage } from "next"
import React, { useRef, useState } from "react"
import { useAuthUser } from "next-firebase-auth";
import Loader from "./Loader";

type Post = {
  title: string
  body: string
  anonymous: boolean
}

type CreatePostProps = {
  onCreate?: (post: Post) => Promise<void> | void
}

const CreatePost: NextPage<CreatePostProps> = ({ onCreate = () => { } }) => {
  const user = useAuthUser();
  const [loading, setLoading] = useState<boolean>(false);

  const postTitle = useRef<HTMLInputElement>(null);
  const postBody = useRef<HTMLTextAreaElement>(null);
  const postAnonymously = useRef<HTMLInputElement>(null);

  const createPost = async (e: any) => {
    e.preventDefault();
    if (!postTitle.current || !postBody.current || !postAnonymously.current) return;

    const post: Post = { title: postTitle.current.value, body: postBody.current.value, anonymous: postAnonymously.current.checked }

    postTitle.current.value = "";
    postBody.current.value = "";
    postAnonymously.current.checked = false;

    setLoading(true);

    await fetch("/api/post/create", {
      method: "POST",
      headers: {
        authorization: await user.getIdToken() || "No Auth",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    })

    await onCreate(post);

    setLoading(false);
  }

  return (
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
      <button className={`btn flex items-center ${loading ? "bg-gray-500 hover:bg-gray-600 cursor-not-allowed" : "cursor-pointer"}`} type="submit" disabled={loading}>
        {loading && <Loader className="text-white" />}
        Create
      </button>
    </form>
  )
}

export default CreatePost;
