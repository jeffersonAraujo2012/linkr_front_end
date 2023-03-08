import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import styled from "styled-components"
import AuthContext from "../contexts/AuthContext"

export default function PaginaPrincipal() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { userData, setUserData } = useContext(AuthContext);
    const navigate = useNavigate();

    function home(){
        navigate("/home")
    }

    function loginConta(event){
        event.preventDefault()
        axios
            .post(`http://localhost:5000/`, {
                email: email,
                password: password
            } )
            .then((request) => {
                setUserData({...userData, token: request.data});
                home()
            } )
            .catch((erro) => console.log(erro))
    }

    return (
        <PrincipalStyled>
            <div>
                <h1>linkr</h1>
                <p>save, share and discover</p>
                <p>the best links on the web</p>
            </div>
            <form onSubmit={loginConta}>    
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" required></input>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="senha" required></input>
                <button type="submit" >Log In</button>
            </form>
            <Link to={"/signup"}><p>First time? Create an account!</p></Link>
        </PrincipalStyled>
    )
}

const PrincipalStyled = styled.div`
    width: 400px;
    display: flex;
    justify-content: space-between;
    h1{
        text-align: center;
        font-family: 'Passion One';
        font-style: normal;
        font-weight: 700;
        font-size: 106px;
        line-height: 117px;
        background: #000000;
        color: #ffffff;
    }
    p {
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 43px;
        line-height: 64px;
        color: #ffffff;
    }
    input{
        width: 303px;
        height: 45px;
        margin: 6px 36px;
        
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        ::placeholder{
            padding-left: 15px;
            font-family: 'Raleway';
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            line-height: 23px;

            color: #000000;
        }
    }
    button{
        width: 429px;
        height: 65px;
        left: 956px;
        top: 473px;

        background: #1877F2;
        border-radius: 6px;
    }
    a{
        width: 262px;
        height: 24px;
        left: 1044px;
        top: 560px;

        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 24px;
        /* identical to box height */

        text-decoration-line: underline;

        color: #FFFFFF;
        p{
            margin-top: 25px;
            text-align: center;
            text-decoration: none;

            color: #000000;
        }
    }
`