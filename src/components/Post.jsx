import { ReactTagify } from "react-tagify";
import styled from "styled-components";
import LinkPost from "./LinkPost";
import { Link, useNavigate } from "react-router-dom";
import trash from "../assets/delete.png";
import edit from "../assets/edit.png";
import buttonLike from "../assets/like.png";
import buttonLike2 from "../assets/like2.png";
import repost from "../assets/repost.png";
import { useRef, useState } from "react";
import axios from "axios";

export default function Post({ data, updatePost, user }) {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [update, setUpdate] = updatePost;
  const [description, setDescription] = useState(data.description);
  const [visivel, setVisivel] = useState(true);
  // const [like, setLike] = useState(data.liked_by?.find((i) => i=user?.id))
  const [like, setLike] = useState(data.liked_by.includes(user));
  const [quantLike, setQuantLike] = useState(data.likes_count);
  const inputRef = useRef(null);

  function openModal() {
    setModal(true);
  }

  function likePost() {
    axios
      .post(process.env.REACT_APP_API_URL + "/posts/like", {
        ...data,
        user: user,
      })
      .then((res) => {
        setLike(!like);
        setUpdate(!update);
        setQuantLike(res.data.count);
        console.log(res.data.count);
      })
      .catch((err) => console.log(err.response.data));
  }

  function deletePost() {
    axios
      .delete(process.env.REACT_APP_API_URL + "/posts", { data })
      .then(() => {
        console.log("post deletado com sucesso!");
        setUpdate(!update);
      })
      .catch((err) => alert("Não foi possível deletar o post."));
  }

  function editPost(e) {
    if (e.keyCode === 27) {
      setVisivel(true);
      setDescription(data.description);
      return;
    }

    if (e.keyCode === 13) {
      const edit = { id: data.id, description, user_id: data.user_id };

      axios
        .patch(process.env.REACT_APP_API_URL + "/posts", edit)
        .then(() => {
          console.log("post editado com sucesso!");
          setUpdate(!update);
        })
        .catch((err) => console.log(err.response.data));
    }
  }

  return (
    <PostStyle data-test="post">
      <div className="container">
        <div className="post_owner_image">
          <img src={data.picture_user} alt={data.username} />
        </div>

        {!like ? (
          <figure>
            <img src={buttonLike} onClick={likePost} data-test="like-btn" />
            <figcaption data-test="counter">{quantLike} likes</figcaption>
          </figure>
        ) : (
          <figure>
            <img src={buttonLike2} onClick={likePost} data-test="like-btn" />
            <figcaption data-test="counter">{quantLike} likes</figcaption>
          </figure>
        )}

        <figure>
          <img
            className="repost"
            src={repost}
            onClick={() => alert("clicou!")}
          />
          <figcaption className="repost-description">0 reposts</figcaption>
        </figure>
      </div>

      <div className="post_content">
        <div>
          <Link to={`/user/${data.user_id}`} data-test="username">
            {data.username}
          </Link>
          <div className="edit_and_delete">
            <img
              src={edit}
              onClick={() => {
                setVisivel(false);
                console.log(visivel);
                inputRef.current.focus();
              }}
              data-test="edit-btn"
            />
            <img src={trash} onClick={openModal} data-test="delete-btn" />
          </div>
        </div>

        {modal && (
          <div className="modal">
            <h1>Are you sure you want to delete this post?</h1>
            <div>
              <button className="no" onClick={() => setModal(false)} data-test="cancel">
                No, go back
              </button>
              <button
                className="yes"
                onClick={() => {
                  setModal(false);
                  deletePost();
                }}
                data-test="confirm"
              >
                Yes, delete it
              </button>
            </div>
          </div>
        )}
        <div>
          {visivel ? (
            <ReactTagify
              tagStyle={tagStyle}
              tagClicked={(tag) => {
                const hash = tag.slice(1);
                navigate(`/hashtag/${hash}`);
              }}
            >
              <p
                className="post_description"
                onClick={() => setVisivel(false)}
                data-test="description"
              >
                {data.description}
              </p>
            </ReactTagify>
          ) : (
            <input
              type="text"
              className="post_description"
              ref={inputRef}
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
              onKeyDown={editPost}
              onBlur={() => {
                setVisivel(true);
                console.log(visivel);
                setDescription(data.description);
              }}
              required
              data-test="edit-btn"
            />
          )}
        </div>
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

  .container {
    display: flex;
    flex-direction: column;
    gap: 19px;

    figure {
      img {
        height: 18px;
        width: 20px;
        margin-left: 15px;
        margin-bottom: 4px;
      }

      figcaption {
        font-family: Lato;
        font-size: 11px;
        font-weight: 400;
        margin-left: 10px;
        color: #ffffff;
      }

      .repost {
        height: 12px;
        width: 20px;
        margin-left: 15px;
        cursor: pointer;
      }

      .repost-description {
        margin-left: 4px;
      }
    }
  }

  .post_owner_image {
    margin-right: 18px;

    img {
      width: 50px;
      height: 50px;
      margin-left: 0px;
      border-radius: 100%;
    }
  }
  .post_content {
    width: 100%;

    & > div > a:first-child {
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
    div {
      display: flex;
      justify-content: space-between;

      .edit_and_delete {
        gap: 13px;

        img {
          width: 14px;
          height: 14px;
        }
      }
    }
    .modal {
      height: 262px;
      width: 50%;
      border-radius: 50px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      padding: 10%;
      background-color: #333333;
      position: fixed;
      top: 35vh;
      left: 25vw;

      h1 {
        font-family: Lato;
        font-size: 34px;
        font-weight: 700;
        line-height: 41px;
        text-align: center;
        color: #ffffff;
      }
      div {
        display: flex;
        gap: 27px;
        justify-content: center;

        button {
          height: 37px;
          min-width: 134px;
          border-radius: 5px;
          border: hidden;
          background-color: #ffffff;
          font-family: Lato;
          font-size: 18px;
          font-weight: 700;
          line-height: 22px;
        }
        .no {
          background-color: #ffffff;
          color: #1877f2;
        }
        .yes {
          background-color: #1877f2;
          color: #ffffff;
        }
      }
    }
    // h3 {
    //   display: ${(props) => (props.visivel ? "initial" : "none")};
    // }
    // input {
    //   display: ${(props) => (props.visivel === false ? "initial" : "none")};
    // }
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
