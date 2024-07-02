import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../static/home.css';

import { getUserByUsername } from '../../api/UserAPI.ts';

import LoginPanel from './LoginPanel.tsx';

const Home: React.FC = () => {
    useEffect(() => {
        const root = document.querySelector(':root') as HTMLElement;
        const html = document.querySelector('html') as HTMLElement;
        
        root.style.setProperty("--bg-main-color", "white");
        root.style.setProperty("--text-main-color", "black");
        root.style.background = "var(--bg-main-color)";
        html.style["overflow-y"] = "hidden";
    }, [])

    async function handleGuestLogin() {
        const guest = await getUserByUsername("guest");
        sessionStorage.setItem("user", JSON.stringify(guest.data));
        window.open('/dashboard','_blank');
    }

    return (
        <div className="home">
            <div className="left-side">
                <img className="logo" src="/fs_olivebranches_padding.png" />
            </div>
            <div className="right-side">
                <LoginPanel />
                <p className="guest-login">Just visiting?<span onClick={() => handleGuestLogin()}>Log in as a Guest.</span></p>
            </div>
        </div>
    )
}

export default Home;