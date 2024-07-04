import React, { useState } from 'react';
import '../../static/portfolio.css';

import SessionState from '../../state/SessionState.ts';
import UserAPI, { User } from '../../api/UserAPI.ts';

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
        const index = user.heldTickers.indexOf(ticker);
        
        if (index >= 0) {
            user.heldAmounts[index] += amount;
            user.heldProfits[index] -= price * amount;
        } else {
            user.heldTickers.push(ticker);
            user.heldAmounts.push(amount);
            user.heldAmounts.push(-1 * price);
        }

        await userApi.setHoldings(user.username, user.heldTickers, user.heldAmounts, user.heldProfits);
    }

    async function handleSell(ticker: string, amount: number, price: number) {
        const index = user.heldTickers.indexOf(ticker);

        user.heldAmounts[index] -= amount;
        user.heldProfits[index] += price * amount;
        if (user.heldAmounts[index] === 0) {
            user.heldTickers.splice(index, 1);
            user.heldAmounts.splice(index, 1);
            user.heldProfits.splice(index, 1);
        }

        await userApi.setHoldings(user.username, user.heldTickers, user.heldAmounts, user.heldProfits);
    }

    return (
        <>
            <Navbar />
            <div className="portfolio">
                <h1>Your Portfolio</h1>
                <p>Your holdings, your way.</p>

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