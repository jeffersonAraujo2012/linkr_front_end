import axios from "axios";
import { useState, forceUpdate, useContext } from "react";
import React from "react";
import { DebounceInput } from "react-debounce-input";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import UpdateUserPage from "../contexts/UpdateUserPage";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState(undefined);
  const navigate = useNavigate();
  const [updateUserPage, setUpdateUserPage] = useContext(UpdateUserPage);
  //console.log(search)

  function searchUser(event) {
    const searchTerm = event.target.value;
    if (searchTerm.length < 3) return setResult(undefined);
    const resultSearch = axios.get(
      `${process.env.REACT_APP_API_URL}/users/${searchTerm}`
    );
    resultSearch.then((res) => setResult(res.data));
    resultSearch.catch((err) => {
      console.log(err.response.data);
    });
  }

  function handleClick(id) {
    navigate(`/usertimeline/${id}`);
    setUpdateUserPage(!updateUserPage);
  }

  return (
    <>
      <Test>
        <ContainerInput>
          <DebounceInput
            minLength={3}
            debounceTimeout={300}
            id="test"
            type="text"
            placeholder="Search for people"
            value={search}
            onChange={searchUser}
            required
          />
          <AiOutlineSearch />
          {result?.length !== 0 ? (
            result?.map(
              (r) => (
                //<Link key={r.picture_url} to={`/usertimeline/${r.id}`}>
                <EachUser key={r.id} onClick={() => handleClick(r.id)}>
                  <img src={r.picture_url} />
                  <p>{r.username}</p>
                </EachUser>
              )
              //</Link>
            )
          ) : (
            <></>
          )}
        </ContainerInput>
      </Test>
    </>
  );
}

const Test = styled.div`
  position: absolute;
  top: 10px;
  p {
    color: white;
  }
`;

const ContainerInput = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #e7e7e7;
  border-radius: 8px;
  input {
    font-size: 19px;
    color: #515151;
    width: 100%;
    height: 45px;
    padding-left: 15px;
    border: none;
    border-radius: 8px;
    outline: none;
    &::placeholder {
      font-size: 19px;
      color: #c6c6c6;
    }
  }
  svg {
    position: absolute;
    top: 10px;
    right: 1%;
    font-size: 25px;
    color: #c6c6c6;
  }
`;

const EachUser = styled.button`
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-top: 5px;
  margin-bottom: 5px; 
  background-color: #e7e7e7;
  border: none;
  cursor: pointer;
  img {
    width: 39px;
    height: 39px;
    border-radius: 50%;
    margin-right: 10px;
  }
  p {
    font-size: 19px;
    color: #515151;
  }
`;
