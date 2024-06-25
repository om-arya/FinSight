import React, { useEffect } from 'react';

const Portfolio: React.FC = () => {
    useEffect(() => {
        const root = document.querySelector(':root') as HTMLElement;
        const body = document.querySelector('body') as HTMLElement;
        
        root.style.setProperty("--bg-main-color", "#fcfcfcff");
        body.style.height = "55vh";
    }, [])

    return (
        <h1>GOOG</h1>
    )
}

export default Portfolio;