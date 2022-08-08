import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { __getPosts } from "../../redux/modules/posts";
import Post from "./Post"


const PostsLayout = (props) => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.posts.isLoading);
  const error = useSelector((state) => state.posts.error);
  // const success = useSelector((state) => state.posts.success);
  const allPosts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    dispatch(__getPosts());
  }, [dispatch]);

  const posts = allPosts.map((post) => (
    <Post
      key={post.id}
      id={post.id}
      username={post.username}
      title={post.title}
    />
  ))
  return (
    <>
      PostLayout
      {isLoading ? <div>In Loading...</div> : null}
      {error ? <div>{error.messages}</div> : null}
      {!isLoading && !error ? posts : null}
    </>
  );
};

export default PostsLayout;
