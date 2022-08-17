import React from "react";
//import styles from "./HomePage.module.scss";
import Layout from "../../components/layoutContainers/Layout";
import Search from "./Search";
import Filters from "./Filters";
import Post from "../../components/Post";

function HomePage() {
  return (
    <Layout>
      <Search />
      <Filters />
      <Post data={post_data} />
    </Layout>
  );
}

export default HomePage;

const post_data = {
  author: "Anonim",
  comments: 21,
  date: "52 minut temu",
  dislikes: 26,
  likes: 94,
  title: "Ale się zesrał :o",
};
