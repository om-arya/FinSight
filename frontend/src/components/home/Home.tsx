import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Transaction, ResponseEntity, createUser } from '../../api/UserAPI.ts';
import '../../static/home.css';

import Modal from '../Modal.tsx';

const Home: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const root = document.querySelector(':root') as HTMLElement;
        
        root.style.setProperty("--bg-main-color", "white");
        root.style.setProperty("--text-main-color", "black");
        root.style.background = "var(--bg-main-color)";
    }, [])

    const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState(<></>);

    const [registerMessage, setRegisterMessage] = useState("");
    const [registerSuccess, setRegisterSuccess] = useState(false);

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

    async function registerUser() {
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
            transactions: []
        };

        const response: ResponseEntity = await createUser(user);
        const status: string = response.data;
        const registerMessage = document.querySelector('.register-message') as HTMLElement;

        if (status === "OK") {
            setRegisterSuccess(true);
            setRegisterMessage("Success! Logging you in...");
            registerMessage.scrollIntoView( { behavior: 'smooth', block: 'start' } );
            setTimeout(() => {
                closeModal();
                navigate("/dashboard");
            }, 3000);
        } else if (status === "USERNAME_CONFLICT") {
            setRegisterMessage("* Username is already taken. Please choose a different username.");
            registerMessage.scrollIntoView( { behavior: 'smooth', block: 'start' } );
        } else if (status === "EMAIL_ADDRESS_CONFLICT") {
            setRegisterMessage("* Email address is already taken. Please use a different email address.");
            registerMessage.scrollIntoView( { behavior: 'smooth', block: 'start' } );
        } else {
            setRegisterMessage("* Internal server error. Please try again later.");
            registerMessage.scrollIntoView( { behavior: 'smooth', block: 'start' } );
        }
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

    function closeModal() {
        setModalContent(<></>);
        setIsOpen(false);
    }

    return (
        <>
            <div className="home">
                <div className="entry-button-container">
                    <div className="entry-button signup-button" onClick={() => openSignup()}>
                        <h3>Sign Up</h3>
                    </div>
                    <div className="entry-button login-button" onClick={() => openLogin()}>
                        <h3>Log In</h3>
                    </div>
                    <div className="guest-login-container">
                        <a href="/dashboard" className="guest-login-button" target="_blank"><h3>Try FinSight →</h3></a>
                        <p>Log in as Guest.<br />Note: Your changes will not be saved.</p>
                    </div>
                </div>

                <div className="welcome-text-container">
                    <h1>Welcome to FinSight.</h1>
                    <p>Get started now.</p>
                </div>
                
                <Modal open={isOpen}>
                    { modalContent }
                    <div className={registerSuccess ? "register-message success" : "register-message failure"}>{registerMessage}</div>
                </Modal>
            </div>
        </>
    )
}

export default Home;