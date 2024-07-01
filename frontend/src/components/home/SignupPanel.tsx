import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa6';
import { MdEmail, MdLockOutline } from 'react-icons/md';
import '../../static/home.css';

import { createUser } from '../../api/UserAPI';

const SignupPanel: React.FC = () => {
    const navigate = useNavigate();

    function createAccount() {
        navigate("/dashboard");
    }

    return (
        <div className="signup-panel">
            <h1>Create an Account</h1>
            <p>Please fill out the following fields to create your account.</p>

            <div className="input-container">
                <FaRegUser className="icon" id="user-icon" />
                <input type="text" name="username" placeholder="Your username"/>
            </div>
            <div className="input-container">
                <MdEmail className="icon" />
                <input type="text" name="email" placeholder="Your email address"/>
            </div>
            <div className="input-container">
                <MdLockOutline className="icon" />
                <input type="password" name="password" placeholder="Your password"/>
            </div>
            <div className="input-container">
                <MdLockOutline className="icon" />
                <input type="password" name="confirmPassword" placeholder="Confirm your password"/>
            </div>

            <div className="signup-button" onClick={() => createAccount()}>
                <p>Create Account</p>
            </div>
        </div>
    )
}

export default SignupPanel;