import React, { createElement, useState, useEffect, DetailedReactHTMLElement } from 'react';
import '../../static/portfolio.css';

import SessionState from '../../state/SessionState';
import UserAPI, { User, Holding } from '../../api/UserAPI.ts';
import AssetAPI, { Asset } from '../../api/AssetAPI.ts';

const HoldingsDisplay: React.FC<any> = ({ view, handleBuy, handleSell }) => {
    const state = SessionState();
    const assetApi = AssetAPI();

    const [holdings, setHoldings] = useState(state.getHoldings() as Holding[]);
    const [assetItems, setAssetItems] = useState(null);

    useEffect(() => {
        createAssetItems();
    }, [])

    async function createAssetItems() {
        const assetObjs = await Promise.all(holdings.map(async holding => {
            const assetObj: Asset = await assetApi.getAssetByTicker(holding.ticker);
            return assetObj;
        }));

        const items: DetailedReactHTMLElement<any, any>[] = assetObjs.map((assetObj) => {
            const ticker = assetObj.ticker;
            const name = assetObj.name;
            const price = assetObj.prices[assetObj.prices.length - 1]
            const change = ((price / assetObj.prices[assetObj.prices.length - 2]) * 100 - 100).toFixed(2);

            return createElement('div', { key: `asset-item-${assetObj.ticker}`, className: "asset-item"},
                [
                createElement('h3', { key: `ticker-${assetObj.ticker}` }, ticker),
                createElement('h4', { key: `name-${assetObj.ticker}` }, name),
                createElement('p', { key: `price-${assetObj.ticker}` }, "$" + price),
                createElement('p', { key: `change-${assetObj.ticker}`, className: `change ${price > 0 ? "positive" : "negative"}` },
                                    (price > 0 ? "↑" : "↓") +  change + "%")
                ]
            );
        })
        setAssetItems(items);
    }

    return (
        <div className={`holdings-display ${view}`}>
            { assetItems }
        </div>
    )
}

export default HoldingsDisplay;