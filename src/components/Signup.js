import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from "styled-components";


export default function Signup() {
    const [email, setEmail] = useState("");
    const [username, setUsername ] = useState("");
    const [password, setPassword] = useState("");
    const [picture_url, setPicture_url ] = useState("");
    const [disable, setDisable] = useState(false);
    const navigate = useNavigate();

    function dadosConta(event){
        event.preventDefault();
        setDisable(true)

        if (email === '' || password === '' || username === '' || picture_url  === '') {
            alert('Please, fill in all required fields.')
            setDisable(false)
            return false;
        }

        axios
            .post(`${process.env.REACT_APP_API_URL}/signup`, {
                email: email,
                username: username,
                password: password,
                picture_url : picture_url 
            } )
            .then((request) => {
                console.log(request.data)
                setDisable(true)
                pagina()
            })
            .catch((error) => {
                console.log(error)
                setDisable(false)
                if (error.response.status === 409) {
                    alert('Email is already registered!')
                } else {
                    alert('Anything has been wrong. Try again later or contact the support.')
                }

            })
    }

    function pagina(){
        navigate("/")
    }

    return (
        <PrincipalStyled>
            <Logo>
                <h1>linkr</h1>
                <p>save, share and discover</p>
                <p>the best links on the web</p>
            </Logo>
            <SignUp>
                <form onSubmit={dadosConta}>  
                    <input data-test="email" disabled={disable} onChange={(e) => setEmail(e.target.value)} value={email} type='email' placeholder="e-mail" name="email" autoComplete="off" />
                    <input data-test="password" disabled={disable} onChange={(e) => setPassword(e.target.value)} value={password} type='password' placeholder="password" name="password" autoComplete="off" />
                    <input data-test="username" disabled={disable} onChange={(e) => setUsername(e.target.value)} value={username} type='text' placeholder="username" name="username" autoComplete="off" />
                    <input data-test="picture-url" disabled={disable} onChange={(e) => setPicture_url(e.target.value)} value={picture_url } type='text' placeholder="image" name="image" autoComplete="off" />
                    <button data-test="sign-up-btn" disabled={disable} type="submit">Sign Up</button>
                </form>
                <Link to={"/"} data-test="login-link"><p>Switch back to log in!</p></Link>
            </SignUp>
        </PrincipalStyled>
    )
}


const PrincipalStyled = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    align-itens:center;
`
const Logo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-left: 144px;
    width: 60%;
    height: 100%;
    background: #000000;
    h1{
        text-align: center;
        font-family: 'Passion One';
        font-style: normal;
        font-weight: 700;
        font-size: 106px;
        line-height: 117px;
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
    @media (max-width: 1050px) {
        display: none;
    }
`
const SignUp = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-left: 60px;
    padding-rigth: 144px;
    width: 450px;
    input{
        width: 429px;
        height: 65px;

        background: #FFFFFF;
        border-radius: 6px;
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
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 27px;
        line-height: 40px;


        color: #FFFFFF;
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

        text-decoration-line: underline;

        color: #FFFFFF;
    }
`