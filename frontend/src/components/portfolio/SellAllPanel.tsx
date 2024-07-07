import React from 'react';

const SellAllPanel: React.FC = () => {
    return (
        <div className="sell-all-panel">
            <h3>Sell all asset</h3>
            <p>Are you sure you want to sell all?</p>
            <div className="sell-all-button-container">
                <div className="cancel-button">
                    <p>Cancel</p>
                </div>
                <div className="sell-all-button">
                    <p>Sell All</p>
                </div>
            </div>
        </div>
    )
}

export default SellAllPanel;