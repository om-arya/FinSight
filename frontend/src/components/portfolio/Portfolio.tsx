import React, { useState } from 'react';
import '../../static/portfolio.css';

import SessionState from '../../state/SessionState.ts';
import UserAPI, { User, Holding } from '../../api/UserAPI.ts';

import Navbar from '../Navbar';
import Modal from '../Modal.tsx';
import AddInvestmentsPanel from './AddInvestmentsPanel.tsx';
import HoldingsDisplay from './HoldingsDisplay.tsx';

const Portfolio: React.FC = () => {
    const state = SessionState();
    const user = state.getUser() as User;
    const userApi = UserAPI();

    const [view, setView] = useState("card");

    function toggleView() {
        setView(view == "card" ? "list" : "card");
    }

    const [modalContent, setModalContent] = useState(<></>);
    const [isOpen, setIsOpen] = useState(false);

    function openAddInvestments() {
        setModalContent(
            <>
                <AddInvestmentsPanel
                    handleBuy={(ticker: string, amount: number, price: number) => handleBuy(ticker, amount, price)}
                    closeAddInvestments={() => closeAddInvestments()}
                />
            </>
            );
        setIsOpen(true);
    }

    function closeAddInvestments() {
        setIsOpen(false);
        setModalContent(<></>);
    }

    async function handleBuy(ticker: string, amount: number, price: number) {
        if (user.username == "guest") {
            alert("You must be logged in to use this feature.");
            return;
        }

        let newHoldings: Holding[] = [];

        let holdings = state.getHoldings();
        if (holdings.length === 0) { // Add the first holding.
            newHoldings.push({ticker: ticker,
                              amount: amount,
                              profit: -1 * price,
                              username: user.username});
        } else { // Change the existing holdings.
            let found = false;
            holdings.forEach((holding) => {
                if (holding.ticker === ticker) {
                    holding.amount += amount;
                    holding.profit -= price * amount;
                    found = true;
                }
            });

            if (!found) {
                holdings.push({
                    ticker: ticker,
                    amount: amount,
                    profit: -1 * price,
                    username: user.username
                });
            }

            holdings.sort((a, b) => a.ticker.localeCompare(b.ticker));

            newHoldings = holdings;
        }

        await userApi.setUserHoldings(user.username, newHoldings);
        state.setHoldings(newHoldings);
    }

    async function handleSell(ticker: string, amount: number, price: number) {
        if (user.username == "guest") {
            alert("You must be logged in to use this feature.");
            return;
        }

        let newHoldings: Holding[] = [];

        let heldTickers: string[] = [];
        let heldAmounts: number[] = [];
        let heldProfits: number[] = [];
        user.holdings.forEach((holding) => {
            heldTickers.push(holding.ticker);
            heldAmounts.push(holding.amount);
            heldProfits.push(holding.profit);
        })

        const index = heldTickers.indexOf(ticker);

        heldAmounts[index] -= amount;
        heldProfits[index] += price * amount;
        if (heldAmounts[index] === 0) {
            heldTickers.splice(index, 1);
            heldAmounts.splice(index, 1);
            heldProfits.splice(index, 1);
        }

        for (let i = 0; i < heldTickers.length; i++) {
            newHoldings.push({
                ticker: heldTickers[i],
                amount: heldAmounts[i],
                profit: heldProfits[i],
                username: user.username
            });
        }

        await userApi.setUserHoldings(user.username, newHoldings);
    }

    return (
        <>
            <Navbar />
            <div className="portfolio">
                <div className="portfolio-header">
                    <h1>Your Portfolio</h1>
                    <h2>Today's Return: <span>$12.32</span></h2>
                    <p>Your holdings, your way.</p>
                </div>

                <div className="top-button-container">
                    <div className="add-investments-button" onClick={() => openAddInvestments()}>
                        <p>+ Add investments</p>
                    </div>

                    <div className="toggle-view-button" onClick={() => toggleView()}>
                        <p>View: { view == "card" ? "Card" : "List" }</p>
                    </div>
                </div>

                <HoldingsDisplay
                    view={ view }
                    handleBuy={(ticker: string, amount: number, price: number) => handleBuy(ticker, amount, price)}
                    handleSell={(ticker: string, amount: number, price: number) => handleSell(ticker, amount, price)}
                />

                <Modal open={ isOpen }>{ modalContent }</Modal>
            </div>
        </>
    )
}

export default Portfolio;