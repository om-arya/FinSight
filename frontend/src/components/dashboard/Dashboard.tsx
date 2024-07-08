import React, { useState, useEffect } from 'react';
import { PiStarFourFill } from "react-icons/pi";
import '../../static/dashboard.css';

import SessionState from '../../state/SessionState.ts';
import { User, Holding } from '../../api/UserAPI.ts';
import { Asset } from '../../api/AssetAPI.ts';

import Navbar from '../Navbar.tsx';
import Footer from '../Footer.tsx';
import Graph from './Graph';
import Overview from './Overview.tsx';
import Leaderboard from './Leaderboard.tsx';

const Dashboard: React.FC = () => {
    const state = SessionState();
    const user = state.getUser() as User;
    
    const [firstName, setFirstName] = useState("...");

    const [todayReturn, setTodayReturn] = useState(0);
    const [quarterlyReturn, setQuarterlyReturn] = useState(0);
    const [annualReturn, setAnnualReturn] = useState(0);

    useEffect(() => {
        setFirstName(user.firstName);
    }, [user.firstName]);

    useEffect(() => {
        console.log(sessionStorage);
        const holdings: Holding[] = user.holdings;
        holdings.sort((a: Holding, b: Holding) => a.ticker.localeCompare(b.ticker));

        const holdingAssets: Asset[] = state.getHoldingAssets();
        holdingAssets.sort((a, b) => a.ticker.localeCompare(b.ticker));

        let todayReturn = 0;
        let totalCompoundQuarterlyReturn = 0;
        let totalCompoundAnnualReturn = 0;

        holdingAssets.forEach(async (asset, i) => {
            const prices = asset.prices;
            todayReturn += holdings[i].amount * (prices[prices.length - 1] - prices[prices.length - 2]);
            totalCompoundQuarterlyReturn += (prices[prices.length - 1] / prices[0])^(1 / (prices.length / 91.3125)) - 1;
            totalCompoundAnnualReturn += (prices[prices.length - 1] / prices[0])^(1 / (prices.length / 365.0)) - 1;
        });

        setTodayReturn(todayReturn);
        setQuarterlyReturn(totalCompoundQuarterlyReturn);
        setAnnualReturn(holdings.length === 0 ? 0 : totalCompoundAnnualReturn / holdings.length);
    }, [])

    return (
        <>
            <Navbar />

            <div className="dashboard">
                <div className="left-side">
                    <div className="dashboard-header">
                        <h1>👋 Hi <strong>{ firstName.length >= 15 ? firstName.substring(0, 15) + "..." : firstName }</strong>, welcome back.</h1>
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