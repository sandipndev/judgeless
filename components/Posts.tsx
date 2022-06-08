import type { NextPage } from "next"
import { useCallback, useContext, useEffect } from "react"

import { PostsContext } from "../context/posts";
import type { PostProps } from "./Post";
import Post from "./Post";

type PostsProps = {
  addPost?: (post: PostProps) => void
}

const Posts: NextPage<PostsProps> = () => {
  const [posts, setPosts] = useContext(PostsContext);

  const getAndSetPosts = useCallback(async () => {
    const p = await fetch("/api/post/list", {
      headers: {
        authorization: "No Auth",
      }
    }).then(r => r.json());
    setPosts(p);
  }, [setPosts]);

  useEffect(() => { getAndSetPosts() }, [getAndSetPosts]);

  return (
    <>
      {posts.map(p => <Post key={p.id} {...p} />)}
    </>
  )
}

export default Posts
