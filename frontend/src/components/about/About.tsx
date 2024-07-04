import React, { useEffect } from 'react';
import '../../static/about.css';

import Navbar from '../Navbar';

const About: React.FC = () => {
    const githubUrl = "https://github.com/om-arya";
    const emailUrl = "mailto:om.arya0577@gmail.com";
    const restfulUrl = "https://restfulapi.net/";
    const mvcUrl = "https://developer.mozilla.org/en-US/docs/Glossary/MVC";
    const springbootUrl = "https://spring.io/projects/spring-boot";
    const javaUrl = "https://www.java.com/en/";
    const postgresqlUrl = "https://www.postgresql.org/";
    const dockerUrl = "https://www.docker.com/";
    const reactUrl = "https://react.dev/";
    const typescriptUrl = "https://www.typescriptlang.org/";
    const nodejsUrl = "https://nodejs.org/en";
    const httpUrl = "https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods";
    const crudUrl = "https://www.codecademy.com/article/what-is-crud";
    const yfinanceUrl = "https://pypi.org/project/yfinance/";
    const githubactionsUrl = "https://docs.github.com/en/actions";
    const twelvedataUrl = "https://twelvedata.com/";
    const cronUrl = "https://www.npmjs.com/package/node-cron";
    const snp500Url = "https://stockanalysis.com/list/sp-500-stocks/";
    const finsightgithubUrl = "https://github.com/om-arya/finsight";

    return (
        <>
            <Navbar />
            <div className="about">
                <h1>About</h1>
                <p>
                    Hi! I'm Om Arya, and I'm the creator of FinSight. I'm currently a Computer Science student at the University of Maryland, College Park, 
                    graduating in May 2026. If you want to see more of my projects, check out <AboutLink to={ githubUrl }>my GitHub profile!</AboutLink>
                </p>

                <h1>My Mission</h1>
                <p>
                    I want to provide the best possible experience for YOU, the user. If you have any feedback, please <AboutLink to={ emailUrl }>email me!</AboutLink>
                </p>

                <h1>How it Works</h1>
                <p>
                    FinSight leverages a modern tech stack to combine usability, reliability, and power. The application itself is 
                    a <AboutLink to={ restfulUrl }>RESTful API</AboutLink>, conforming to architectural principles such as statelessness, separation of concerns, 
                    and a Model-View-Controller (<AboutLink to={ mvcUrl }>MVC</AboutLink>) pattern.<br /><br />

                    I built the back end with <AboutLink to={ springbootUrl }>Spring Boot</AboutLink>/<AboutLink to={ javaUrl }>Java</AboutLink>, chosen for its 
                    robust and scalable MVC architecture, along with a <AboutLink to={ postgresqlUrl }>PostgreSQL</AboutLink> database, which is running on 
                    a <AboutLink to={ dockerUrl }>Docker</AboutLink> container, to efficiently store and access user and asset data. I also used Docker to containerize 
                    and deploy the app as a whole. For the front end, I chose <AboutLink to={ reactUrl }>React</AboutLink> for its intuitive state management and 
                    unidirectional data flow, as well as <AboutLink to={ typescriptUrl }>TypeScript</AboutLink> for its optional static typing, allowing for intuitive 
                    integration with the statically typed back end. The front end is powered by the <AboutLink to={ nodejsUrl }>Node.js</AboutLink> runtime environment.<br /><br />
                    
                    Both the front end and back end communicate via <AboutLink to={ httpUrl }>HTTP requests</AboutLink> with endpoints on both sides, fully 
                    supporting Create, Read, Update, Delete (<AboutLink to={ crudUrl }>CRUD</AboutLink>) functions such as signing up/logging in a user, tracking buys 
                    and sells, and fetching historical prices for a particular stock.<br /><br />

                    To obtain asset data, I used the <AboutLink to={ yfinanceUrl}>yfinance</AboutLink> Python library to load 10 years of historical prices into 
                    the database. I also set up a Node.js <AboutLink to={ cronUrl }>cron job</AboutLink> through <AboutLink to={ githubactionsUrl }>GitHub Actions</AboutLink> to 
                    automate a daily workflow that fetches and stores EOD prices from the <AboutLink to={ twelvedataUrl }>Twelve Data API</AboutLink>. 
                    All of this is used to empower FinSight to support <AboutLink to={ snp500Url }>every stock in the S&P500.</AboutLink><br /><br />

                    For more details, see the <AboutLink to={ finsightgithubUrl }>GitHub repository</AboutLink>.
                </p>

                <h1>Closing</h1>
                <p>
                    Thank you for using FinSight. I hope this software was able to provide value to your life in some way. Again, if you have any feedback, I would 
                    love to hear it, so please reach out!
                </p>
                <p>Warmest regards,<br />Om</p>
            </div>
        </>
    )
}

function AboutLink({ to, children, ...props }) {
    return (
        <a className="about-link" href={ to } title={ to } target="_blank" { ...props }>{ children }</a>
    )
}

export default About;