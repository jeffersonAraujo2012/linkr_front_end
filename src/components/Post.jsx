import { ReactTagify } from "react-tagify";
import styled from "styled-components";
import LinkPost from "./LinkPost";
import { Link, useNavigate } from "react-router-dom";
import trash from "../assets/delete.png"
import edit from "../assets/edit.png"
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Timeline from "../pages/Timeline";

export default function Post({ data, updatePost }) {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [update, setUpdate] = updatePost;

  function openModal() {
    setModal(true)
  }

  function deletePost() {
    console.log(data)

    axios.delete(process.env.REACT_APP_API_URL + "/posts", { data })
    .then(() => {
        alert('post deletado com sucesso!')
        setUpdate(!update);
      })
    .catch((err) => alert('Não foi possível deletar o post.'))
  }


  return (
    <PostStyle data-test="post">
      <div className="post_owner_image">
        <img src={data.picture_user} alt={data.username} />
      </div>

      <div className="post_content">
        <div>
          <Link to={`/usertimeline/${data.user_id}`} data-test="username">
          {data.username}
        </Link>
          <div className="edit_and_delete">
            <img src={edit} />
            <img src={trash} onClick={openModal} />
          </div>
        </div>

        {modal && (
        <div className="modal">
          <h1>Are you sure you want to delete this post?</h1>
          <div>
            <button className="no" onClick={() => setModal(false)}>No, go back</button>
            <button className="yes" onClick={() => {
              setModal(false)
              deletePost()
              }}>Yes, delete it</button>
          </div>
        </div>
      )}

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
        color: #FFFFFF;
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
          background-color: #FFFFFF;
          font-family: Lato;
          font-size: 18px;
          font-weight: 700;
          line-height: 22px;
        }
        .no {
          background-color: #FFFFFF;
          color: #1877F2;
        }
        .yes {
          background-color: #1877F2;
          color: #FFFFFF;
        }
      }
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
