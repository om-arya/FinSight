import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa6';
import { MdLockOutline } from 'react-icons/md';
import { TbLetterX } from 'react-icons/tb';
import '../../static/home.css';

import { ResponseEntity, getUserByUsername, getUserByEmailAddress } from '../../api/UserAPI';

import Modal from '../Modal';
import SignupPanel from './SignupPanel';

const LoginPanel: React.FC = () => {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState(<></>);

    function openSignup() {
        setModalContent(
        <>
            <SignupPanel cancelSignup={() => closeSignup()}/>
        </>
        );
        setIsOpen(true);
    }

    function closeSignup() {
        setIsOpen(false);
        setModalContent(<></>);
    }

    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage]: any = useState(<br />);

    const emptyFieldError = "Error: You must fill out every field.";
    const userDoesNotExistError = "Error: Invalid username/email address.";
    const incorrectPasswordError = "Error: Incorrect password.";

    async function handleLoginClick() {
        if (usernameOrEmail.length < 1 || password.length < 1) {
            setErrorMessage(emptyFieldError);
            return;
        }

        let response: ResponseEntity = await getUserByUsername(usernameOrEmail);
        if (!response || response.status !== 200) {
            response = await getUserByEmailAddress(usernameOrEmail);
            if (!response || response.status !== 200) {
                setErrorMessage(userDoesNotExistError);
            }
        } else {
            navigate("/dashboard");
        }
    }

    return (
        <div className="login-panel">
            <div className="login-header">
                <h1>Welcome to FinSight.</h1>
                <p>Please enter your credentials to log in to your account.</p>
            </div>

            <div className="error-message">{ errorMessage }</div>

            <form>
                <div className="input-container">
                    <FaRegUser className="icon" id="user-icon" />
                    <input type="text" name="usernameOrEmail" placeholder="Your username or email" autoComplete="on"
                        onChange={e => setUsernameOrEmail(e.target.value)}/>
                </div>
                <div className="input-container">
                    <MdLockOutline className="icon" />
                    <input type="password" name="password" placeholder="Your password" autoComplete="on"
                        onChange={e => setPassword(e.target.value)}/>
                </div>
            </form>

            <div className="create-account-button" onClick={() => openSignup()}>
                <p>Create an account</p>
            </div>

            <div className="login-button" onClick={() => handleLoginClick()}>
                <p>Log In</p>
            </div>

            <Modal open={ isOpen }>{ modalContent }</Modal>
        </div>
    )
}

export default LoginPanel;