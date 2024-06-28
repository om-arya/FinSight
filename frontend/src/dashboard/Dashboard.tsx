import React, { useEffect } from 'react';
import './dashboard.css';

import Navbar from '../Navbar';
import Graph from './Graph';

const Dashboard: React.FC = () => {
    useEffect(() => {
        const root = document.querySelector(':root') as HTMLElement;
        
        root.style.setProperty("--bg-main-color", "#fafafa");
        root.style.background = "var(--bg-third-color)";
    }, [])

    return (
        <>
            <Navbar />
            <div className="dashboard">
                <h1>👋 Hi <strong>Guest,</strong> welcome back.</h1>
                <p>What would you like to accomplish today?</p>

                <div className="returns-container">
                    <div className="returns-box">
                        <p>Today's Return</p>
                        <h3>$39.45</h3>
                    </div>
                    <div className="returns-box">
                        <p>Total Return</p>
                        <h3>$42.45</h3>
                    </div>
                </div>

                <div className="graph-container">
                    <Graph />
                </div>
            </div>
        </>
    )
}

export default Dashboard;