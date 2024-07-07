import React, { useState } from 'react';
import '../../static/portfolio.css';

import SessionState from '../../state/SessionState.ts';

import Navbar from '../Navbar';
import Footer from '../Footer.tsx';
import Modal from '../Modal.tsx';
import HoldingsDisplay from './HoldingsDisplay.tsx';
import AddInvestmentsPanel from './AddInvestmentsPanel.tsx';
import RecordBuyPanel from './RecordBuyPanel.tsx';
import RecordSellPanel from './RecordSellPanel.tsx';
import SellAllPanel from './SellAllPanel.tsx';

const Portfolio: React.FC = () => {
    const state = SessionState();

    const todayReturn = state.getTodayReturn() as number;

    const [holdingsView, setHoldingsView] = useState("card");
    const [holdings, setHoldings] = useState(state.getHoldings());

    const [modalContent, setModalContent] = useState(<></>);
    const [isOpen, setIsOpen] = useState(false);

    function openAddInvestments() {
        setModalContent(
            <AddInvestmentsPanel
                handlePurchaseClick={() => openRecordBuy()}
                closeAddInvestments={() => closeModal()}
            />
        );
        setIsOpen(true);
    }

    function openRecordBuy() {
        setModalContent(
            <RecordBuyPanel />
        )
    }

    function openRecordSell() {
        setModalContent(
            <RecordSellPanel />
        )
    }

    function openSellAll() {
        setModalContent(
            <SellAllPanel />
        )
    }

    function closeModal() {
        setIsOpen(false);
        setModalContent(<></>);
    }

    return (
        <>
            <Navbar />

            <div className="portfolio">
                <div className="portfolio-header">
                    <h1>Your Portfolio</h1>
                    <h2>Today's Return: <span>{`${todayReturn < 0 ? "-$" : "$"}${Math.abs(todayReturn).toFixed(2)}`}</span></h2>
                    <p>Your holdings, your way.</p>
                </div>

                <div className="top-button-container">
                    <div className="add-investments-button" onClick={() => openAddInvestments()}>
                        <p>+ Add investments</p>
                    </div>

                    <div className="toggle-view-button" onClick={() => {
                        if (holdings.length === 0) {
                            return;
                        }
                        setHoldingsView(holdingsView === "card" ? "list" : "card")
                    }}>
                        <p>View: { holdingsView == "card" ? "Card" : "List" }</p>
                    </div>
                </div>

                <HoldingsDisplay
                    view={ holdingsView }
                    holdings={ holdings }
                />

                <Modal open={ isOpen }>{ modalContent }</Modal>
            </div>
            
            <Footer />
        </>
    )
}

export default Portfolio;