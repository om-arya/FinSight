import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../static/home.css';

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

    return (
        <div className="home">
            <div className="left-side">
                <img className="logo" src="/fs_olivebranches_padding.png" />
            </div>
            <div className="right-side">
                <LoginPanel />
                <p className="guest-login">Just visiting?<Link to="/dashboard" target="_blank"><span>Log in as a Guest.</span></Link></p>
            </div>
        </div>
    )
}

export default Home;