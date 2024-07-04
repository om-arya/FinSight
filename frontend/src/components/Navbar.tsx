import React from 'react';
import { Link, useNavigate, useMatch, useResolvedPath } from 'react-router-dom';
import '../index.css';

import SessionState from '../state/SessionState';

const Navbar: React.FC = () => {
    const state = SessionState();

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
                <NavLink id="dashboard-link" to="/dashboard" onClick={() => handleEntryDualColorPropSwitch()}>Dashboard</NavLink>
                <NavLink id="portfolio-link" to="/portfolio" onClick={() => handleEntrySingleColorPropSwitch()}>Portfolio</NavLink>
                <NavLink id="about-link" to="/about" onClick={() => handleEntrySingleColorPropSwitch()}>About</NavLink>
            </div>
            <div className="sign-out-button" onClick={() => handleSignout()}><p>Sign out →</p></div>
        </nav>
    )
}

function NavLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true});
    return (
        <Link className={isActive ? "active" : ""} to={ to } { ...props }>{ children }</Link>
    )
}

// Handle prop switches for page reloads.
window.onload = () => {
    const path = window.location.pathname;
    if (path == "/") {
        handleExitPropSwitch();
    } else if (path == "dashboard") {
        handleEntryDualColorPropSwitch();
    } else {
       handleEntrySingleColorPropSwitch();
    }
}

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

export default Navbar;