import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import styled from "styled-components";
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import Post from "../components/Post";
import Trending from "../components/Trending";
import AuthContext from "../contexts/AuthContext";

export default function Hashtag() {
  const [posts, setPosts] = useState([]);
  const [updatePage, setUpdatePage] = useState(false);
  const { hashtag } = useParams();
  //const {userData, setUserData} = useContext(AuthContext);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user_data"))
  );
  const navigate = useNavigate();

  if (!userData) navigate("/");

  useEffect(() => {
    const resultPosts = axios.get(
      process.env.REACT_APP_API_URL + "/posts/hashtag/" + hashtag
    );
    resultPosts.then((res) => setPosts(res.data));
    resultPosts.catch((res) => {
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
    });
  }, [updatePage]);

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
      return <p className="no-posts" data-test="message">There are no posts yet</p>;
    }

    if (posts) {
      return posts.map((post) => {
        return (
          <Post
            key={post.id}
            data={post}
            updatePost={[updatePage, setUpdatePage]}
          />
        );
      });
    }
  }

  if (!userData) {
    return "Loading";
  }

  return (
    <TimelineStyle>
      <Header userData={userData}/>
      <div className="flex-column">
        <PageTitle title={`# ${hashtag}`} dataTest="hashtag-title" />

        <div className="flex-row">
          <main>{showPosts()}</main>

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

  .flex-column {
    display: flex;
    flex-direction: column;
    width: fit-content;

    h1 {
      margin-bottom: 44px;

      @media (max-width: 1000px) {
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
