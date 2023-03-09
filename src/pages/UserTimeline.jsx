import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import styled from "styled-components";
import Post from "../components/Post";
import Trending from "../components/Trending";

export default function UserTimeline() {
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const [update, setUpdate] = useState(false);
    console.log(id);

    useEffect(() => {
        const resultPosts = axios.get(`http://localhost:5000/user/${id}`);
        resultPosts.then((res) => setPosts(res.data));
        resultPosts.catch((res) => {
            alert(
                "An error occured while trying to fetch the posts, please refresh the page"
            );
        });
    }, [update]);

    function showPosts() {
        if (!posts) {
            return (
                <div className="loading">
                    <p>Loading</p>
                    <PulseLoader color="white" />
                </div>
            );
        }

        if (posts?.length === 0) {
            return <p className="no-posts">There are no posts yet</p>;
        }

        if (posts) {
            return posts.map((post) => {
                return <Post key={post.id} data={post} />;
            });
        }
    }

    return (
        <TimelineStyle>
            <div className="flex-column">
                <TitleStyle>
                    <img src="https://i0.wp.com/cebolaverde.com.br/wp-content/uploads/2020/08/jakehda_Easy-Resize.com_.jpg?fit=1280%2C672&ssl=1"/>
                    <p>timeline</p>
                </TitleStyle>
                <div className="flex-row">
                    <main>
                        {showPosts()}
                    </main>

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
  padding-top: 78px;

  .flex-column {
    display: flex;
    flex-direction: column;
    width: fit-content;

    h1 {
      margin-bottom: 44px;
    }
  }

  .flex-row {
    width: fit-content;
    display: flex;
    justify-content: center;
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
  }
`;

const TitleStyle = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 48px;
    p{
        font-family: 'Oswald', sans-serif;
        font-size: 43px;
        line-height: 64px;
        color: white;
        font-weight: 700;
        margin-left: 18px;
    }
  
    img{
        width: 50px;
        height: 50px;
        border-radius: 50px;
  }
`;
