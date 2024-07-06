import React, { useState, useEffect, createElement, DetailedReactHTMLElement } from 'react';
import { PiStarFourFill } from "react-icons/pi";
import '../../static/dashboard.css';

import SessionState from '../../state/SessionState.ts';
import { User, Holding } from '../../api/UserAPI.ts';
import AssetAPI, { Asset } from '../../api/AssetAPI.ts';

import Navbar from '../Navbar.tsx';
import Graph from './Graph';

const Dashboard: React.FC = () => {
    const state = SessionState();
    const user = state.getUser() as User;
    const assetApi = AssetAPI();
    
    const [firstName, setFirstName] = useState("...");
    const [assetItems, setAssetItems] = useState(null);

    useEffect(() => {
        setFirstName(user.firstName);
        createAssetItems();
    }, []);

    useEffect(() => {
        createAssetItems();
    }, [state.getHoldings()]);

    async function createAssetItems() {
        const holdings = state.getHoldings() as Holding[];
        const amounts = holdings.map(holding => { return holding.amount; });
        const assetObjs = await Promise.all(holdings.map(async holding => {
            const assetObj: Asset = await assetApi.getAssetByTicker(holding.ticker);
            return assetObj;
        }));

        const items: DetailedReactHTMLElement<any, any>[] = assetObjs.map((assetObj, i) => {
            const ticker = assetObj.ticker;
            const name = assetObj.name;
            const sector = assetObj.sector.toLowerCase().replaceAll(" ", "-");
            const price = assetObj.prices[assetObj.prices.length - 1];
            const change = ((price / assetObj.prices[assetObj.prices.length - 2]) * 100 - 100);

            return createElement('div', { key: `asset-item-${ticker}`, className: `asset-item ${sector}`},
                [
                createElement('h3', { key: `ticker-${ticker}` }, ticker),
                createElement('h4', { key: `name-${ticker}` }, name),
                createElement('p', { key: `price-${ticker}`, className: "price" }, `$${price.toFixed(2)}`),
                createElement('div', { key: `amount-${ticker}`, className: "amount" }, amounts[i]),
                createElement('div', { key: `value-${ticker}`, className: "value" }, `$${(price * amounts[i]).toFixed(2)}`),
                createElement('p', { key: `change-${ticker}`, className: `change ${change > 0 ? "positive" : "negative"}` },
                             `${(change > 0 ? "↑" : "↓")}${Math.abs(change).toFixed(2)}%`),
                ]
            );
        })
        setAssetItems(items);
    }

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
                        { assetItems }
                    </div>
                </div>

                <div className="right-side">
                    <div className="dashboard-container leaderboard-container">
                        Top Movers
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;