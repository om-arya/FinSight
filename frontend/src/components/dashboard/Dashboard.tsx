import React, { useState, useEffect } from 'react';
import { PiStarFourFill } from "react-icons/pi";
import '../../static/dashboard.css';

import SessionState from '../../state/SessionState.ts';
import { User } from '../../api/UserAPI.ts';

import Navbar from '../Navbar.tsx';
import Graph from './Graph';
import Overview from './Overview.tsx';
import Leaderboard from './Leaderboard.tsx';

const Dashboard: React.FC = () => {
    const state = SessionState();
    const user = state.getUser() as User;
    
    const [firstName, setFirstName] = useState("...");

    useEffect(() => {
        setFirstName(user.firstName);
    }, [user.firstName]);

    return (
        <>
            <Navbar />
            <div className="dashboard">
                <div className="left-side">
                    <div className="dashboard-header">
                        <h1>👋 Hi <strong>{ firstName }</strong>, welcome back.</h1>
                        <p>What would you like to accomplish today?</p>
                    </div>

                    <div className="returns-container">
                        <div className="returns-box todays-return">
                            <PiStarFourFill className="icon"/>
                            <p>Today's Return</p>
                            <h3>$137.23</h3>
                        </div>
                        <div className="returns-box compound-annual-return">
                            <PiStarFourFill className="icon"/>
                            <p>Compound Annual Return</p>
                            <h3>$5,433.58</h3>
                        </div>
                        <div className="returns-box total-return">
                            <PiStarFourFill className="icon"/>
                            <p>Total Return</p>
                            <h3>$14,234.45</h3>
                        </div>
                    </div>

                    <Graph />

                    <Overview />
                </div>

                <div className="right-side">
                    <Leaderboard />
                </div>
            </div>
        </>
    )
}

export default Dashboard;