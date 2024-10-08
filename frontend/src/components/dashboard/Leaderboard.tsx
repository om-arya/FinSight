import React, { useState, useEffect, createElement, DetailedReactHTMLElement } from 'react';

import SessionState from '../../state/SessionState';
import { Asset } from '../../api/AssetAPI';

const Leaderboard: React.FC<any> = () => {
    const state = SessionState();

    const [topMoversIsActive, setTopMoversIsActive] = useState(true);
    const [topGainersIsActive, setTopGainersIsActive] = useState(false);
    const [topLosersIsActive, setTopLosersIsActive] = useState(false);

    const [leaderboardContent, setLeaderboardContent] = useState(
        <LeaderboardTab assets={ state.getTopAssetsByPriceChange() as Asset[] }/>
    );

    const today = new Date();
    let yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    return (
        <div className="dashboard-container leaderboard-container">
            <h1>Market Watch { `(${yesterday.getMonth() + 1}/${yesterday.getDate()}/${yesterday.getFullYear().toString().substring(2, 4)}
                                - ${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear().toString().substring(2, 4)})` }</h1>
            <div className="leaderboard-button-container">
                <div className={`leaderboard-button ${ topMoversIsActive ? "active" : ""}`} onClick={() => {
                    setTopMoversIsActive(true);
                    setTopGainersIsActive(false);
                    setTopLosersIsActive(false);
                    setLeaderboardContent(<LeaderboardTab assets={ state.getTopAssetsByPriceChange() as Asset[] }/>);
                }}>
                    <p>Top Movers</p>
                </div>
                <div className={`leaderboard-button ${ topGainersIsActive ? "active" : ""}`} onClick={() => {
                    setTopMoversIsActive(false);
                    setTopGainersIsActive(true);
                    setTopLosersIsActive(false);
                    setLeaderboardContent(<LeaderboardTab assets={ state.getTopAssetsByPriceGain() as Asset[] }/>);
                }}>
                    <p>Top Gainers</p>
                </div>
                <div className={`leaderboard-button ${ topLosersIsActive ? "active" : ""}`} onClick={() => {
                    setTopMoversIsActive(false);
                    setTopGainersIsActive(false);
                    setTopLosersIsActive(true);
                    setLeaderboardContent(<LeaderboardTab assets={ state.getTopAssetsByPriceLoss() as Asset[] }/>);
                }}>
                    <p>Top Losers</p>
                </div>
            </div>

            { leaderboardContent }

            <div className="leaderboard-footer">
                <p>* Our market data is updated daily M-F at 3:00 AM UTC.</p>
            </div>
        </div>
    )
}

const LeaderboardTab: React.FC<any> = ({ assets }) => {
    const [leaderboardItems, setLeaderboardItems] = useState(null);

    useEffect(() => {
        const items: DetailedReactHTMLElement<any, any>[] = assets.map((asset: Asset) => {
            const ticker = asset.ticker;
            const name = asset.name;
            const sector = asset.sector.toLowerCase().replaceAll(" ", "-");
            const price = asset.prices[asset.prices.length - 1];
            const change = ((price / asset.prices[asset.prices.length - 2]) * 100 - 100);
    
            const formattedPrice = `$${price.toFixed(2)}`;
            const formattedChange = `${(change > 0 ? "↑" : "↓")}${Math.abs(change).toFixed(2)}%`;
    
            return createElement('div', { key: `leaderboard-item-${ticker}`, className: `leaderboard-item ${sector}`},
                [
                createElement('h3', { key: `ticker-${ticker}` },
                    ticker),
                createElement('h4', { key: `name-${ticker}` },
                    name),
                createElement('p', { key: `price-${ticker}`, className: "price" },
                    formattedPrice),
                createElement('p', { key: `change-${ticker}`, className: `change ${change > 0 ? "positive" : "negative"}` },
                    formattedChange)
                ]
            );
        })
        setLeaderboardItems(items);
    }, [assets])
    

    return (
        <div className="top-movers">
            <div>{ leaderboardItems }</div>
        </div>
    )
}

export default Leaderboard;