import { ReactTagify } from "react-tagify";
import styled from "styled-components";
import LinkPost from "./LinkPost";
import { useNavigate } from "react-router-dom";

export default function Post({ data }) {
  const navigate = useNavigate();

  return (
    <PostStyle>
      <div className="post_owner_image">
        <img src={data.picture_user} alt={data.username} />
      </div>

      <div className="post_content">
        <p>{data.username}</p>

        <ReactTagify
          tagStyle={tagStyle}
          tagClicked={(tag) => {
            const hash = tag.slice(1);
            navigate(`/hashtag/${hash}`);
          }}
        >
          <p className="post_description">{data.description}</p>
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
    & > p:first-child {
      font-size: 19px;
      line-height: 23px;
      color: white;
      margin-bottom: 7px;
    }
    .post_description {
      font-size: 17px;
      line-height: 21px;
      color: #b7b7b7;
      margin-bottom: 10px;
    }
  }
`;

const tagStyle = {
  fontWeight: 700,
  color: "white",
  cursor: "pointer",
};
