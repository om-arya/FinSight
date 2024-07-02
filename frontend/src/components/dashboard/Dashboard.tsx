import React, { useState, useEffect } from 'react';
import { getAssetByTicker } from '../../api/AssetAPI.ts';
import { PiStarFourFill } from "react-icons/pi";
import '../../static/dashboard.css';

import { User } from '../../api/UserAPI.ts';

import Navbar from '../Navbar.tsx';
import Graph from './Graph';

const Dashboard: React.FC = () => {
    const [firstName, setFirstName] = useState("...");

    useEffect(() => {
        const root = document.querySelector(':root') as HTMLElement;
        const html = document.querySelector('html') as HTMLElement;
        
        root.style.setProperty("--bg-main-color", "#fafafa");
        root.style.setProperty("--text-main-color", "black");
        root.style.background = "var(--bg-third-color)";
        html.style["overflow-y"] = "scroll";

        const user: User = JSON.parse(sessionStorage.getItem("user"));
        setFirstName(user.firstName);
    }, [])

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

                    <div className="dashboard-container graph-container">
                        <Graph />
                    </div>

                    <div className="dashboard-container overview-container">
                        <h4>OVERVIEW</h4>
                    </div>
                </div>

                <div className="right-side">
                    <div className="dashboard-container leaderboard-container">
                        Top Movers
                    </div>

                    <div className="dashboard-container logo-container">
                        <img src="/fs_olivebranches_padding.png" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;