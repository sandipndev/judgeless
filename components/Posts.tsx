import type { NextPage } from "next"
import { useCallback, useContext, useEffect } from "react"

import { PostsContext } from "../context/posts";
import { UserContext } from "../context/user";
import type { PostProps } from "./Post";
import Post from "./Post";

type PostsProps = {
  addPost?: (post: PostProps) => void
}

const Posts: NextPage<PostsProps> = () => {
  const [user, _] = useContext(UserContext);
  const [posts, setPosts] = useContext(PostsContext);

  const getAndSetPosts = useCallback(async () => {
    const p = await fetch("/api/post/list?all=1", {
      headers: {
        authorization: await user!.getIdToken(),
      }
    }).then(r => r.json());
    setPosts(p);
  }, [user, setPosts]);

  useEffect(() => {
    if (user) getAndSetPosts()
    const i = setInterval(() => getAndSetPosts(), 5000);
    return () => clearInterval(i);
  }, [user, getAndSetPosts]);

  return (
    <>
      {posts.map(p => <Post key={p.id} {...p} />)}
    </>
  )
}

export default Posts
