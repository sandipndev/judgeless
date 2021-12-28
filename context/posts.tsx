import type { NextPage } from "next";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { PostProps } from "../components/Post";

type PostsContextType = [
  posts: PostProps[],
  setPosts: Dispatch<SetStateAction<PostProps[]>>,
]

export const PostsContext = createContext<PostsContextType>([[], () => []]);

const PostsContextProvider: NextPage = ({ children }) => {
  const [posts, setPosts] = useState<PostProps[]>([]);

  return (
    <PostsContext.Provider value={[posts, setPosts]}>
      {children}
    </PostsContext.Provider>
  )
};

export default PostsContextProvider
