import React, { useState } from 'react';
import '../../static/portfolio.css';

import SessionState from '../../state/SessionState.ts';
import { Holding } from '../../api/UserAPI.ts';

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

    const holdings = state.getHoldings() as Holding[];

    let totalHoldingProfit = 0;
    holdings.forEach((holding) => {
        totalHoldingProfit += holding.profit;
    })

    const [holdingsView, setHoldingsView] = useState("card");

    const [modalContent, setModalContent] = useState(<></>);
    const [isOpen, setIsOpen] = useState(false);

    function openAddInvestments() {
        setModalContent(
            <AddInvestmentsPanel
                handlePurchaseClick={(ticker: string) => openRecordBuy(ticker)}
                closeAddInvestments={() => closeModal()}
            />
        );
        setIsOpen(true);
    }

    function openRecordBuy(ticker: string) {
        setModalContent(
            <RecordBuyPanel ticker={ ticker } closeRecordBuy={() => closeModal()}/>
        )
        setIsOpen(true);
    }

    function openRecordSell(ticker: string) {
        setModalContent(
            <RecordSellPanel ticker={ ticker } closeRecordSell={() => closeModal()}/>
        )
        setIsOpen(true);
    }

    function openSellAll(ticker: string) {
        setModalContent(
            <SellAllPanel ticker={ ticker } closeSellAll={() => closeModal()}/>
        )
        setIsOpen(true);
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
                    <h2>Total Value: <span>{`${totalHoldingProfit < 0 ? "-$" : "$"}${Math.abs(totalHoldingProfit).toFixed(2)}`}</span></h2>
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
                    openRecordBuy = {(ticker: string) => openRecordBuy(ticker)}
                    openRecordSell = {(ticker: string) => openRecordSell(ticker)}
                    openSellAll = {(ticker: string) => openSellAll(ticker)}
                />

                <Modal open={ isOpen }>{ modalContent }</Modal>
            </div>
            
            <Footer />
        </>
    )
}

export default Portfolio;