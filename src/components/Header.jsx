import SearchBar from "./SearchBar";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom'
import AuthContext from "../contexts/AuthContext";

export default function Header() {
    const [showLogout, setShowLogout] = useState(false);
    const navigate = useNavigate();
    const userDataString = localStorage.getItem('userData');
    const userData = JSON.parse(userDataString);

    return (
        <ContainerHeader>
            <Link to={'/timeline'}>
                <h1>linkr</h1>
            </Link>
            <SearchBar />

            <ContainerLogout>
                {showLogout ?
                    <IoIosArrowUp onClick={() => (setShowLogout(false))} /> :
                    <IoIosArrowDown onClick={() => (setShowLogout(true))} />
                }
                <img src={userData.picture_url} />
                <LogOutBar data-test="menu" showLogout={showLogout}>
                    <p data-test="logout" onClick={() => {
                        localStorage.clear()
                        navigate('/')
                    }}>
                        Logout
                    </p>
                </LogOutBar>
            </ContainerLogout>
        </ContainerHeader>
    )
}

const ContainerHeader = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    padding-right:20px;
    width: 100%;
    background-color: #151515;
    height: 72px;
    h1{
        color: #FFFFFF;
        font-size: 48px;
        font-family: 'Passion One', cursive;
    }
`

const ContainerLogout = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    svg{
        color: #FFFFFF;
        font-size: 25px;
        margin-right: 15px;
        cursor: pointer;
    }
    img{
        width: 49px;
        height: 49px;
        border-radius: 50px;
    }
`

const LogOutBar = styled.div`
    display: ${props => props.showLogout ? 'flex' : 'none'};
    align-items: flex-start;
    justify-content: center;
    position: fixed;
    top: 72px;
    right: 0;
    border-radius: 0 0 0 20px;
    background-color: #171717;
    width: 130px;
    height: 47px;
    padding-top: 10px;
    z-index: 3;
    cursor: pointer;
    p{
        font-family: Lato, sans-serif;
        font-weight: 700;
        font-size: 17px;
        color: #ffffff;
        @media(max-width: 900px) {
            font-size: 15px;
        }
    }
`