import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UpdateHashtagContext from "../contexts/UpdataHashtagContext";

export default function Trending() {
  const [hashtags, setHashtags] = useState([]);
  const [updataHashtags] = useContext(UpdateHashtagContext);

  useEffect(() => {
    const promiseHashtags = axios.get(
      process.env.REACT_APP_API_URL + "/hashtags"
    );
    promiseHashtags.then((res) => {
      setHashtags(res.data);
    });
  }, [updataHashtags]);

  return (
    <TrandingStyle data-test="trending">
      <h2>trending</h2>
      <div className="divider" />
      {hashtags.map((hashtag) => {
        return (
          <Link
            key={hashtag.name}
            to={`/hashtag/${hashtag.name}`}
            data-test="hashtag"
          >
            {"#" + hashtag.name}
          </Link>
        );
      })}
    </TrandingStyle>
  );
}

const TrandingStyle = styled.div`
  width: 300px;
  padding: 8px 16px 30px;

  background-color: #171717;
  border-radius: 16px;

  h2 {
    font-family: "Oswald", sans-serif;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: white;

    margin-bottom: 12px;
  }

  .divider {
    margin-left: -16px;
    margin-right: -16px;
    margin-bottom: 22px;
    width: 300px;
    height: 1px;

    background-color: #484848;
  }

  & > a {
    display: block;
    font-family: "Lato", sans-serif;
    font-weight: 700;
    font-size: 19px;
    line-height: 23px;
    color: white;

    text-decoration: none;
    margin-bottom: 12px;
  }
`;
