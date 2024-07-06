import React, { createElement, useState, useEffect, DetailedReactHTMLElement } from 'react';

import SessionState from '../../state/SessionState';
import AssetAPI, { Asset } from '../../api/AssetAPI';

const AddInvestmentsPanel: React.FC<any> = ({ handleBuy, closeAddInvestments }) => {
    const state = SessionState();
    const assetApi = AssetAPI();

    const [purchaseItems, setPurchaseItems] = useState(null);

    useEffect(() => {
        createPurchaseItems();
    }, [])

    async function createPurchaseItems() {
        const allAssets = state.getAllAssets() as Asset[];

        const items: DetailedReactHTMLElement<any, any>[] = allAssets.map((asset: Asset) => {
            const ticker = asset.ticker;
            const name = asset.name;
            const sector = asset.sector.toLowerCase().replaceAll(" ", "-");
            const price = asset.prices[asset.prices.length - 1]

            return createElement('div', { key: `purchase-item-${ticker}`, className: `purchase-item ${sector}`},
                [
                createElement('h3', { key: `ticker-${ticker}` }, ticker),
                createElement('h4', { key: `name-${ticker}` }, name),
                createElement('p', { key: `price-${ticker}` }, `$${price.toFixed(2)}`),
                createElement('div', { key: `purchase-${ticker}`, className: "purchase-button",
                                      onClick: () => handleBuy(ticker, 1, price) }, "+")
                ]
            );
        })
        setPurchaseItems(items);
    }

    return (
        <div className="add-investments-panel">
            <div className="close-add-investments" onClick={() => closeAddInvestments()}>← Back</div>
            <div className="add-investments-header">
                <h2>Add Investments</h2>
            </div>
            <div className="purchase-items-container">
                { purchaseItems }
            </div>
        </div>
    )
}

export default AddInvestmentsPanel;