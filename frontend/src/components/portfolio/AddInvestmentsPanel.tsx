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
            const price = assetObj.prices[assetObj.prices.length - 1]

            return createElement('div', { key: `purchase-item-${assetObj.ticker}`, className: "purchase-item"},
                [
                createElement('h3', { key: `ticker-${assetObj.ticker}` }, ticker),
                createElement('h4', { key: `name-${assetObj.ticker}` }, name),
                createElement('p', { key: `price-${assetObj.ticker}` }, "$" + price),
                createElement('div', { key: `purchase-${assetObj.ticker}`, className: "purchase-button",
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