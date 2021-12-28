import type { NextPage } from "next"
import { useEffect, useState } from "react"
import Image from "next/image"
import moment from "moment"
import { FaEllipsisV } from "react-icons/fa"

export type PostProps = {
  id: string
  body: string
  anonymous: boolean
  createdAt: Date
  author?: {
    displayName: string
    photoURL: string
  }
}

const getTimeElapsed = (createdAt: Date) => {
  const days = moment().diff(moment(createdAt), 'days')
  const hours = moment().diff(moment(createdAt), 'hours')
  const minutes = moment().diff(moment(createdAt), 'minutes')

  if (days > 0) return days + "d"
  if (hours > 0) return hours + "h"
  if (minutes > 2) return minutes + "m"
  return "Now"
}

const Post: NextPage<PostProps> = (post) => {
  const [timeElapsed, setTimeElapsed] = useState<string>(getTimeElapsed(post.createdAt));

  useEffect(() => {
    const i = setInterval(() =>
      setTimeElapsed(getTimeElapsed(post.createdAt)),
      1000 * 60
    );
    return () => clearInterval(i);
  }, [post, setTimeElapsed])

  return (
    <article className="w-full shadow h-auto bg-white my-2 rounded-xl pb-2">
      <div className="flex items-center space-x-2 p-3 px-4">
        <div className="w-10 h-10">
          <Image height="80" width="80" src={post.author?.photoURL || "/anonymous.jpg"} className="rounded-full" alt="dp" />
        </div>
        <div className="flex-grow flex flex-col">
          <div className="text-gray-500 font-semibold">
            <p>{post.author?.displayName || "Anonymous"}</p>
          </div>
          <span className="text-xs text-gray-400">{timeElapsed}</span>
        </div>
        <div className="w-8 h-8">
          <button className="w-full h-full hover:bg-gray-100 rounded-full text-gray-400 focus:outline-none flex items-center justify-center">
            <FaEllipsisV />
          </button>
        </div>
      </div>
      <div className="text-gray-500 px-3">{post.body}</div>
    </article>
  )
}

export default Post
