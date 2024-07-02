import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiFileUserLine } from "react-icons/ri";
import { FaRegUser } from 'react-icons/fa6';
import { MdEmail, MdLockOutline } from 'react-icons/md';
import '../../static/home.css';

import { User, ResponseEntity, createUser, getUserByEmailAddress, getUserByUsername } from '../../api/UserAPI';

const SignupPanel: React.FC<any> = ({ cancelSignup }) => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errorMessage, setErrorMessage]: any = useState(<br />);

    const emptyFieldError = "Error: You must fill out every field.";
    const longFirstNameError = "Error: Your first name must be less than 250 characters."
    const longLastNameError = "Error: Your last name must be less than 250 characters."
    const longUsernameError = "Error: Your username must be less than 30 characters.";
    const invalidUsernameCharacterError = "Error: Your username must only include letters, numbers, and '-' symbols.";
    const invalidUsernameDashError = "Error: Your username must not start or end with a  '-' symbol.";
    const longEmailError = "Error: Your email address must be less than 250 characters.";
    const invalidEmailError = "Error: Invalid email address.";
    const shortPasswordError = "Error: Your password must be at least 6 characters.";
    const longPasswordError = "Error: Your password must be less than 250 characters.";
    const passwordMismatchError = "Error: Your passwords do not match.";
    const usernameConflictError = "Error: This username is already taken. Please choose a different one.";
    const emailConflictError = "Error: This email address is already in use. Please use a different one.";

    function handleCreateAccountClick() {
        if (firstName.length < 1 || lastName.length < 1 || username.length < 1 || email.length < 1) {
            setErrorMessage(emptyFieldError)
        } else if (!(email.includes('@')) || email.indexOf('@') < 1 || email.lastIndexOf('.') < email.indexOf('@') + 1
                   || email.lastIndexOf('.') === email.length - 1) {
            setErrorMessage(invalidEmailError);
        } else if (password.length < 6) {
            setErrorMessage(shortPasswordError);
        } else if (password !== confirmPassword) {
            setErrorMessage(passwordMismatchError);
        } else {
            createAccount();
        }
    }

    useEffect(() => {
        if (firstName.length >= 250) {
            setErrorMessage(longFirstNameError);
        } else if (errorMessage === longFirstNameError) {
            setErrorMessage(<br />)
        }
    }, [firstName])

    useEffect(() => {
        if (lastName.length >= 250) {
            setErrorMessage(longLastNameError);
        } else if (errorMessage === longLastNameError) {
            setErrorMessage(<br />)
        }
    }, [lastName])

    useEffect(() => {
        if (username.length >= 30) {
            setErrorMessage(longUsernameError);
        } else if (username.charAt(0) === '-'|| username.charAt(username.length - 1) === '-') {
            setErrorMessage(invalidUsernameDashError);
        } else if (username.length > 0 && !(username.match(/^[a-zA-Z0-9-]+$/))) { 
            setErrorMessage(invalidUsernameCharacterError)
         } else if (errorMessage === longUsernameError || errorMessage === invalidUsernameDashError
                    || errorMessage === invalidUsernameCharacterError) {
            setErrorMessage(<br />);
        }
    }, [username]);

    useEffect(() => {
        if (email.length >= 250) {
            setErrorMessage(longEmailError);
        } else if (errorMessage === longEmailError) {
            setErrorMessage(<br />);
        }
    }, [email]);

    useEffect(() => {
        if (password.length >= 250) {
            setErrorMessage(longPasswordError);
        } else if (errorMessage === longPasswordError) {
            setErrorMessage(<br />);
        }
    }, [password]);

    async function createAccount() {
        const newUser: User = {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            emailAddress: email,
            transactionDates: [],
            transactionTickers: [],
            transactionAmounts: []
        }

        const response: ResponseEntity = await createUser(newUser);
        if (response.data === "USERNAME_CONFLICT") {
            setErrorMessage(usernameConflictError);
        } else if (response.data === "EMAIL_ADDRESS_CONFLICT") {
            setErrorMessage(emailConflictError);
        } else {
            logInUser();
        }
    }

    async function logInUser() {
        setErrorMessage(<br />);
        const newUserObj = await getUserByUsername(username);
        sessionStorage.setItem("user", JSON.stringify(newUserObj.data));
        navigate("/dashboard");
    }

    return (
        <div className="signup-panel">
            <div className="signup-header">
                <h1>Create an account</h1>
                <p>Welcome to FinSight!</p>
            </div>

            <div className="error-message">{ errorMessage }</div>

            <form>
                <div className="input-container">
                    <RiFileUserLine className="icon" />
                    <input type="text" name="firstName" placeholder="Your first name" autoComplete="on"
                           onChange={e => setFirstName(e.target.value)}/>
                </div>
                <div className="input-container">
                    <RiFileUserLine className="icon" />
                    <input type="text" name="lastName" placeholder="Your last name" autoComplete="on"
                           onChange={e => setLastName(e.target.value)}/>
                </div>
                <div className="input-container">
                    <FaRegUser className="icon" id="user-icon" />
                    <input type="text" name="username" placeholder="Your username" autoComplete="on"
                           onChange={e => setUsername(e.target.value)}/>
                </div>
                <div className="input-container">
                    <MdEmail className="icon" />
                    <input type="text" name="email" placeholder="Your email address" autoComplete="on"
                           onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="input-container">
                    <MdLockOutline className="icon" />
                    <input type="password" name="password" placeholder="Your password" autoComplete="on"
                           onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="input-container">
                    <MdLockOutline className="icon" />
                    <input type="password" name="confirmPassword" placeholder="Confirm your password" autoComplete="on"
                           onChange={e => setConfirmPassword(e.target.value)}/>
                </div>
            </form>

            <div className="signup-button-container">
                <div className="cancel-button" onClick={() => cancelSignup()}>
                    <p>← Cancel</p>
                </div>
                <div className="signup-button" onClick={() => handleCreateAccountClick()}>
                    <p>Create Account</p>
                </div>
            </div>
        </div>
    )
}

export default SignupPanel;