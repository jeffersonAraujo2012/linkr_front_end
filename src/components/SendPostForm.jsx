import axios from "axios";
import { useContext, useState } from "react";
import styled from "styled-components";
import AuthContext from "../contexts/AuthContext";
import UpdateHashtagContext from "../contexts/UpdataHashtagContext";

export default function SendPostForm({ updatePost }) {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [update, setUpdate] = updatePost;
  const [updataHashtags, setUpdataHashtags] = useContext(UpdateHashtagContext);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user_data"))
  );

  console.log(userData);
  const mockUser = {
    username: "Jeff Araujo",
    picture_user:
      "https://i.pinimg.com/736x/b9/ae/86/b9ae8625cac70903db98382d3d3492be.jpg",
  };

  function sendPost(e) {
    e.preventDefault();
    setPublishing(true);

    const sendPromise = axios.post(process.env.REACT_APP_API_URL + "/posts", {
      url: url,
      description: description,
      user_id: userData.id,
    });

    sendPromise.then((res) => {
      setPublishing(false);
      setDescription("");
      setUrl("");
      setUpdate(!update);
      setUpdataHashtags(!updataHashtags);
    });
    sendPromise.catch((res) => {
      setPublishing(false);
      alert("There was an error publishing your link");
    });
  }

  return (
    <SendPostFormStyle data-test="publish-box">
      <div className="post_owner_image">
        <img src={userData.picture_url} alt={userData.username} />
      </div>

      <form className="post_content" onSubmit={sendPost}>
        <p>What are you going to share today?</p>
        <input
          type="text"
          placeholder="http://..."
          value={url}
          onChange={(e) => setUrl(e.currentTarget.value)}
          required
          disabled={publishing}
          data-test="link"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          disabled={publishing}
          data-test="description"
        />
        <button disabled={publishing} data-test="publish-btn">
          {publishing ? "Publishing..." : "Publish"}
        </button>
      </form>
    </SendPostFormStyle>
  );
}

const SendPostFormStyle = styled.div`
  display: flex;
  align-items: stretch;

  width: 610px;
  padding: 18px;
  margin-bottom: 30px;

  border-radius: 16px;
  background-color: white;

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
    display: flex;
    flex-direction: column;
    align-items: stretch;

    & > p:first-child {
      font-size: 20px;
      font-weight: 300;
      line-height: 24px;
      color: #707070;
      margin-bottom: 16px;
    }

    & > input,
    & > textarea {
      padding: 8px 12px;

      color: #949494;

      background-color: #efefef;
      border: none;
      border-radius: 5px;
    }

    & > textarea {
      height: 70px;
      margin-top: 5px;
      resize: none;
    }

    & > button {
      width: 110px;
      height: 30px;
      margin-top: 5px;
      margin-left: auto;

      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      color: white;

      border: none;
      border-radius: 5px;

      background-color: #1877f2;
      cursor: pointer;
    }
  }

  @media (max-width: 1000px) {
    width: 100%;
    border-radius: 0;
    margin-bottom: 16px;

    .post_owner_image {
      display: none;
    }
  }
`;
