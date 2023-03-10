import styled from "styled-components";
import { useNavigate } from 'react-router-dom'

export default function Logout_Button() {
    const navigate = useNavigate();

    return (
    <LogOutBar data-test="menu">
        <p data-test="logout" onClick={() => {
                localStorage.clear()
                navigate('/')
        }}>
            Logout
        </p>
    </LogOutBar>
)}

const LogOutBar = styled.div`
    position: absolute;
    top: 65px;
    right: 0;
    padding: 17px;
    border-radius: 0 0 0 14px;
    background-color: #171717;
    width: 110px;
    z-index: 3;
    p{
        text-align: center;
        font-family: Lato, sans-serif;
        font-weight: 700;
        font-size: 17px;
        color: #ffffff;
        @media(max-width: 900px) {
            font-size: 15px;
        }
    }
`