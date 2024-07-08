import React from 'react';

import SessionState from '../../state/SessionState';
import UserAPI, { User, Holding } from '../../api/UserAPI';
import AssetAPI, { Asset } from '../../api/AssetAPI';

const SellAllPanel: React.FC<any> = ({ ticker, setHoldings, closeSellAll }) => {
    const state = SessionState();
    const user = state.getUser() as User;
    const userApi = UserAPI();
    const assetApi = AssetAPI();

    async function sellAll() {
        if (user.username == "guest") {
            alert("You must be logged in to use this feature.");
            return;
        }

        const holdings = user.holdings as Holding[];
        let newHoldings: Holding[] = [];

        holdings.forEach((holding) => {
            if (!(holding.ticker === ticker)) {
                newHoldings.push(holding);
            }
        });

        newHoldings.sort((a, b) => a.ticker.localeCompare(b.ticker));

        await userApi.setUserHoldings(user.username, newHoldings);

        const holdingAssets: Asset[] = await Promise.all(newHoldings.map(async holding => {
            return await assetApi.getAssetByTicker(holding.ticker);
        }));
        state.setHoldingAssets(holdingAssets);

        setHoldings(newHoldings); // Used by the Portfolio component to update total holding profit.

        window.location.reload();
    }

    return (
        <div className="sell-all-panel">
            <h1>Sell All { ticker }</h1>

            <p>Are you sure you want to sell all { ticker }?</p>

            <div className="sell-all-button-container">
                <div className="cancel-button" onClick={() => closeSellAll()}>
                    <p>Cancel</p>
                </div>

                <div className="sell-all-button" onClick={() => sellAll()}>
                    <p>Sell All</p>
                </div>
            </div>
        </div>
    )
}

export default SellAllPanel;