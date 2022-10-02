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
  const [filter, setFilter] = useState("fresh");

  useEffect(() => {
    const loadData = async () => {
      const posts = await PostListCall(filter);
      if (posts) {
        console.log("posts", posts);
        let editedPosts = posts.map((post) => {
          return { ...post, created: post.created.slice(0, 10) };
        });
        setPosts(editedPosts);
        setError(null);
      } else setError("Wystąpił błąd przy wczytywaniu postów. Odśwież stronę lub spróbuj ponownie później.");
    };
    loadData();
  }, [filter]);

  const handleFilterClick = (endpointName) => {
    setFilter(endpointName);
  };

  return (
    <Layout>
      <Search />
      <Filters onClickFilter={handleFilterClick} />
      {posts &&
        posts.map((post) => (
          <Post
            id={post.id}
            key={post.id}
            author={post.post_author}
            comments={0}
            date={post.created}
            dislikes={post.dislikes}
            image={post.image}
            likes={post.likes}
            title={post.title}
            tags={post.tags}
          />
        ))}
      {error && <ErrorMessage styling={["mt24"]} message={error} />}
    </Layout>
  );
}

export default HomePage;
