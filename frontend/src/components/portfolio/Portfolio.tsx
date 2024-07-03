import React, { useEffect, useState, useMemo, createElement, DetailedReactHTMLElement } from 'react';
import '../../static/portfolio.css';

import SessionState from '../../state/SessionState.ts';
import UserAPI, { User, Holding } from '../../api/UserAPI.ts';
import AssetAPI, { Asset } from '../../api/AssetAPI.ts';
import { TICKERS } from '../../api/data/TICKERS.ts';

import Navbar from '../Navbar';

const Portfolio: React.FC = () => {
    const state = SessionState();
    const user = state.getUser() as User;
    const [holdings, setHoldings] = useState(state.getHoldings() as Holding[]);
    
    const userApi = UserAPI();
    const assetApi = AssetAPI();

    const [assetCards, setAssetCards] = useState(null);

    useEffect(() => {
        createAssetCards();
    }, [])

    async function createAssetCards() {
        const assetObjs = await Promise.all(holdings.map(async holding => {
            const assetObj: Asset = await assetApi.getAssetByTicker(holding.ticker);
            return assetObj;
        }));

        const cards: DetailedReactHTMLElement<any, any>[] = assetObjs.map((assetObj) => {
            const ticker = assetObj.ticker;
            const name = assetObj.name;
            const price = assetObj.prices[assetObj.prices.length - 1]
            const diff = ((price / assetObj.prices[assetObj.prices.length - 2]) * 100 - 100).toFixed(2) + "%";

            return createElement('div', { key: `asset-card-${assetObj.ticker}`, className: "asset-card"},
                [
                createElement('h3', { key: `ticker-${assetObj.ticker}`, onClick: () => handleBuy(ticker, 1, price) }, ticker),
                createElement('h4', { key: `name-${assetObj.ticker}`}, name),
                createElement('p', {key: `price-${assetObj.ticker}`}, price),
                createElement('p', {key: `diff-${assetObj.ticker}`}, diff)
                ]
            );
        })
        setAssetCards(cards);
    }

    async function handleBuy(ticker: string, amount: number, price: number) {
        const index = user.heldTickers.indexOf(ticker);
        
        if (index >= 0) {
            user.heldAmounts[index] += amount;
            user.heldProfits[index] -= price * amount;
        } else {
            user.heldTickers.push(ticker);
            user.heldAmounts.push(amount);
            user.heldAmounts.push(-1 * price);
        }

        await userApi.setHoldings(user.username, user.heldTickers, user.heldAmounts, user.heldProfits);
    }

    async function handleSell(ticker: string, amount: number, price: number) {
        const index = user.heldTickers.indexOf(ticker);

        user.heldAmounts[index] -= amount;
        user.heldProfits[index] += price * amount;
        if (user.heldAmounts[index] === 0) {
            user.heldTickers.splice(index, 1);
            user.heldAmounts.splice(index, 1);
            user.heldProfits.splice(index, 1);
        }

        await userApi.setHoldings(user.username, user.heldTickers, user.heldAmounts, user.heldProfits);
    }

    return (
        <>
            <Navbar />
            <div className="portfolio">
                <h1>Your Portfolio</h1>
                <p>Today is a good day to invest in your future; we're here to help you get on track.</p>

                <div className = "asset-card-container">
                    { assetCards }
                </div>
            </div>
        </>
    )
}

export default Portfolio;