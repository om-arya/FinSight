import React, { createElement, useState, useEffect, DetailedReactHTMLElement } from 'react';
import { TICKERS } from '../../api/data/TICKERS';

import AssetAPI, { Asset } from '../../api/AssetAPI';

const AddInvestmentsPanel: React.FC<any> = ({ handleBuy, closeAddInvestments }) => {
    const assetApi = AssetAPI();

    const [purchaseItems, setPurchaseItems] = useState(null);

    useEffect(() => {
        createPurchaseItems();
    }, [])

    async function createPurchaseItems() {
        const assetObjs = await Promise.all(TICKERS.map(async ticker => {
            const assetObj: Asset = await assetApi.getAssetByTicker(ticker);
            return assetObj;
        }));

        const items: DetailedReactHTMLElement<any, any>[] = assetObjs.map((assetObj) => {
            const ticker = assetObj.ticker;
            const name = assetObj.name;
            const sector = assetObj.sector.toLowerCase().replaceAll(" ", "-");
            const price = assetObj.prices[assetObj.prices.length - 1]

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