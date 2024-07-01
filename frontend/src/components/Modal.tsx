import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../index.css';

interface ModalProps {
    open: boolean;
    children?: any;
}

const Modal: React.FC<ModalProps> = ({ open, children, }) => {
    if (!open) return null;

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const portalDiv = document.querySelector('#portal') as HTMLElement;
    return ReactDOM.createPortal (
        <>
            <div className={`overlay ${isVisible ? 'active' : ''}`}></div>
            <div className={`modal ${isVisible ? 'active' : ''}`}>{ children }</div>
        </>,
    portalDiv)
}

export default Modal;