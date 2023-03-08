import axios from "axios";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import styled from "styled-components";
import PageTitle from "../components/PageTitle";
import Post from "../components/Post";
import SendPostForm from "../components/SendPostForm";

export default function Timeline() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const resultPosts = axios.get("http://localhost:5000/posts");
    resultPosts.then((res) => setPosts(res.data));
  });

  function showPosts() {
    if (!posts) {
      return (
        <div className="loading">
          <p>Loading</p>
          <PulseLoader color="white" />
        </div>
      );
    }

    if (posts?.length === 0) {
      return <p className="no-posts">There are no posts yet</p>;
    }

    if (posts) {
      return posts.map((post) => {
        return <Post key={post.id} data={post} />;
      });
    }
  }

  return (
    <TimelineStyle>
      <main>
        <PageTitle title="timeline" />

        <SendPostForm />

        {showPosts()}
      </main>
    </TimelineStyle>
  );
}

const TimelineStyle = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  min-height: 100vh;
  padding-top: 78px;

  main > h1 {
    margin-bottom: 44px;
  }

  .no-posts {
    width: 610px;
    font-family: "Lato", sans-serif;
    font-size: 30px;
    color: white;
  }

  .loading {
    display: flex;
    flex-direction: column;
    justify-content: center;

    width: 610px;
    margin-top: auto;

    p {
      font-family: "Lato", sans-serif;
      font-size: 23px;
      line-height: 26px;
      margin-bottom: 7px;

      color: white;
    }
  }
`;
