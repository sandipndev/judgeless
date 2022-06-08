import type { NextPage } from "next"
import React, { useContext, useRef, useState } from "react"
import { FiSend } from "react-icons/fi"

import { PostsContext } from "../context/posts";
import Loader from "./Loader";

type Post = {
  body: string
  anonymous: boolean
}

type CreatePostProps = {
  className?: string
}

const CreatePost: NextPage<CreatePostProps> = ({ className = "" }) => {
  const [_, setPosts] = useContext(PostsContext);
  const [error, setError] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const postBody = useRef<HTMLTextAreaElement>(null);
  const postAnonymously = useRef<HTMLInputElement>(null);

  const createPost = async (e: any) => {
    e.preventDefault();
    if (!postBody.current || !postAnonymously.current) return;

    const post: Post = {
      body: postBody.current.value,
      anonymous: postAnonymously.current.checked
    }

    postBody.current.value = "";
    postAnonymously.current.checked = false;

    setLoading(true);

    const newPostResponse = await fetch("/api/post/create", {
      method: "POST",
      headers: {
        authorization: "No Auth",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    })

    const json = await newPostResponse.json();

    if (newPostResponse.ok) {
      setError("");
      setPosts(p => [json, ...p]);
    } else {
      setError(json.message);
    }

    setLoading(false);
  }

  return (
    <form className={"bg-white shadow-md rounded-xl px-8 py-6 mb-4 " + className} onSubmit={createPost}>
      <div className="text-xl text-gray-700 mb-1 font-bold">Create Post</div>
      <hr className="mb-6" />
      <div className="mb-2">
        <textarea
          ref={postBody}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-20 ${error && "border-red-500"}`}
          id="body"
          placeholder="What's on your mind..."
        ></textarea>
        {error && <div className="text-sm text-red-500">Post body can&apos;t be empty</div>}
      </div>
      <div className="flex w-full justify-between items-center">
        <label className="md:flex block items-center justify-center text-gray-500 font-bold">
          <input ref={postAnonymously} className="mr-2 leading-tight" type="checkbox" />
          <span className="text-sm">
            Post Anonymously
          </span>
        </label>
        <button className={`btn flex items-center ${loading ? "bg-gray-500 hover:bg-gray-600 cursor-not-allowed" : "cursor-pointer"}`} type="submit" disabled={loading}>
          {loading && <Loader className="text-white" />}
          <FiSend className="mr-2" />
          Post
        </button>
      </div>
    </form>
  )
}

export default CreatePost;
