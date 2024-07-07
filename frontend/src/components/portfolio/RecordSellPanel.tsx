import React from 'react';

import SessionState from '../../state/SessionState';
import UserAPI, { User, Holding } from '../../api/UserAPI.ts';
import AssetAPI, { Asset } from '../../api/AssetAPI.ts';

const RecordSellPanel: React.FC = () => {
    const state = SessionState();
    const user = state.getUser() as User;

    const userApi = UserAPI();
    const assetApi = AssetAPI();

    async function handleSell(ticker: string, amount: number, price: number) {
        if (user.username == "guest") {
            alert("You must be logged in to use this feature.");
            return;
        }

        let newHoldings: Holding[] = [];
        let assetWasRemoved = false;

        let heldTickers: string[] = [];
        let heldAmounts: number[] = [];
        let heldProfits: number[] = [];
        user.holdings.forEach((holding) => {
            heldTickers.push(holding.ticker);
            heldAmounts.push(holding.amount);
            heldProfits.push(holding.profit);
        })

        const index = heldTickers.indexOf(ticker);

        heldAmounts[index] -= amount;
        heldProfits[index] += price * amount;
        if (heldAmounts[index] === 0) {
            heldTickers.splice(index, 1);
            heldAmounts.splice(index, 1);
            heldProfits.splice(index, 1);
            assetWasRemoved = true;
        }

        for (let i = 0; i < heldTickers.length; i++) {
            newHoldings.push({
                ticker: heldTickers[i],
                amount: heldAmounts[i],
                profit: heldProfits[i],
                username: user.username
            });
        }

        await userApi.setUserHoldings(user.username, newHoldings);
        if (assetWasRemoved) {
            // Update holdingAssets.
            const holdingAssets: Asset[] = await Promise.all(newHoldings.map(async holding => {
                const holdingAsset: Asset = await assetApi.getAssetByTicker(holding.ticker);
                return holdingAsset;
            }));
            state.setHoldingAssets(holdingAssets);
        }
        state.setHoldings(newHoldings);
    }

    return (
        <div className="record-sell-panel">
            <h3>Sell asset</h3>
            <input />
        </div>
    )
}

export default RecordSellPanel;