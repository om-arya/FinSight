import React, { useState, useEffect, createElement, DetailedReactHTMLElement } from 'react';
import '../../static/dashboard.css';

import SessionState from '../../state/SessionState.ts';
import { Holding } from '../../api/UserAPI.ts';
import { Asset } from '../../api/AssetAPI.ts';

const Overview: React.FC = () => {
    const state = SessionState();

    const [overviewItems, setOverviewItems] = useState(null);
    const [allIsActive, setAllIsActive] = useState(true);
    const [gainersIsActive, setGainersIsActive] = useState(false);
    const [losersIsActive, setLosersIsActive] = useState(false);

    const negativeRange = [-Infinity, 0];
    const fullRange = [-Infinity, Infinity];
    const positiveRange = [0, Infinity];
    const [changeRange, setChangeRange] = useState(fullRange);

    useEffect(() => {
        createOverviewItems();
    }, [changeRange]);

    async function createOverviewItems() {
        const holdings = state.getHoldings() as Holding[];
        const amounts = holdings.map(holding => { return holding.amount; });
        const holdingAssets = state.getHoldingAssets() as Asset[];

        const items: DetailedReactHTMLElement<any, any>[] = holdingAssets.map((holdingAsset: Asset, i) => {
            const price = holdingAsset.prices[holdingAsset.prices.length - 1];
            const change = ((price / holdingAsset.prices[holdingAsset.prices.length - 2]) * 100 - 100);

            if (change < changeRange[0] || change > changeRange[1]) {
                return;
            }

            const ticker = holdingAsset.ticker;
            const exchangeAndTicker = `${holdingAsset.exchange}:${ticker}`;
            const name = holdingAsset.name;
            const sector = holdingAsset.sector.toLowerCase().replaceAll(" ", "-");

            const formattedPrice = `$${price.toFixed(2)}`;
            const formattedChange = `${(change > 0 ? "↑" : "↓")}${Math.abs(change).toFixed(2)}%`;

            return createElement('div', { key: `overview-item-${ticker}`, className: `overview-item ${sector}`},
                [
                createElement('h3', { key: `exchange-and-ticker-${ticker}` },
                    exchangeAndTicker),
                createElement('h4', { key: `name-${ticker}` },
                    name),
                createElement('p', { key: `price-${ticker}`, className: "price" },
                    formattedPrice),
                createElement('div', { key: `amount-${ticker}`, className: "amount" },
                    amounts[i]),
                createElement('p', { key: `change-${ticker}`, className: `change ${change > 0 ? "positive" : "negative"}` },
                    formattedChange)
                ]
            );
        })
        setOverviewItems(items);
    }

    return (
        <div className="dashboard-container overview-container">
            <div className="overview-top-container">
                <h4>OVERVIEW</h4>
                <div className="overview-button-container">
                    <div className={`overview-button all-button ${ allIsActive ? "active" : ""}`} onClick={() => {
                        setChangeRange(fullRange);
                        setAllIsActive(true);
                        setGainersIsActive(false);
                        setLosersIsActive(false);
                    }}>
                        <p>All</p>
                    </div>
                    <div className={`overview-button all-button ${ gainersIsActive ? "active" : ""}`} onClick={() => {
                        setChangeRange(positiveRange);
                        setAllIsActive(false);
                        setGainersIsActive(true);
                        setLosersIsActive(false);
                    }}>
                        <p>Gainers</p>
                    </div>
                    <div className={`overview-button all-button ${ losersIsActive ? "active" : ""}`} onClick={() => {
                        setChangeRange(negativeRange);
                        setAllIsActive(false);
                        setGainersIsActive(false);
                        setLosersIsActive(true);
                    }}>
                        <p>Losers</p>
                    </div>
                </div>
            </div>
            <div className="column-labels">
                <p>SYMBOL</p>
                <p>NAME</p>
                <p>PRICE</p>
                <p>QUANTITY</p>
                <p>% CHANGE</p>
            </div>
            { overviewItems }
        </div>
    )
}

export default Overview;