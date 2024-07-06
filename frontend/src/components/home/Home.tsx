import React from 'react';
import '../../static/home.css';

import SessionState from '../../state/SessionState.ts';
import UserAPI, { User, Holding } from '../../api/UserAPI.ts';

import LoginPanel from './LoginPanel.tsx';

const Home: React.FC = () => {
    const state = SessionState();
    const userApi = UserAPI();

    function handleLogin(user: User) {
        state.setUser(user);
        
        const holdings: Holding[] = user.holdings;
        state.setHoldings(holdings);
    }

    async function handleGuestLogin() {
        const guest: User = await userApi.getUserByUsername("guest");
        handleLogin(guest);
        window.open('/dashboard','_blank');
    }

    return (
        <div className="home">
            <div className="left-side">
                <img className="logo" src="/fs_olivebranches_padding.png" />
            </div>
            <div className="right-side">
                <LoginPanel handleLogin={(user: User) => handleLogin(user)}/>
                <p className="guest-login">Just visiting?<span onClick={() => handleGuestLogin()}>Log in as a Guest.</span></p>
            </div>
        </div>
    )
}

export default Home;