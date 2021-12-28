import type { NextPage } from "next"
import { useAuthUser } from "next-firebase-auth";
import { useCallback, useContext, useEffect } from "react"

import { PostsContext } from "../context/posts";
import type { PostProps } from "./Post";
import Post from "./Post";

type PostsProps = {
  addPost?: (post: PostProps) => void
}

const Posts: NextPage<PostsProps> = () => {
  const [posts, setPosts] = useContext(PostsContext);
  const user = useAuthUser();

  const getAndSetPosts = useCallback(async () => {
    const p = await fetch("/api/post/list", {
      headers: {
        authorization: await user.getIdToken() || "No Auth",
      }
    }).then(r => r.json());
    setPosts(p);
  }, [user, setPosts]);

  useEffect(() => { getAndSetPosts() }, [getAndSetPosts]);

  return (
    <>
      {posts.map(p => <Post key={p.id} {...p} />)}
    </>
  )
}

export default Posts
