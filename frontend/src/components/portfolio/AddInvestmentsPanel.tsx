import React, { createElement, useState, useEffect, DetailedReactHTMLElement } from 'react';

import SessionState from '../../state/SessionState';
import { Asset } from '../../api/AssetAPI';

import InvestmentSearchBar from './InvestmentSearchBar';

const AddInvestmentsPanel: React.FC<any> = ({ handlePurchaseClick, closeAddInvestments }) => {
    const state = SessionState();
    const allAssets = state.getAllAssets();

    const allTickers: string[] = allAssets.map((asset) => {
        return asset.ticker;
    })

    const [purchaseItems, setPurchaseItems] = useState(null);
    const [searchMatches, setSearchMatches] = useState(allTickers);

    useEffect(() => {
        createPurchaseItems();
    }, [searchMatches])

    async function createPurchaseItems() {
        const allAssets = state.getAllAssets() as Asset[];

        const items: DetailedReactHTMLElement<any, any>[] = allAssets.map((asset: Asset) => {
            const ticker = asset.ticker;
            if (!(searchMatches.includes(ticker))) {
                return;
            }

            const name = asset.name;
            const sector = asset.sector.toLowerCase().replaceAll(" ", "-");
            const price = asset.prices[asset.prices.length - 1]

            return createElement('div', { key: `purchase-item-${ticker}`, className: `purchase-item ${sector}`},
                [
                createElement('h3', { key: `ticker-${ticker}` }, ticker),
                createElement('h4', { key: `name-${ticker}` }, name),
                createElement('p', { key: `price-${ticker}` }, `$${price.toFixed(2)}`),
                createElement('div', { key: `purchase-${ticker}`, className: "purchase-button",
                                      onClick: () => handlePurchaseClick(ticker, price) }, "+")
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

            <InvestmentSearchBar setSearchMatches={(matches: string[]) => setSearchMatches(matches)}/>
            
            <div className="purchase-items-container">
                { purchaseItems }
            </div>
        </div>
    )
}

export default AddInvestmentsPanel;