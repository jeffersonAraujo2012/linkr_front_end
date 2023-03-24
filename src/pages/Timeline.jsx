import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import styled from "styled-components";
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import Post from "../components/Post";
import SendPostForm from "../components/SendPostForm";
import Trending from "../components/Trending";
import AuthContext from "../contexts/AuthContext";
import FollowersContext from "../contexts/FollowersContext";

export default function Timeline() {
  const [posts, setPosts] = useState([]);
  const [update, setUpdate] = useState(false);
  const { userData, setUserData } = useContext(AuthContext);
  const [followers, setFollowers] = useContext(FollowersContext);
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");
  console.log(token);
  if (token) {
    const resultMe = axios.get(process.env.REACT_APP_API_URL + "/users/me", {
      headers: {
        authorization: 'Bearer ' + token,
      },
    });
    resultMe.then((res) => {
      if (JSON.stringify(userData) !== JSON.stringify(res.data)) {
        setUserData(res.data);
      }
    });
    resultMe.catch((_) => navigate("/"));
  } else {
    navigate("/");
  }

  useEffect(() => {
    const resultPosts = axios.get(
      process.env.REACT_APP_API_URL + `/posts/${userData?.id}`
    );
    resultPosts.then((res) => setPosts(res.data));
    resultPosts.catch((res) => {
      console.log(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
    });
  }, [update, userData]);

  if (!userData) {
    return "Loading";
  }

  function showPosts() {
    if (!posts) {
      return (
        <div className="loading">
          <p>Loading</p>
          <PulseLoader color="white" />
        </div>
      );
    }

    if (followers?.length === 0)
      return (
        <p data-test="message" className="no-posts">
          You don't follow anyone yet.
          <br />
          Search for new friends!
        </p>
      );

    if (posts?.length === 0) {
      return (
        <p data-test="message" className="no-posts">
          No posts found from your friends
        </p>
      );
    }

    if (posts) {
      return posts.map((post) => {
        return (
          <Post
            key={post.id}
            data={post}
            updatePost={[update, setUpdate]}
            user={userData}
          />
        );
      });
    }
  }

  return (
    <TimelineStyle>
      <Header />

      <div className="flex-column">
        <PageTitle title="timeline" />

        <div className="flex-row">
          <main>
            <SendPostForm updatePost={[update, setUpdate]} />

            {showPosts()}
          </main>

          <aside>
            <Trending />
          </aside>
        </div>
      </div>
    </TimelineStyle>
  );
}

const TimelineStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-height: 100vh;
  padding-top: 132px;
  @media (max-width: 1000px) {
    margin-top: 50px;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
    width: fit-content;

    h1 {
      margin-bottom: 44px;

      @media (max-width: 1000px) {
        margin-bottom: 20px;
        margin-left: 16px;
      }
    }

    @media (max-width: 1000px) {
      width: 100%;
    }
  }

  .flex-row {
    width: fit-content;
    display: flex;
    justify-content: center;

    @media (max-width: 1000px) {
      &,
      & main {
        width: 100%;
      }
    }
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

  aside {
    margin-left: 24px;

    @media (max-width: 1000px) {
      display: none;
    }
  }
`;
