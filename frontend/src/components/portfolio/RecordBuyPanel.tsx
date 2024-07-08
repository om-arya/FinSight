import React, { useState } from 'react';

import SessionState from '../../state/SessionState';
import UserAPI, { User, Holding } from '../../api/UserAPI.ts';
import AssetAPI, { Asset } from '../../api/AssetAPI.ts';

const RecordBuyPanel: React.FC<any> = ({ ticker, defaultPrice, setHoldings, closeRecordBuy }) => {
    const state = SessionState();
    const user = state.getUser() as User;

    const userApi = UserAPI();
    const assetApi = AssetAPI();

    const [quantity, setQuantity] = useState("1");
    const [priceDollars, setPriceDollars] = useState(Math.floor(defaultPrice).toFixed(0));
    const [priceCents, setPriceCents] = useState(((defaultPrice - Math.floor(defaultPrice)) * 100).toFixed(0));

    async function handleBuyClick() {
        if (user.username == "guest") {
            alert("You must be logged in to use this feature.");
            return;
        }

        const centsInput = parseInt(priceCents);
        const price = parseInt(priceDollars) + (centsInput < 10 ? centsInput / 10 : centsInput / 100);
        await handleBuy(ticker, parseInt(quantity), price);

        window.location.reload();
    }

    async function handleBuy(ticker: string, amount: number, price: number) {
        let newHoldings: Holding[] = [];

        let holdings = state.getHoldings();
        let found = false;
        if (holdings.length === 0) { // Add the first holding.
            newHoldings.push({ticker: ticker,
                              amount: amount,
                              profit: price * amount,
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
                    profit: price * amount,
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
        setHoldings(newHoldings);
    }

    return (
        <div className="record-buy-panel">
            <h1>Buy { ticker }</h1>

            <div className="record-buy-input-container">
                <div className="input-content">
                    <p>Quantity</p>
                    <input type="text" min="0" max="99999999" placeholder="1"
                           onChange={e => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                if (parseInt(e.target.value) > 99999999) {
                                    e.target.value = e.target.value.slice(0, 8);
                                }
                                setQuantity(e.target.value)
                            }}/>
                </div>

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