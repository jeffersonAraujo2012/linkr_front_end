import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import styled from "styled-components";
import Header from "../components/Header";
import Post from "../components/Post";
import Trending from "../components/Trending";
import AuthContext from "../contexts/AuthContext";
import FollowersContext from "../contexts/FollowersContext";
import IsFollowingContext from "../contexts/IsFollowingContext";
import UpdateUserPage from "../contexts/UpdateUserPage";

export default function UserTimeline() {
  const { id } = useParams();
  const [posts, setPosts] = useState(undefined);
  const [disable, setDisable] = useState(false);
  const [isFollowing, setIsFollowing] = useContext(IsFollowingContext);
  const [followers, setFollowers] = useContext(FollowersContext);
  const [updateUserPage, setUpdateUserPage] = useContext(UpdateUserPage);
  const { userData, setUserData } = useContext(AuthContext);
  const navigate = useNavigate();
  let userPicture = "";
  let userName = "";
  let configHeaders;

  console.log(userData);
  useEffect(() => {

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
    
    followers?.map((f) => {
      if (f.followed_id == id) setIsFollowing(true);
    })

  }, [updateUserPage, userData, followers]);

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
      return <p className="no-posts" data-test="message">There are no posts yet</p>;
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

  function followUser() {
    setDisable(true);
    axios.post(`${process.env.REACT_APP_API_URL}/follows`, {
      followerId: userData.id,
      followedId: id
    }).then((res) => {
      setDisable(false)
      setIsFollowing(true)
    }).catch((error) => {
      setDisable(false)
      alert(error.response.message);
    })
  }

  function unFollowUser() {
    setDisable(true);
    axios.delete(`${process.env.REACT_APP_API_URL}/follows/${userData.id}/${id}`)
      .then((res) => {
        setDisable(false)
        setIsFollowing(false)
      }).catch((error) => {
        console.log(error)
        setDisable(false)
        alert(error.response.message);
      })
  }

  if (posts === undefined) return <></>;

  return (
    <TimelineStyle>
      <Header />
      <div className="flex-column">
        <ContainerTittle>
          <TitleStyle>
            <img src={posts[0].picture_user} />
            <p>{posts[0].username}'s posts </p>
          </TitleStyle>
          {userData.id == id ? <></> : isFollowing ?
            <UnfollowButton data-test="follow-btn" disabled={disable} onClick={unFollowUser}>Unfollow</UnfollowButton> :
            <FollowButton data-test="follow-btn" disabled={disable} onClick={followUser}>Follow</FollowButton>}
          {/* <FollowButton disabled={disable} onClick={followUser}>Follow</FollowButton> */}
          {/* <UnfollowButton>Unfollow</UnfollowButton> */}
        </ContainerTittle>

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
    margin-top: 20px;
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

const ContainerTittle = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  button{
    font-size: 14px;
    font-weight: 700;
    width: 112px;
    height: 31px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    :hover{
      box-shadow: rgba(0, 0, 0, .15) 0 3px 9px 0;
      transform: translateY(-1px);
    }    
    :active{
      box-shadow: rgba(0, 0, 0, .125) 0 3px 5px inset;
      outline: 0;
      transform: translateY(1px);
    }
    :disabled{
      cursor: default;
      background-color: grey;
    }
    @media (max-width: 1000px) {
      position: absolute;
      bottom: -30px;
      right: 0;
      width: 80px;
    }
  }
`

const TitleStyle = styled.div`
  display: flex;
  align-items: center;
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

const FollowButton = styled.button`
  color: #FFFFFF;
  background-color: #1877F2;
`

const UnfollowButton = styled.button`
  color: #1877F2;
  background-color: #FFFFFF;
`