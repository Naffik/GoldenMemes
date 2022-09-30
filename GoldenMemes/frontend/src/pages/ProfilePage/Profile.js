import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/layoutContainers/Layout";

function Profile() {
  let { user } = useParams();
  console.log("user", user);
  return (
    <Layout>
      <p>{user}'s profile</p>
    </Layout>
  );
}

export default Profile;
