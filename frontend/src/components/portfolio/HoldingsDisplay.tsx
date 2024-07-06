import React, { createElement, useState, useEffect, DetailedReactHTMLElement } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import '../../static/portfolio.css';

import SessionState from '../../state/SessionState';
import UserAPI, { User, Holding } from '../../api/UserAPI.ts';
import AssetAPI, { Asset } from '../../api/AssetAPI.ts';

const HoldingsDisplay: React.FC<any> = ({ view, holdings, handleBuy, handleSell }) => {
    const state = SessionState();

    const [popupIsOpen, setPopupIsOpen] = useState(false);
    const [assetItems, setAssetItems] = useState(null);

    useEffect(() => {
        createAssetItems();
    }, [holdings])

    async function createAssetItems() {
        const amounts = holdings.map((holding: Holding) => { return holding.amount; });
        const holdingAssets = state.getHoldingAssets() as Asset[];

        const items: DetailedReactHTMLElement<any, any>[] = holdingAssets.map((holdingAsset: Asset, i) => {
            const ticker = holdingAsset.ticker;
            const name = holdingAsset.name;
            const sector = holdingAsset.sector.toLowerCase().replaceAll(" ", "-");
            const price = holdingAsset.prices[holdingAsset.prices.length - 1];
            const value = price * amounts[i];
            const change = ((price / holdingAsset.prices[holdingAsset.prices.length - 2]) * 100 - 100);

            const formattedPrice = `$${price.toFixed(2)}`;
            const formattedValue = `$${(value).toFixed(2)}`;
            const formattedChange = `${(change > 0 ? "↑" : "↓")}${Math.abs(change).toFixed(2)}%`;

            return createElement('div', { key: `asset-item-${ticker}`, className: `asset-item ${sector}`},
                [
                createElement('h3', { key: `ticker-${ticker}` },
                    ticker),
                createElement('h4', { key: `name-${ticker}` },
                    name),
                createElement('p', { key: `price-${ticker}`, className: "price" },
                    formattedPrice),
                createElement('div', { key: `amount-${ticker}`, className: "amount" },
                    amounts[i]),
                createElement('div', { key: `value-${ticker}`, className: "value" },
                    formattedValue),
                createElement('p', { key: `change-${ticker}`, className: `change ${change > 0 ? "positive" : "negative"}` },
                    formattedChange),
                createElement('div', { key: `edit-${ticker}`, className: "edit-holding-button", onClick: () => setPopupIsOpen(!popupIsOpen) },
                    <BsThreeDotsVertical />),
                createElement('div', { key: `popup-${ticker}`, className: "edit-holding-popup-container" },
                    <div className={`edit-holding-popup ${popupIsOpen ? "active" : ""}`}>
                        <p className="record-buy">+ Record a Buy</p>
                        <p className="record-sell">- Record a Sell</p>
                        <p className="sell-all">- Sell all</p>
                    </div>),
                ]
            );
        })
        setAssetItems(items);
    }

    return (
        <div className={`holdings-display ${view}`}>
            <div className="column-labels">
                <p>TICKER</p>
                <p>NAME</p>
                <p>PRICE</p>
                <p>QUANTITY</p>
                <p>VALUE</p>
                <p>% CHANGE</p>
            </div>
            { assetItems }
        </div>
    )
}

export default HoldingsDisplay;