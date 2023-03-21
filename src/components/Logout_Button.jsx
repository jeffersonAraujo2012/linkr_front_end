import styled from "styled-components";
import { useNavigate } from 'react-router-dom'

export default function Logout_Button(showLogout) {
    const navigate = useNavigate();

    return (
    <LogOutBar data-test="menu" showLogout={showLogout}>
        <p data-test="logout" onClick={() => {
                localStorage.clear()
                navigate('/')
        }}>
            Logout
        </p>
    </LogOutBar>
)}

const LogOutBar = styled.div`
    display: ${props => props.showLogout ? 'none' : 'flex'};
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