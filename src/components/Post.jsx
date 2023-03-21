import { ReactTagify } from "react-tagify";
import styled from "styled-components";
import LinkPost from "./LinkPost";
import { Link, useNavigate } from "react-router-dom";
import trash from "../assets/delete.png"
import edit from "../assets/edit.png"
import buttonLike from "../assets/like.png"
import buttonLike2 from "../assets/like2.png"
import { useRef, useState } from "react";
import axios from "axios";
// import Timeline from "../pages/Timeline";

export default function Post({ data, updatePost }) {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [update, setUpdate] = updatePost;
  const [description, setDescription] = useState(data.description);
  const [visivel, setVisivel] = useState(true);
  const [like, setLike] = useState(false)
  const [quantLike, setQuantLike] = useState(null)
  const inputRef = useRef(null);

  function openModal() {
    setModal(true)
  }

  function likePost() {
    axios.post(process.env.REACT_APP_API_URL + "/posts/like", { data })
    .then((res) => {
        setLike(!like)
        setUpdate(!update);
        setQuantLike(res.data)
      })
    .catch((err) => console.log(err.response.data))
  }

  function deletePost() {
    axios.delete(process.env.REACT_APP_API_URL + "/posts", { data })
    .then(() => {
        alert('post deletado com sucesso!')
        setUpdate(!update);
      })
    .catch((err) => alert('Não foi possível deletar o post.'))
  }

  function editPost(e) {
    if (e.keyCode === 27) {
      setVisivel(true)
      setDescription(data.description)
      return
    }
  
    if (e.keyCode === 13) {
      const edit = { id: data.id, description, user_id: data.user_id }
      console.log(edit)
  
      axios.patch(process.env.REACT_APP_API_URL + "/posts", { data: { edit } })
        .then(() => {
          alert('post editado com sucesso!')
          setUpdate(!update);
        })
        .catch((err) => console.log(err.response.data))
    }
  }

  return (
    <PostStyle>
      <div className="container">
        <div className="post_owner_image">
          <img src={data.picture_user} alt={data.username} />
        </div>

        {
            !like? (
              <figure>
                <img src={buttonLike} onClick={likePost} />
                <figcaption>{quantLike} likes</figcaption>
              </figure>
            ) : (
              <img src={buttonLike2} onClick={likePost} />
            )
        }

      </div>

      <div className="post_content">
        <div>
          <Link to={`/usertimeline/${data.user_id}`}>
            {data.username}
          </Link>
          <div className="edit_and_delete">
            <img src={edit} onClick={() => {
              setVisivel(false)
              console.log(visivel)
            }}/>
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
          <div>
            {visivel ? (
                <ReactTagify
                tagStyle={tagStyle}
                tagClicked={(tag) => {
                  const hash = tag.slice(1);
                  navigate(`/hashtag/${hash}`);
                }}
              >
                <p className="post_description" onClick={() => setVisivel(false)}>{data.description}</p>
      
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
                    setVisivel(true)
                    setDescription(data.description)
                  }}
                  required
                />

              )
            }
              
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
    
    img {
      height: 18px;
      width: 20px;
    }

    figcaption {
      font-family: Lato;
      font-size: 11px;
      font-weight: 400;
      text-align: center;
      color: #FFFFFF;
    }
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
    // h3 {
    //   display: ${props => props.visivel? 'initial' : 'none'};
    // }
    // input {
    //   display: ${props => props.visivel === false? 'initial' : 'none'};
    // }
  }
`;

// const PostDescription = styled.h3.attrs((props) => ({ visivel: props.visivel }))`
//   display: ${(props) => (props.visivel ? "initial" : "none")};
// `;

// const PostInput = styled.input.attrs((props) => ({ visivel: props.visivel }))`
//   display: ${(props) => (props.visivel === false ? "initial" : "none")};
// `;


const tagStyle = {
  fontWeight: 700,
  color: "white",
  cursor: "pointer",
};
