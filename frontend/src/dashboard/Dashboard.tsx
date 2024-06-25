import React, { useEffect } from 'react';

const Dashboard: React.FC = () => {
    useEffect(() => {
        const root = document.querySelector(':root') as HTMLElement;
        const body = document.querySelector('body') as HTMLElement;
        
        root.style.setProperty("--bg-main-color", "#fcfcfcff");
        body.style.height = "55vh";
    }, [])

    return (
        <>
            <h1>👋 <span>Hi Bob,</span> welcome back.</h1>
            <p>How would you like to invest today?</p>
        </>
    )
}

export default Dashboard