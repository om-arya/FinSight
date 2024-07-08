import React, { useState, useEffect } from 'react';

import SessionState from '../../state/SessionState';
import UserAPI, { User, Holding } from '../../api/UserAPI.ts';
import AssetAPI, { Asset } from '../../api/AssetAPI.ts';

const RecordSellPanel: React.FC<any> = ({ ticker, defaultPrice, maxQuantity, setHoldings, closeRecordSell }) => {
    const state = SessionState();
    const user = state.getUser() as User;
    const userApi = UserAPI();
    const assetApi = AssetAPI();

    const [quantity, setQuantity] = useState("1");
    const [priceDollars, setPriceDollars] = useState(Math.floor(defaultPrice).toFixed(0));
    const [priceCents, setPriceCents] = useState(((defaultPrice - Math.floor(defaultPrice)) * 100).toFixed(0));

    const [errorMessage, setErrorMessage]: any = useState(null);
    const sellTooManyError = `Error: You own ${maxQuantity} shares of ${ticker} and cannot sell more.`;

    useEffect(() => {
        if (quantity > maxQuantity) {
            setErrorMessage(sellTooManyError);
        } else {
            setErrorMessage(null);
        }
    }, [quantity])

    async function handleSellClick() {
        if (user.username == "guest") {
            alert("You must be logged in to use this feature.");
            return;
        }

        const quantityNumber = parseInt(quantity);
        if (quantityNumber > maxQuantity) {
            return;
        }

        const priceDollarsNumber = parseInt(priceDollars);
        const priceCentsNumber = parseInt(priceCents);
        const price = priceDollarsNumber + (priceCents.length === 1 ? priceCentsNumber / 10 : priceCentsNumber / 100);

        await handleSell(ticker, quantityNumber, price);
        
        window.location.reload();
    }

    async function handleSell(ticker: string, amount: number, price: number) {
        const holdings = user.holdings as Holding[];
        const newHoldings: Holding[] = [];
        let assetWasRemoved = false;

        holdings.forEach((holding) => {
            if (holding.ticker === ticker) {
                holding.amount -= amount;
                holding.profit = price * holding.amount;
                if (holding.amount > 0) {
                    newHoldings.push(holding);
                } else {
                    assetWasRemoved = true;
                }
            } else {
                newHoldings.push(holding);
            }
        });

        newHoldings.sort((a, b) => a.ticker.localeCompare(b.ticker));

        await userApi.setUserHoldings(user.username, newHoldings);

        if (assetWasRemoved) {
            const holdingAssets: Asset[] = await Promise.all(newHoldings.map(async holding => {
                return await assetApi.getAssetByTicker(holding.ticker);
            }));
            state.setHoldingAssets(holdingAssets);
        }

        setHoldings(newHoldings); // Used by the Portfolio component to update total holding profit.
    }

    return (
        <div className="record-sell-panel">
            <h1>Sell { ticker }</h1>

            <div className="error-message">{ errorMessage }</div>

            <div className="record-sell-input-container">
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