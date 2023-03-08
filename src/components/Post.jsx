import styled from "styled-components";
import LinkPost from "./LinkPost";

export default function Post({ data }) {
  return (
    <PostStyle>
      <div className="post_owner_image">
        <img src={data.picture_user} alt={data.username} />
      </div>

      <div className="post_content">
        <p>{data.username}</p>
        <p>{data.description}</p>
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
    & > p:nth-child(2) {
      font-size: 17px;
      line-height: 21px;
      color: #b7b7b7;
      margin-bottom: 10px;
    }
  }
`;
