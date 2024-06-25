import React, { useEffect } from 'react';

const Home: React.FC = () => {
    useEffect(() => {
        const root = document.querySelector(':root') as HTMLElement;
        const body = document.querySelector('body') as HTMLElement;
        
        root.style.setProperty("--bg-main-color", "white");
        body.style.height = "100vh";
    }, [])

    return (
        <>
            <h1>Hello.</h1>
            <p>Welcome.</p>
        </>
    )
}

export default Home