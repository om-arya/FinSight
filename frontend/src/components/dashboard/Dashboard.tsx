import React, { useState, useEffect } from 'react';
import { PiStarFourFill } from "react-icons/pi";
import '../../static/dashboard.css';

import SessionState from '../../state/SessionState.ts';
import { User } from '../../api/UserAPI.ts';

import Navbar from '../Navbar.tsx';
import Footer from '../Footer.tsx';
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

    const todayReturn = state.getTodayReturn() as number;
    const quarterlyReturn = state.getQuarterlyReturn() as number;
    const annualReturn = state.getAnnualReturn() as number;

    return (
        <>
            <Navbar />

            <div className="dashboard">
                <div className="left-side">
                    <div className="dashboard-header">
                        <h1>👋 Hi <strong>{ firstName.length >= 18 ? firstName.substring(0, 18) + "..." : firstName }</strong>, welcome back.</h1>
                        <p>What would you like to accomplish today?</p>
                    </div>

                    <div className="returns-container">
                        <div className="returns-box todays-return">
                            <PiStarFourFill className="icon"/>
                            <p>Today's Return</p>
                            <h3>{`${todayReturn < 0 ? "-$" : "$"}${Math.abs(todayReturn).toFixed(2)}`}</h3>
                        </div>
                        <div className="returns-box quarterly-return">
                            <PiStarFourFill className="icon"/>
                            <p>Compound Quarterly Return</p>
                            <h3>{`${quarterlyReturn < 0 ? "-$" : "$"}${Math.abs(quarterlyReturn).toFixed(2)}`}</h3>
                        </div>
                        <div className="returns-box compound-annual-return">
                            <PiStarFourFill className="icon"/>
                            <p>Compound Annual Growth Rate</p>
                            <h3>{`${annualReturn < 0 ? "-" : ""}${Math.abs(annualReturn).toFixed(2)}%`}</h3>
                        </div>
                    </div>

                    <Graph />

                    <Overview />
                </div>

                <div className="right-side">
                    <Leaderboard />
                </div>
            </div>
            
            <Footer />
        </>
    )
}

export default Dashboard;