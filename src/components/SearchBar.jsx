import axios from "axios";
import { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBar() {
    const jake = 'data:image/jpeg;base64,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'
    const [search, setSearch] = useState("");
    console.log(search)

    function searchUser (e) {
        setSearch(e.target.value)
        axios.get(`http://localhost:5000/users`)
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
                        onChange={e => setSearch(e.target.value)}
                        required
                    />
                    <AiOutlineSearch />
                    <EachUser>
                        <img src={jake} />
                        <p>Jake, the dog</p>
                    </EachUser>
                    <EachUser>
                        <img src={jake} />
                        <p>Jake, the dog</p>
                    </EachUser>
                    <EachUser>
                        <img src={jake} />
                        <p>Jake, the dog</p>
                    </EachUser>
                    <EachUser>
                        <img src={jake} />
                        <p>Jake, the dog</p>
                    </EachUser>
                </ContainerInput>
            </Test>
            <p>Value: {search}</p>
        </>
    )
}

const Test = styled.div`
    background-color: black;
    p{
        color: white;
    }
`

const ContainerInput = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #E7E7E7;
    border-radius: 8px;
    input{
        font-size: 19px;
        color: #515151;
        width: 100%;
        height: 45px;
        padding-left: 15px;
        border: none;
        border-radius: 8px;
        outline: none;
        &::placeholder{
            font-size: 19px;
            color: #C6C6C6;
        }
    }
    svg{
        position: absolute;
        top: 10px;
        right: 1%;
        font-size: 25px;
        color: #C6C6C6;
    }
`

const EachUser = styled.button`
    display: flex;
    align-items: center;
    margin-left: 10px;
    background-color: #E7E7E7;
    border: none;
    cursor: pointer;
    img{
        width: 39px;
        height: 39px;
        border-radius: 50%;
        margin-right: 10px;
    }
    p{
        font-size: 19px;
        color: #515151;
    }
`