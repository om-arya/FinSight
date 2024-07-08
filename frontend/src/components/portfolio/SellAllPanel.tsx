import React from 'react';

import SessionState from '../../state/SessionState';
import { User } from '../../api/UserAPI';

const SellAllPanel: React.FC<any> = ({ ticker, closeSellAll }) => {
    const state = SessionState();
    const user = state.getUser() as User;

    function sellAll() {
        if (user.username == "guest") {
            alert("You must be logged in to use this feature.");
            return;
        }

        window.location.reload();
    }

    return (
        <div className="sell-all-panel">
            <h1>Sell All { ticker }</h1>

            <div className="input-content">
                <p>Sell price</p>
                <div className="price-container">
                    <p>$</p>
                    <input type="number" min="0" />
                    <span>.</span>
                    <input type="number" min="0" max="99" />
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