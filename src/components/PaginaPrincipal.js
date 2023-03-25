import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import styled from "styled-components"
import AuthContext from "../contexts/AuthContext"

export default function PaginaPrincipal() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disable, setDisable] = useState(false);
    const navigate = useNavigate();
    const { setUserData } = useContext(AuthContext);

    function home(){
        navigate("/timeline")
    }

    function loginConta(event){
        event.preventDefault()
        setDisable(true);

        if (email === '' || password === '') {
            alert('Please fill in all required fields.')
            setDisable(false)
            return false;
        }

        axios
            .post(`${process.env.REACT_APP_API_URL}/signin`, {
                email: email,
                password: password
            } )
            .then((response) => {
                const userData = response.data;
                setUserData(userData)
                localStorage.setItem('access_token', userData.token);
                localStorage.setItem('user_data', JSON.stringify(userData));
                setDisable(false);
                home()
            } )
            .catch((error) => {
                console.log(error)
                if (error.response.status === 401) {
                    alert('E-mail or password incorrect')
                } else {
                    alert('Anything has been wrong. Try again later or contact the support.')
                }
                setDisable(false)
            })
    }

    return (
        <PrincipalStyled>
            <Logo>
                <h1>linkr</h1>
                <p>save, share and discover</p>
                <p>the best links on the web</p>
            </Logo>
            <SignIn>
                <form onSubmit={loginConta}>
                    <input data-test="email" disabled={disable} onChange={(e) => setEmail(e.target.value)} value={email} type='email' placeholder="e-mail" name="email"></input>
                    <input data-test="password" disabled={disable} onChange={(e) => setPassword(e.target.value)} value={password} type='password' placeholder="password" name="password"></input>
                    <button data-test="login-btn" disabled={disable} type="submit">Entrar</button>
                </form>
                <Link to="/sign-up"  data-test="sign-up-link" ><p>Primeira vez? Crie uma conta!</p></Link>
            </SignIn>
        </PrincipalStyled>
    )
}

const PrincipalStyled = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    align-items:center;
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
const SignIn = styled.div`
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