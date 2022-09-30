import React from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/layoutContainers/Layout";
import Post from "../../components/Post";

function PostPage() {
  const location = useLocation();
  const post = location.state;
  console.log("state location", location.state);

  return (
    <Layout>
      {console.log("post.id", post.id)}
      <Post
        id={post.id}
        key={post.id}
        author={post.post_author}
        comments={0}
        date={post.created}
        dislikes={post.dis_likes}
        image={post.image}
        likes={post.likes}
        title={post.title}
      />
    </Layout>
  );
}

export default PostPage;
