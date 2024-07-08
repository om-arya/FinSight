import React, { useState, useEffect } from 'react';
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

    const [holdings, setHoldings] = useState(state.getHoldings() as Holding[]);
    const [holdingsView, setHoldingsView] = useState("card");
    const [totalHoldingProfit, setTotalHoldingProfit] = useState(0);

    useEffect(() => {
        holdings.forEach((holding) => {
            setTotalHoldingProfit(totalHoldingProfit + holding.profit);
        })
    }, [holdings])

    const [modalContent, setModalContent] = useState(<></>);
    const [isOpen, setIsOpen] = useState(false);

    function openAddInvestments() {
        setModalContent(
            <AddInvestmentsPanel
                handlePurchaseClick={(ticker: string, defaultPrice: number) => openRecordBuy(ticker, defaultPrice)}
                closeAddInvestments={() => closeModal()}
            />
        );
        setIsOpen(true);
    }

    function openRecordBuy(ticker: string, defaultPrice: number) {
        setModalContent(
            <RecordBuyPanel ticker={ ticker }
                            defaultPrice={ defaultPrice }
                            setHoldings={(newHoldings: Holding[]) => setHoldings(newHoldings)}
                            closeRecordBuy={() => closeModal()}/>
        )
        setIsOpen(true);
    }

    function openRecordSell(ticker: string, defaultPrice: number, maxQuantity: number) {
        setModalContent(
            <RecordSellPanel ticker={ ticker }
                             defaultPrice={ defaultPrice }
                             maxQuantity={ maxQuantity }
                             setHoldings={(newHoldings: Holding[]) => setHoldings(newHoldings)}
                             closeRecordSell={() => closeModal()}/>
        )
        setIsOpen(true);
    }

    function openSellAll(ticker: string, defaultPrice: number, maxQuantity: number) {
        setModalContent(
            <SellAllPanel ticker={ ticker }
                          defaultPrice={ defaultPrice }
                          maxQuantity={ maxQuantity }
                          setHoldings={(newHoldings: Holding[]) => setHoldings(newHoldings)}
                          closeSellAll={() => closeModal()}/>
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
                    openRecordBuy={(ticker: string, defaultPrice: number) => openRecordBuy(ticker, defaultPrice)}
                    openRecordSell={(ticker: string, defaultPrice: number, maxQuantity: number) => openRecordSell(ticker, defaultPrice, maxQuantity)}
                    openSellAll={(ticker: string, defaultPrice: number, maxQuantity: number) => openSellAll(ticker, defaultPrice, maxQuantity)}
                />

                <Modal open={ isOpen }>{ modalContent }</Modal>
            </div>
            
            <Footer />
        </>
    )
}

export default Portfolio;