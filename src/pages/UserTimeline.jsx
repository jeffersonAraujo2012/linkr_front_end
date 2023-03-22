import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import styled from "styled-components";
import Header from "../components/Header";
import Post from "../components/Post";
import Trending from "../components/Trending";
import AuthContext from "../contexts/AuthContext";
import UpdateUserPage from "../contexts/UpdateUserPage";

export default function UserTimeline() {
  const { id } = useParams();
  const [posts, setPosts] = useState(undefined);
  const [updateUserPage, setUpdateUserPage] = useContext(UpdateUserPage);
  let userPicture = "";
  let userName = "";
  const { userData, setUserData } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    let configHeaders;

    const token = localStorage.getItem("access_token");
    function isNotLogged() {
      alert("You should be logged!");
      navigate("/");
    }

    if (!token) {
      isNotLogged();
    } else {
      configHeaders = {
        headers: {
          authorization: "Bearer " + token,
        },
      };

      const resultMe = axios.get(
        process.env.REACT_APP_API_URL + "/users/me",
        configHeaders
      );
      resultMe.then((res) => {
        if (JSON.stringify(userData) !== JSON.stringify(res.data)) {
          setUserData(res.data);
        }
      });
      resultMe.catch((_) => {
        localStorage.removeItem("access_token");
        isNotLogged();
      });
    }

    const resultPosts = axios.get(
      `${process.env.REACT_APP_API_URL}/user/${id}`,
      configHeaders
    );
    resultPosts.then((res) => setPosts(res.data));
    resultPosts.catch((err) => {
      alert(err.response.data);
    });
  }, [updateUserPage, userData]);

  function showPosts() {
    if (!posts) {
      return (
        <div className="loading">
          <p>Loading</p>
          <PulseLoader color="white" />
        </div>
      );
    }

    if (posts[0].url === null) {
      return <p className="no-posts">There are no posts yet</p>;
    }

    if (posts) {
      userPicture = posts[0].picture_user;
      userName = posts[0].username;
      return posts.map((post) => {
        return (
          <Post
            key={post.id}
            data={post}
            updatePost={[updateUserPage, setUpdateUserPage]}
          />
        );
      });
    }
  }

  if (posts === undefined) return <></>;

  return (
    <TimelineStyle>
      <Header />
      <div className="flex-column">
        <TitleStyle>
          <img src={posts[0].picture_user} />
          <p>{posts[0].username}'s posts </p>
        </TitleStyle>
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

  @media (max-width: 1000px) {
    margin-top: 135px;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
    width: fit-content;

    h1 {
      margin-bottom: 44px;
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

const TitleStyle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  p {
    font-family: "Oswald", sans-serif;
    font-size: 43px;
    line-height: 64px;
    color: white;
    font-weight: 700;
    margin-left: 18px;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
  }

  @media (max-width: 1000px) {
    margin-left: 16px;
  }
`;
