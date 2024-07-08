import React from 'react';

import SessionState from '../../state/SessionState';
import UserAPI, { User, Holding } from '../../api/UserAPI.ts';
import AssetAPI, { Asset } from '../../api/AssetAPI.ts';

const RecordSellPanel: React.FC<any> = ({ ticker, closeRecordSell }) => {
    const state = SessionState();
    const user = state.getUser() as User;

    const userApi = UserAPI();
    const assetApi = AssetAPI();

    function handleSellClick() {
        if (user.username == "guest") {
            alert("You must be logged in to use this feature.");
            return;
        }
        
        window.location.reload();
    }

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
            <h1>Sell { ticker }</h1>

            <div className="record-sell-input-container">
                <div className="input-content">
                    <p>Quantity</p>
                    <input type="number" min="0" />
                </div>

                <div className="input-content">
                    <p>Sell price</p>
                    <div className="price-container">
                        <p>$</p>
                        <input type="number" min="0" />
                        <span>.</span>
                        <input type="number" min="0" max="99" />
                    </div>
                </div>
            </div>

            <div className="record-sell-button-container">
                <div className="cancel-button" onClick={() => closeRecordSell()}>
                    <p>Cancel</p>
                </div>

                <div className="sell-button" onClick={() => handleSellClick()}>
                    <p>Sell</p>
                </div>
            </div>
        </div>
    )
}

export default RecordSellPanel;