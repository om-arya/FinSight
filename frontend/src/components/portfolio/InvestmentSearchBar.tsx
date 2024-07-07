import React, { useState, useEffect } from 'react';
import { IoSearchOutline } from "react-icons/io5";

import SessionState from '../../state/SessionState';
import { Asset } from '../../api/AssetAPI';

const InvestmentSearchBar: React.FC<any> = ({ setSearchMatches }) => {
    const state = SessionState();
    const allAssets = state.getAllAssets();

    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        handleSearch(searchInput);
    }, [searchInput])

    function handleSearch(input: string) {
        const matches: string[] = [];
        allAssets.forEach((asset: Asset) => {
            if (asset.ticker.toLowerCase().includes(input.toLowerCase()) || asset.name.toLowerCase().includes(input.toLowerCase())) {
                matches.push(asset.ticker);
            }
        })
        setSearchMatches(matches);
    }

    return (
        <div className="investment-search-bar">
            <div className="search-input-container">
                <IoSearchOutline className="icon"/>
                <input type="text" name="investmentSearchInput" placeholder="Search for an asset (e.g. JPM, Uber, etc.)" autoComplete="on"
                    onChange={e => setSearchInput(e.target.value)}/>
            </div>
        </div>
    )
}

export default InvestmentSearchBar;