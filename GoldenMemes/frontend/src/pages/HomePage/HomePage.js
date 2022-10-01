import React, { useEffect, useState } from "react";
//import styles from "./HomePage.module.scss";
import Layout from "../../components/layoutContainers/Layout";
import Search from "./Search";
import Filters from "./Filters";
import Post from "../../components/Post";
import { PostListCall } from "../../api/apiCalls";
import ErrorMessage from "../../components/ErrorMessage";

function HomePage() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const posts = await PostListCall();
      if (posts) {
        console.log("posts", posts);
        let editedPosts = posts.map((post) => {
          return { ...post, created: post.created.slice(0, 10) };
        });
        setPosts(editedPosts);
      } else setError("Wystąpił błąd przy wczytywaniu postów. Spróbuj ponownie później.");
    };
    loadData();
  }, []);

  return (
    <Layout>
      <Search />
      <Filters />
      {posts &&
        posts.map((post) => (
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
        ))}
      {error && <ErrorMessage message={error} />}
    </Layout>
  );
}

export default HomePage;
