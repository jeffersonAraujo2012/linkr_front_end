import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import Post from "../components/Post";
import SendPostForm from "../components/SendPostForm";
import Trending from "../components/Trending";
import FollowersContext from "../contexts/FollowersContext";

export default function HashtagTest() {
  const { hashtag } = useParams();
  const [posts, setPosts] = useState([]);
  const [update, setUpdate] = useState(false);
  const [followeds, setFolloweds] = useState([]);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user_data"))
  );
  //const { userData, setUserData } = useContext(AuthContext);
  const [followers, setFollowers] = useContext(FollowersContext);
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
  }, [update]);

  return (
    <TimelineStyle>
      <Header userData={userData} />

      <div className="flex-column">
        <PageTitle title={`# ${hashtag}`} dataTest="hashtag-title" />

        <div className="flex-row">
          <main>
            {posts.length > 0 &&
              posts.map((post) => (
                <Post
                  key={post.id}
                  data={post}
                  updatePost={[update, setUpdate]}
                />
              ))}
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
    margin-bottom: 16px;
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
