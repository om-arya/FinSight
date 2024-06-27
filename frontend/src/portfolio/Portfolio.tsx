import React, { useEffect } from 'react';
import './portfolio.css';

import Navbar from '../Navbar';

const Portfolio: React.FC = () => {
    useEffect(() => {
        const root = document.querySelector(':root') as HTMLElement;
        
        root.style.setProperty("--bg-main-color", "#fafafa");
        root.style.background = "var(--bg-third-color)";
    }, [])

    return (
        <>
            <Navbar />
            <div className="portfolio">
                <h1>GOOG</h1>
                <h1>AMZN</h1>

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
                        <h3>APPL</h3>
                        <h4>Apple</h4>
                        <p>$123.14</p>
                        <span>+1.33%↑</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Portfolio;