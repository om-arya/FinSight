import React from 'react';
import '../../static/home.css';

import SessionState from '../../state/SessionState.ts';
import UserAPI, { User, Holding } from '../../api/UserAPI.ts';
import AssetAPI, { Asset } from '../../api/AssetAPI.ts';

import LoginPanel from './LoginPanel.tsx';

const Home: React.FC = () => {
    const state = SessionState();
    const userApi = UserAPI();
    const assetApi = AssetAPI();

    async function handleLogin(user: User) {
        state.setUser(user);
        
        const holdings: Holding[] = user.holdings;
        holdings.sort((a, b) => a.ticker.localeCompare(b.ticker));
        state.setHoldings(holdings);

        const holdingAssets: Asset[] = await Promise.all(holdings.map(async holding => {
            const holdingAsset: Asset = await assetApi.getAssetByTicker(holding.ticker);
            return holdingAsset;
        }));
        holdingAssets.sort((a, b) => a.ticker.localeCompare(b.ticker));
        state.setHoldingAssets(holdingAssets);

        const allAssets: Asset[] = await assetApi.getAllAssets();
        allAssets.sort((a, b) => a.ticker.localeCompare(b.ticker));
        state.setAllAssets(allAssets);

        const top10AssetsByPriceChange: Asset[] = await assetApi.getTop10AssetsByPriceChange();
        top10AssetsByPriceChange.sort((a, b) => a.ticker.localeCompare(b.ticker));
        state.setTop10AssetsByPriceChange(top10AssetsByPriceChange);

        const top10AssetsByPriceGain: Asset[] = await assetApi.getTop10AssetsByPriceGain();
        top10AssetsByPriceGain.sort((a, b) => a.ticker.localeCompare(b.ticker));
        state.setTop10AssetsByPriceGain(top10AssetsByPriceGain);

        const top10AssetsByPriceLoss: Asset[] = await assetApi.getTop10AssetsByPriceLoss();
        top10AssetsByPriceLoss.sort((a, b) => a.ticker.localeCompare(b.ticker));
        state.setTop10AssetsByPriceLoss(top10AssetsByPriceLoss);
    }

    async function handleGuestLogin() {
        const guest: User = await userApi.getUserByUsername("guest");
        handleLogin(guest);

        window.open('/dashboard','_blank');
    }

    return (
        <div className="home">
            <div className="left-side">
                <img className="logo" src="/fs_olivebranches_padding.png" />
            </div>
            <div className="right-side">
                <LoginPanel handleLogin={(user: User) => handleLogin(user)}/>
                <p className="guest-login">Just visiting?<span onClick={() => handleGuestLogin()}>Log in as a Guest.</span></p>
            </div>
        </div>
    )
}

export default Home;