import React from 'react';

import SessionState from '../../state/SessionState';
import UserAPI, { User, Holding } from '../../api/UserAPI.ts';
import AssetAPI, { Asset } from '../../api/AssetAPI.ts';

const RecordBuyPanel: React.FC = () => {
    const state = SessionState();
    const user = state.getUser() as User;

    const userApi = UserAPI();
    const assetApi = AssetAPI();

    async function handleBuy(ticker: string, amount: number, price: number) {
        if (user.username == "guest") {
            alert("You must be logged in to use this feature.");
            return;
        }

        let newHoldings: Holding[] = [];

        let holdings = state.getHoldings();
        let found = false;
        if (holdings.length === 0) { // Add the first holding.
            newHoldings.push({ticker: ticker,
                              amount: amount,
                              profit: -1 * price,
                              username: user.username});
        } else { // Change the existing holdings.
            holdings.forEach((holding) => {
                if (holding.ticker === ticker) {
                    holding.amount += amount;
                    holding.profit -= price * amount;
                    found = true;
                }
            });
            
            if (!found) {
                holdings.push({
                    ticker: ticker,
                    amount: amount,
                    profit: -1 * price,
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
            <h3>Buy asset</h3>
            <input />
        </div>
    )
}

export default RecordBuyPanel;