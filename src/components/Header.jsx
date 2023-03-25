import SearchBar from "./SearchBar";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import FollowersContext from "../contexts/FollowersContext";
import axios from "axios";
import IsFollowingContext from "../contexts/IsFollowingContext";

export default function Header() {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user_data"))
  );
  const [followers, setFollowers] = useContext(FollowersContext);
  const [isFollowing] = useContext(IsFollowingContext);

  useEffect(() => {
    if (userData === undefined) return;
    axios
      .get(`${process.env.REACT_APP_API_URL}/follows/${userData.id}`)
      .then((res) => {
        setFollowers(res.data);
      })
      .catch((err) => console.log(err.response.data));
  }, [isFollowing]);

  return (
    <ContainerHeader>
      <Link to={"/timeline"}>
        <h1>linkr</h1>
      </Link>
      <SearchBar />

      <ContainerLogout>
        <div
          className="wrapper"
          onClick={() => {
            if (showLogout) setShowLogout(false);
            else setShowLogout(true);
          }}
        >
          {showLogout ? <IoIosArrowUp /> : <IoIosArrowDown />}
          <img src={userData.picture_url} data-test="avatar" />
        </div>
        <LogOutBar data-test="menu" showLogout={showLogout}>
          <p
            data-test="logout"
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            Logout
          </p>
        </LogOutBar>
      </ContainerLogout>
    </ContainerHeader>
  );
}

const ContainerHeader = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
  background-color: #151515;
  height: 72px;
  z-index: 3;
  h1 {
    color: #ffffff;
    font-size: 48px;
    font-family: "Passion One", cursive;
  }
`;

const ContainerLogout = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  svg {
    color: #ffffff;
    font-size: 25px;
    margin-right: 15px;
    cursor: pointer;
  }
  img {
    width: 49px;
    height: 49px;
    border-radius: 50px;
  }
  & > .wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;

const LogOutBar = styled.div`
  display: ${(props) => (props.showLogout ? "flex" : "none")};
  align-items: flex-start;
  justify-content: center;
  position: fixed;
  top: 72px;
  right: 0;
  border-radius: 0 0 0 20px;
  background-color: #171717;
  width: 130px;
  height: 47px;
  padding-top: 10px;
  z-index: 3;
  cursor: pointer;
  p {
    font-family: Lato, sans-serif;
    font-weight: 700;
    font-size: 17px;
    color: #ffffff;
    @media (max-width: 900px) {
      font-size: 15px;
    }
  }
`;
