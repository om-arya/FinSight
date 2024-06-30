import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import '../index.css';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <a href="/dashboard" className="site-logo"><img src="../../public/fs_logo.jpg" /></a>
            <div className="nav-button-container">
                    <CustomLink id="dashboard-link" to="/dashboard">Dashboard</CustomLink>
                    <CustomLink id="portfolio-link" to="/portfolio">Portfolio</CustomLink>
                    <CustomLink id="about-link" to="/about">About</CustomLink>
            </div>
            <a className="sign-out-button" href="/">Sign Out →</a>
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