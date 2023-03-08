import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components"
import PaginaPrincipal from "./PaginaPrincipal";
import Signup from "./Signup"
import Home from "./Home.js"
import AuthContext from "../contexts/AuthContext"

export default function App() {
    const [ userData, setUserData ] = useState(
        {
            email: "",
            name: "",
            Password: "",
            token: "",
            _id:""
        }
    )

 return (
    <AuthContext.Provider value={{ userData, setUserData }}>
        <BrowserRouter>
            <ContainerStyled>
                <Routes>
                    <Route path="/" element={<PaginaPrincipal />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </ContainerStyled>
        </BrowserRouter>
    </AuthContext.Provider>
 )
}

const ContainerStyled = styled.div`
    background-color: #000000;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box; 
`