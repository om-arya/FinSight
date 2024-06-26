import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, createUser } from '../api/UserAPI.ts';
import './home.css';

import Modal from '../Modal.tsx';

const Home: React.FC = () => {
    useEffect(() => {
        const root = document.querySelector(':root') as HTMLElement;
        
        root.style.setProperty("--bg-main-color", "white");
        root.style.background = "var(--bg-main-color)";
    }, [])

    const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState(<></>);

    function openSignup() {
        setModalContent(
            <>
                <h4 onClick={() => closeModal()}>X</h4>
                <h5>Welcome to FinSight!<br />Please fill out the following to create your account:</h5>
                <p>First name: <span>*</span></p>
                <input type="text" required={true} />
                <p>Last name: <span>*</span></p>
                <input type="text" required={true} />
                <p>Email address: <span>*</span></p>
                <input type="text" required={true} />
                <p>Username <span>*</span></p>
                <input type="text" required={true} />
                <p>Password <span>*</span></p>
                <input type="text" required={true} />
                <p>Confirm password <span>*</span></p>
                <input type="text" required={true} />
                <div className="submit-button" onClick={() => registerUser()}>Create Account</div>
            </>
        );
        setIsOpen(true);
    }

    function registerUser() {
        const inputs = document.getElementsByTagName('input');

        const firstName: string = inputs[0].value;
        const lastName: string = inputs[1].value;
        const emailAddress: string = inputs[2].value;
        const username: string = inputs[3].value;
        const password: string = inputs[4].value;

        const user: User = {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            emailAddress: emailAddress,
            assetNames: [],
            assetAmounts: []
        };

        createUser(user);
    }

    function openLogin() {
        setModalContent(
            <>
                <h4 onClick={() => closeModal()}>X</h4>
                <p>Username</p>
                <input />
                <p>Password</p>
                <input />
                <div className="submit-button">Log In</div>
            </>
        );
        setIsOpen(true);
    }

    function openDemo() {

    }

    function closeModal() {
        setModalContent(<></>);
        setIsOpen(false);
    }

    return (
        <>
            <div className="home">
                <h1>Welcome to FinSight.</h1>
                <p>Get started now.</p>
                
                <Modal open={isOpen}>
                    { modalContent }
                </Modal>

                <div className="entry-button-container">
                    <div className="entry-button signup-button" onClick={() => openSignup()}>
                        <h3>Sign Up</h3>
                    </div>
                    <div className="entry-button login-button" onClick={() => openLogin()}>
                        <h3>Log In</h3>
                    </div>
                </div>
                <Link to="/dashboard" className="demo-button" target="_blank"><h3>Try a Demo →</h3></Link>
            </div>
        </>
    )
}

export default Home