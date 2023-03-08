import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components"
import PaginaPrincipal from "./components/PaginaPrincipal";
import Signup from "./components/Signup"
import Home from "./components/Home"
import AuthContext from "./contexts/AuthContext"
import Timeline from "./pages/Timeline";

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
                    <Route path="/timeline" element={Timeline()} />
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