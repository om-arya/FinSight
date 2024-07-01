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
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");

    function openSignup() {
        setModalContent(
        <>
            <TbLetterX className="icon" onClick={() => closeSignup()}/>
            <SignupPanel />
        </>
        );
        setIsOpen(true);
    }

    function closeSignup() {
        setIsOpen(false);
        setModalContent(<></>);
    }

    async function logInUser() {
        let response: ResponseEntity = await getUserByUsername(usernameOrEmail);
        if (response.status === 404) {
            response = await getUserByEmailAddress(usernameOrEmail);
            if (response.status === 404) {
                console.log("Not found.");
                return;
            }
        }
        navigate("/dashboard");
    }

    return (
        <div className="login-panel">
            <div className="login-header">
                <h1>Welcome to FinSight.</h1>
                <p>Please enter your credentials to log in to your account.</p>
            </div>

            <div className="input-container">
                <FaRegUser className="icon" id="user-icon" />
                <input type="text" name="usernameOrEmail" placeholder="Your username or email"
                       onChange={e => setUsernameOrEmail(e.target.value)}/>
            </div>
            <div className="input-container">
                <MdLockOutline className="icon" />
                <input type="password" name="password" placeholder="Your password"
                       onChange={e => setPassword(e.target.value)}/>
            </div>

            <div className="create-account-button" onClick={() => openSignup()}>
                <p>Create an account</p>
            </div>

            <div className="login-button" onClick={() => logInUser()}>
                <p>Log In</p>
            </div>

            <Modal open={ isOpen }>{ modalContent }</Modal>
        </div>
    )
}

export default LoginPanel;