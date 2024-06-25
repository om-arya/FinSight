import React, { useEffect } from 'react';
import './about.css';

const About: React.FC = () => {
    useEffect(() => {
        const root = document.querySelector(':root') as HTMLElement;
        const body = document.querySelector('body') as HTMLElement;

        root.style.setProperty("--bg-main-color", "#fcfcfcff");
        body.style.height = "100vh";
    }, [])

    return (
        <div className="about">
            <h1>About</h1>
            <p>Hi! I'm Om Arya, and I'm the creator of FinSight.</p>
            <p>I'm currently a Computer Science student at the University of Maryland, College Park, graduating in May 2026.</p>

            <h1>Why FinSight?</h1>
            <p></p>

            <h1>How it Works</h1>
            <p></p>

            <h1>Closing</h1>
            <p>Thank you for using FinSight.</p>
            <p>Best Regards,<br />Om</p>
        </div>
    )
}

export default About;