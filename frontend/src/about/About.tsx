import React, { useEffect } from 'react';
import './about.css';

import Navbar from '../Navbar';

const About: React.FC = () => {
    useEffect(() => {
        const root = document.querySelector(':root') as HTMLElement;

        root.style.setProperty("--bg-main-color", "#fcfcfcff");
        root.style.background = "var(--bg-main-color)";
    }, [])

    return (
        <>
            <Navbar />
            <div className="about">
                <h1>About</h1>
                <p>
                    Hi! I'm Om Arya, and I'm the creator of FinSight.
                </p>
                <p>
                    I'm currently a Computer Science student at the University of Maryland, College Park, graduating in May 2026.
                </p>

                <h1>Why FinSight?</h1>
                <p>
                    You may be wondering to yourself: "Why should I use FinSight? There are so many other portfolio trackers out there."
                    Well, FinSight is not just <i>any</i> portfolio tracker, but a portfolio <i>manager</i>. This software provides
                    unparalleled functionality compared to its competitors, such as performance metrics and market prediction embedded
                    right into your dashboard.
                </p>

                <h1>How it Works</h1>
                <p>
                    This application was created using Spring Boot for the back end with a PostgreSQL database, along with a React front
                    end.
                </p>

                <h1>Closing</h1>
                <p>
                    Thank you for using FinSight. I hope this software was able to provide value to your life in some way. If you have
                    any feedback, please don't hesitate to reach out!
                </p>
                <p>Best Regards,<br />Om</p>
            </div>
        </>
    )
}

export default About;