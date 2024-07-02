import React, { useEffect, useState } from 'react';
import { Asset, ResponseEntity, getAssetByTicker } from '../../api/AssetAPI.ts';
import '../../static/portfolio.css';

import Navbar from '../Navbar';

const Portfolio: React.FC = () => {
    useEffect(() => {
        const root = document.querySelector(':root') as HTMLElement;
        const html = document.querySelector('html') as HTMLElement;
        
        root.style.setProperty("--bg-main-color", "#fafafa");
        root.style.setProperty("--text-main-color", "black");
        root.style.background = "var(--bg-third-color)";
        html.style["overflow-y"] = "scroll";
    }, [])

    const [data, setData] = useState(null);

    async function displayAsset(ticker: string) {
        const response: any = await getAssetByTicker(ticker);
        setData(response.prices[response.prices.length - 1]);
    }

    displayAsset('AAPL');

    return (
        <>
            <Navbar />
            <div className="portfolio">
                <h1>Your Portfolio</h1>
                <p>Today is a good day to invest in your future; we're here to help you get on track.</p>

                <div className = "asset-card-container">
                    <div className="asset-card">
                        <h3>GOOG</h3>
                        <h4>Google</h4>
                        <p>$159.42</p>
                        <span>+43.23%↑</span>
                    </div>
                    <div className="asset-card">
                        <h3>AMZN</h3>
                        <h4>Amazon</h4>
                        <p>$134.52</p>
                        <span>-23.23%↓</span>
                    </div>
                    <div className="asset-card">
                        <h3>AAPL</h3>
                        <h4>Apple</h4>
                        <p>${ data }</p>
                        <span>+1.33%↑</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Portfolio;