import { ReactTagify } from "react-tagify";
import styled from "styled-components";
import LinkPost from "./LinkPost";
import { Link, useNavigate } from "react-router-dom";

export default function Post({ data }) {
  const navigate = useNavigate();

  return (
    <PostStyle data-test="post">
      <div className="post_owner_image">
        <img src={data.picture_user} alt={data.username} />
      </div>

      <div className="post_content">
        <Link to={`/usertimeline/${data.user_id}`} data-test="username">
          {data.username}
        </Link>

        <ReactTagify
          tagStyle={tagStyle}
          tagClicked={(tag) => {
            const hash = tag.slice(1);
            navigate(`/hashtag/${hash}`);
          }}
        >
          <p className="post_description" data-test="description">
            {data.description}
          </p>
        </ReactTagify>

        <LinkPost url={data.url} />
      </div>
    </PostStyle>
  );
}

const PostStyle = styled.div`
  display: flex;
  align-items: stretch;

  width: 610px;
  padding: 18px;
  margin-bottom: 16px;

  border-radius: 16px;
  background-color: #171717;

  * {
    font-family: "Lato", sans-serif;
  }

  .post_owner_image {
    margin-right: 18px;

    img {
      width: 50px;
      height: 50px;

      border-radius: 100%;
    }
  }
  .post_content {
    width: 100%;

    & > a:first-child {
      font-size: 19px;
      line-height: 23px;
      color: white;
      text-decoration: none;
    }

    .post_description {
      font-size: 17px;
      line-height: 21px;
      color: #b7b7b7;
      margin-top: 7px;
      margin-bottom: 10px;
    }
  }

  @media (max-width: 1000px) {
    width: 100%;
    border-radius: 0;

    .post_content {
      width: 100%;

      & > a:first-child {
        font-size: 17px;
        line-height: 20px;
      }

      .post_description {
        font-size: 15px;
        line-height: 18px;
      }
    }
  }
`;

const tagStyle = {
  fontWeight: 700,
  color: "white",
  cursor: "pointer",
};
