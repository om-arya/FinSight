import React from 'react';
import { useNavigate, Link, useMatch, useResolvedPath } from 'react-router-dom';
import '../index.css';

import SessionState from '../state/SessionState';

const Navbar: React.FC = () => {
    const state = SessionState();

    const root = document.querySelector(':root') as HTMLElement;
    const html = document.querySelector('html') as HTMLElement;

    function handleEntrySingleColorPropSwitch() {
        root.style.setProperty("--bg-main-color", "#fafafa");
        root.style.setProperty("--text-main-color", "black");
        root.style.background = "var(--bg-main-color)";
        html.style["overflow-y"] = "scroll";
    }

    function handleEntryDualColorPropSwitch() {
        root.style.setProperty("--bg-main-color", "#fafafa");
        root.style.setProperty("--text-main-color", "black");
        root.style.background = "var(--bg-third-color)";
        html.style["overflow-y"] = "scroll";
    }

    function handleExitPropSwitch() {
        root.style.setProperty("--bg-main-color", "white");
        root.style.setProperty("--text-main-color", "black");
        root.style.background = "var(--bg-main-color)";
        html.style["overflow-y"] = "hidden";
    }

    const navigate = useNavigate();
    
    function handleSignout() {
        state.clearSessionState();

        handleExitPropSwitch();

        navigate("/");
    }
    
    return (
        <nav className="navbar">
            <a href="/dashboard" className="site-logo"><img src="/fs_olivebranches.png" /></a>
            <div className="nav-button-container">
                    <CustomLink id="dashboard-link" to="/dashboard" onClick={() => handleEntryDualColorPropSwitch()}>Dashboard</CustomLink>
                    <CustomLink id="portfolio-link" to="/portfolio" onClick={() => handleEntryDualColorPropSwitch()}>Portfolio</CustomLink>
                    <CustomLink id="about-link" to="/about" onClick={() => handleEntrySingleColorPropSwitch()}>About</CustomLink>
            </div>
            <div className="sign-out-button" onClick={() => handleSignout()}><p>Sign out →</p></div>
        </nav>
    )
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true});
    return (
        <Link className={isActive ? "active" : ""} to={ to } { ...props }>{ children }</Link>
    )
}

export default Navbar;