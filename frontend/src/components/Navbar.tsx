import React from 'react';
import { useNavigate, Link, useMatch, useResolvedPath } from 'react-router-dom';
import '../index.css';

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    function handleSignout() {
        sessionStorage.removeItem("user");
        navigate("/");
    }

    return (
        <nav className="navbar">
            <a href="/dashboard" className="site-logo"><img src="/fs_olivebranches.png" /></a>
            <div className="nav-button-container">
                    <CustomLink id="dashboard-link" to="/dashboard">Dashboard</CustomLink>
                    <CustomLink id="portfolio-link" to="/portfolio">Portfolio</CustomLink>
                    <CustomLink id="about-link" to="/about">About</CustomLink>
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