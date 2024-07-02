import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../index.css';

interface ModalProps {
    open: boolean;
    children?: any;
}

const Modal: React.FC<ModalProps> = ({ open, children, }) => {
    if (!open) return null;

    const portalDiv = document.querySelector('#portal') as HTMLElement;
    return ReactDOM.createPortal (
        <>
            <div className="overlay"></div>
            <div className="modal">{ children }</div>
        </>,
    portalDiv)
}

export default Modal;