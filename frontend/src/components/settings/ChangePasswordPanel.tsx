import React, { useState, useEffect } from 'react';

import SessionState from '../../state/SessionState';
import UserAPI, { User } from '../../api/UserAPI';

const ChangePasswordPanel: React.FC<any> = ({ closeChangePassword }) => {
    const state = SessionState();
    const user = state.getUser() as User;
    const userApi = UserAPI();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [errorMessage, setErrorMessage]: any = useState(<br />);

    const incorrectOldPasswordError = "Error: Incorrect old password."
    const newPasswordMismatchError = "Error: Your new passwords do not match."
    const samePasswordError = "Error: Your new password is the same as your old password."
    const shortNewPasswordError = "Error: Your new password must be at least 6 characters.";
    const longNewPasswordError = "Error: Your new password must be less than 250 characters.";

    async function handleSaveClick() {
        if (oldPassword !== user.password) {
            setErrorMessage(incorrectOldPasswordError);
        } else if (newPassword !== confirmNewPassword) {
            setErrorMessage(newPasswordMismatchError);
        } else if (oldPassword === newPassword) {
            setErrorMessage(samePasswordError);
        } else if (newPassword.length < 6) {
            setErrorMessage(shortNewPasswordError);
        } else if (newPassword.length >= 250) {
            setErrorMessage(longNewPasswordError);
        } else {
            await changePassword();
        }
    }

    useEffect(() => {
        setErrorMessage(<br />);
    }, [oldPassword, newPassword, confirmNewPassword])

    async function changePassword() {
        await userApi.setUserPassword(user.username, newPassword);
        state.setUser({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.emailAddress,
            password: newPassword,
            holdings: user.holdings
        });
        window.location.reload();
    }

    return (
        <div className="change-password-panel">
            <h1>Change Password</h1>

            <div className="error-message">{ errorMessage }</div>

            <div className="input-container">
                <p>Old Password</p>
                <input type="password" name="oldPassword"
                       onChange={e => setOldPassword(e.target.value)}/>
            </div>

            <div className="input-container">
                <p>New Password</p>
                <input type="password" name="newPassword"
                       onChange={e => setNewPassword(e.target.value)}/>
            </div>

            <div className="input-container">
                <p>Confirm New Password</p>
                <input type="password" name="confirmNewPassword"
                       onChange={e => setConfirmNewPassword(e.target.value)}/>
            </div>

            <div className="change-password-button-container">
                <div className="cancel-button" onClick={() => closeChangePassword()}>
                    <p>Cancel</p>
                </div>

                <div className="save-button" onClick={() => handleSaveClick()}>
                    <p>Save</p>
                </div>
            </div>
        </div>
    )
}

export default ChangePasswordPanel;