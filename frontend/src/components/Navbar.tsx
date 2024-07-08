import React, { useState } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { RiSettings2Fill } from "react-icons/ri";
import '../index.css';

import SessionState from '../state/SessionState';
import { User } from '../api/UserAPI';

import Modal from './Modal';
import SettingsPanel from './settings/SettingsPanel';
import ChangePasswordPanel from './settings/ChangePasswordPanel';
import DeleteAccountPanel from './settings/DeleteAccountPanel';

const Navbar: React.FC = () => {
    const state = SessionState();
    const user = state.getUser() as User;

    const [modalContent, setModalContent] = useState(<></>);
    const [isOpen, setIsOpen] = useState(false);

    function openSettings() {
        setModalContent(
            <SettingsPanel closeSettings={() => closeModal()}
                           openChangePassword={() => openChangePassword()} 
                           openDeleteAccount={() => openDeleteAccount()} />
        );
        setIsOpen(true);
    }

    function openChangePassword() {
        setModalContent(
            <ChangePasswordPanel closeChangePassword={() => closeModal()} />
        );
        setIsOpen(true);
    }

    function openDeleteAccount() {
        setModalContent(
            <DeleteAccountPanel closeDeleteAccount={() => closeModal()} />
        );
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
        setModalContent(<></>);
    }
    
    function handleSignout() {
        state.clearSessionState();

        window.open("/", "_self");
    }
    
    return (
        <>
            <nav className="navbar">
                <div className="navbar-left-side">
                    <a href="/dashboard" className="site-logo"><img src="/fs_olivebranches.png" /></a>

                    <div className="nav-button-container">
                        <NavLink id="dashboard-link" to="/dashboard" onClick={() => handleEntryDualColorPropSwitch()}>Dashboard</NavLink>
                        <NavLink id="portfolio-link" to="/portfolio" onClick={() => handleEntrySingleColorPropSwitch()}>Portfolio</NavLink>
                        <NavLink id="about-link" to="/about" onClick={() => handleEntrySingleColorPropSwitch()}>About</NavLink>
                    </div>
                </div>

                <div className="navbar-right-side">
                    <div className="settings-button">
                        <RiSettings2Fill className="icon" onClick={() => {
                            if (user.username == "guest") {
                                alert("You must be logged in to use this feature.");
                                return;
                            }
                            openSettings()
                        }}/>
                    </div>
                
                    <div className="sign-out-button" onClick={() => handleSignout()}>
                        <p>Sign out →</p>
                    </div>
                </div>
            </nav>

            <Modal open={ isOpen }>{ modalContent }</Modal>
        </>
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
    if (path === "/") {
        handleExitPropSwitch();
    } else if (path === "/dashboard") {
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