import React from 'react';

import SessionState from '../../state/SessionState';
import UserAPI, { User } from '../../api/UserAPI';

const DeleteAccountPanel: React.FC<any> = ({ closeDeleteAccount }) => {
    const state = SessionState();
    const user = state.getUser() as User;
    const userApi = UserAPI();

    function handleDeleteAccount() {
        state.clearSessionState();

        window.open("/", "_self");

        userApi.deleteUser(user.username);
    }

    return (
        <div className="delete-account-panel">
            <h1>Delete account</h1>
            <p>Are you sure you would like to delete your account forever?</p>
            <div className="delete-account-button-container">
                <div className="cancel-button" onClick={() => closeDeleteAccount()}>
                    <p>Cancel</p>
                </div>

                <div className="delete-account-button" onClick={() => handleDeleteAccount()}>
                    <p>Delete Account</p>
                </div>
            </div>
        </div>
    )
}

export default DeleteAccountPanel;