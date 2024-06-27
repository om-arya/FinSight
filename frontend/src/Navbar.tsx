import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <a href="/dashboard" className="site-title">FinSight</a>
            <div className="nav-button-container">
                    <CustomLink to="/dashboard">Dashboard</CustomLink>
                    <CustomLink to="/portfolio">Portfolio</CustomLink>
                    <CustomLink to="/about">About</CustomLink>
            </div>
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