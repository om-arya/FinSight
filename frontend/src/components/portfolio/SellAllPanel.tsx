import React, { useState } from 'react';

import SessionState from '../../state/SessionState';
import UserAPI, { User, Holding } from '../../api/UserAPI';
import AssetAPI, { Asset } from '../../api/AssetAPI';

const SellAllPanel: React.FC<any> = ({ ticker, defaultPrice, maxQuantity, setHoldings, closeSellAll }) => {
    const state = SessionState();
    const user = state.getUser() as User;
    const userApi = UserAPI();
    const assetApi = AssetAPI();

    const [priceDollars, setPriceDollars] = useState(Math.floor(defaultPrice).toFixed(0));
    const [priceCents, setPriceCents] = useState(((defaultPrice - Math.floor(defaultPrice)) * 100).toFixed(0));

    async function sellAll() {
        if (user.username == "guest") {
            alert("You must be logged in to use this feature.");
            return;
        }

        const priceDollarsNumber = parseInt(priceDollars);
        const priceCentsNumber = parseInt(priceCents);
        const price = priceDollarsNumber + (priceCentsNumber < 10 ? priceCentsNumber / 10 : priceCentsNumber / 100);

        let newHoldings: Holding[] = [];

        user.holdings.forEach((holding) => {
            if (holding.ticker === ticker) {
                holding.profit = 0;
                holding.amount = 0;
            } else {
                newHoldings.push(holding);
            }
        });

        await userApi.setUserHoldings(user.username, newHoldings);

        const holdingAssets: Asset[] = await Promise.all(newHoldings.map(async holding => {
            return await assetApi.getAssetByTicker(holding.ticker);
        }));
        state.setHoldingAssets(holdingAssets);

        state.setHoldings(newHoldings);
        setHoldings(newHoldings);

        window.location.reload();
    }

    return (
        <div className="sell-all-panel">
            <h1>Sell All { ticker }</h1>

            <div className="input-content">
                <p>Share price</p>
                <div className="price-container">
                    <p>$</p>
                    <input type="text" min="0" max="99999999" placeholder={ Math.floor(defaultPrice).toString() }
                           onChange={e => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                if (parseInt(e.target.value) > 99999999) {
                                    e.target.value = e.target.value.slice(0, 8);
                                }
                                setPriceDollars(e.target.value)
                           }}/>
                    <span>.</span>
                    <input type="text" placeholder={ (defaultPrice - Math.floor(defaultPrice) < .1 ? "0" : "")
                                                         + ((defaultPrice - Math.floor(defaultPrice)) * 100).toFixed(0) }
                            onChange={e => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                if (parseInt(e.target.value) > 99) {
                                    e.target.value = e.target.value.slice(0, 2);
                                }
                                setPriceCents(e.target.value)
                            }}/>
                </div>
            </div>

            <div className="sell-all-button-container">
                <div className="cancel-button" onClick={() => closeSellAll()}>
                    <p>Cancel</p>
                </div>

                <div className="sell-all-button" onClick={() => sellAll()}>
                    <p>Sell All { ticker }</p>
                </div>
            </div>
        </div>
    )
}

export default SellAllPanel;