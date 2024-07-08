import React from 'react';

import SessionState from '../../state/SessionState';
import UserAPI, { User, Holding } from '../../api/UserAPI.ts';
import AssetAPI, { Asset } from '../../api/AssetAPI.ts';

const RecordBuyPanel: React.FC<any> = ({ ticker, closeRecordBuy }) => {
    const state = SessionState();
    const user = state.getUser() as User;

    const userApi = UserAPI();
    const assetApi = AssetAPI();

    function handleBuyClick() {
        if (user.username == "guest") {
            alert("You must be logged in to use this feature.");
            return;
        }

        window.location.reload();
    }

    async function handleBuy(ticker: string, amount: number, price: number) {
        let newHoldings: Holding[] = [];

        let holdings = state.getHoldings();
        let found = false;
        if (holdings.length === 0) { // Add the first holding.
            newHoldings.push({ticker: ticker,
                              amount: amount,
                              profit: price,
                              username: user.username});
        } else { // Change the existing holdings.
            holdings.forEach((holding) => {
                if (holding.ticker === ticker) {
                    holding.amount += amount;
                    holding.profit += price * amount;
                    found = true;
                }
            });
            
            if (!found) {
                holdings.push({
                    ticker: ticker,
                    amount: amount,
                    profit: price,
                    username: user.username
                });
            }
            newHoldings = holdings;
        }

        await userApi.setUserHoldings(user.username, newHoldings);
        if (!found) {
            // An asset was added, so update holdingAssets.
            const holdingAssets: Asset[] = await Promise.all(newHoldings.map(async holding => {
                const holdingAsset: Asset = await assetApi.getAssetByTicker(holding.ticker);
                return holdingAsset;
            }));
            state.setHoldingAssets(holdingAssets);
        }
        state.setHoldings(newHoldings);
    }

    return (
        <div className="record-buy-panel">
            <h1>Buy { ticker }</h1>

            <div className="record-buy-input-container">
                <div className="input-content">
                    <p>Quantity</p>
                    <input type="number" min="0" placeholder="1"/>
                </div>

                <div className="input-content">
                    <p>Purchase price</p>
                    <div className="price-container">
                        <p>$</p>
                        <input type="number" min="0" />
                        <span>.</span>
                        <input type="number" min="0" max="99" />
                    </div>
                </div>
            </div>

            <div className="record-buy-button-container">
                <div className="cancel-button" onClick={() => closeRecordBuy()}>
                    <p>Cancel</p>
                </div>

                <div className="buy-button" onClick={() => handleBuyClick()}>
                    <p>Buy</p>
                </div>
            </div>
        </div>
    )
}

export default RecordBuyPanel;