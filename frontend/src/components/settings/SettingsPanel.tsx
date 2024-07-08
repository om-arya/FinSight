import React, { useState, useEffect } from 'react';
import { FaPencilAlt } from "react-icons/fa";
import '../../static/settings.css';

import SessionState from '../../state/SessionState';
import UserAPI, { User } from '../../api/UserAPI';

import Modal from '../Modal';

const SettingsPanel: React.FC<any> = ({ closeSettings, openChangePassword, openDeleteAccount }) => {
    const state = SessionState();
    const userApi = UserAPI();
    const user = state.getUser() as User;

    const [firstNameIsEnabled, setFirstNameIsEnabled] = useState(false);
    const [lastNameIsEnabled, setLastNameIsEnabled] = useState(false);
    const [emailIsEnabled, setEmailIsEnabled] = useState(false);

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.emailAddress);

    const [errorMessage, setErrorMessage] = useState(<br />);

    const emptyFirstNameError = "Error: You must have a first name.";
    const emptyLastNameError = "Error: You must have a last name."
    const emptyEmailError = "Error: You must have an email address.";
    const longFirstNameError = "Error: Your first name must be less than 250 characters."
    const longLastNameError = "Error: Your last name must be less than 250 characters."
    const longEmailError = "Error: Your email address must be less than 250 characters.";
    const invalidEmailError = "Error: Invalid email address.";

    async function handleSaveClick() {
        if (firstName.length < 1) {
            setErrorMessage(<>{ emptyFirstNameError }</>);
        } else if (lastName.length < 1) {
            setErrorMessage(<>{ emptyLastNameError} </>);
        } else if (email.length < 1) {
            setErrorMessage(<>{ emptyEmailError }</>);
        } else if (firstName.length >= 250) {
            setErrorMessage(<>{ longFirstNameError }</>);
        } else if (lastName.length >= 250) {
            setErrorMessage(<>{ longLastNameError }</>);
        } else if (email.length >= 250) {
            setErrorMessage(<>{ longEmailError }</>);
        } else if (!(email.includes('@')) || email.indexOf('@') < 1 || email.lastIndexOf('.') < email.indexOf('@') + 1
                   || email.lastIndexOf('.') === email.length - 1) {
            setErrorMessage(<>{ invalidEmailError }</>);
        } else {
            await saveSettings();
        }
    }

    useEffect(() => {
        setErrorMessage(<br />)
    }, [firstName, lastName, email])

    async function saveSettings() {
        await userApi.setUserFirstName(user.username, firstName);
        await userApi.setUserLastName(user.username, lastName);
        await userApi.setUserEmailAddress(user.username, email);
        state.setUser({
            username: user.username,
            firstName: firstName,
            lastName: lastName,
            emailAddress: email,
            password: user.password,
            holdings: user.holdings
        });
        window.location.reload();
    }

    return (
        <div className="settings-panel">
            <h1>Settings</h1>

            <div className="error-message">{ errorMessage }</div>

            <div className={`input-container ${firstNameIsEnabled ? "active" : ""}`}>
                <p>First Name</p>
                <input type="text" name="firstName" placeholder={firstName} 
                       onChange={e => setFirstName(e.target.value)}/>
                <FaPencilAlt className="icon" onClick={() => {
                    setLastNameIsEnabled(false);
                    setEmailIsEnabled(false);
                    setFirstNameIsEnabled(!firstNameIsEnabled);
                }}/>
            </div>

            <div className={`input-container ${lastNameIsEnabled ? "active" : ""}`}>
                <p>Last Name</p>
                <input type="text" name="lastName" placeholder={lastName} 
                       onChange={e => setLastName(e.target.value)}/>
                <FaPencilAlt className="icon" onClick={() => {
                    setFirstNameIsEnabled(false);
                    setEmailIsEnabled(false);
                    setLastNameIsEnabled(!lastNameIsEnabled);
                }}/>
            </div>

            <div className={`input-container ${emailIsEnabled ? "active" : ""}`}>
                <p>Email Address</p>
                <input type="text" name="emailAddress" placeholder={email} 
                       onChange={e => setEmail(e.target.value)}/>
                <FaPencilAlt className="icon" onClick={() => {
                    setFirstNameIsEnabled(false);
                    setLastNameIsEnabled(false);
                    setEmailIsEnabled(!emailIsEnabled);
                }}/>
            </div>

            <div className="upper-button-container">
                <div className="change-password-button" onClick={() => openChangePassword()}>
                    <p>Change Password</p>
                </div>

                <div className="delete-account-button" onClick={() => openDeleteAccount()}>
                    <p>Delete Account</p>
                </div>
            </div>

            <div className="lower-button-container">
                <div className="cancel-button" onClick={() => closeSettings()}>
                    <p>Cancel</p>
                </div>

                <div className="save-button" onClick={() => handleSaveClick()}>
                    <p>Save</p>
                </div>
            </div>
        </div>
    )
}

export default SettingsPanel;