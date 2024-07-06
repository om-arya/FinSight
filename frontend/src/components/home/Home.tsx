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
        if (holdings) {
            state.setHoldings(holdings);

            const holdingAssets: Asset[] = await Promise.all(holdings.map(async holding => {
                const holdingAsset: Asset = await assetApi.getAssetByTicker(holding.ticker);
                return holdingAsset;
            }));
            state.setHoldingAssets(holdingAssets);
        } else {
            state.setHoldings([]);
            state.setHoldingAssets([])
        }
        
        const allAssets: Asset[] = await assetApi.getAllAssets();
        state.setAllAssets(allAssets);

        const top10AssetsByPriceChange: Asset[] = await assetApi.getTopAssetsByPriceChange();
        state.setTopAssetsByPriceChange(top10AssetsByPriceChange);

        const top10AssetsByPriceGain: Asset[] = await assetApi.getTopAssetsByPriceGain();
        state.setTopAssetsByPriceGain(top10AssetsByPriceGain);

        const top10AssetsByPriceLoss: Asset[] = await assetApi.getTopAssetsByPriceLoss();
        state.setTopAssetsByPriceLoss(top10AssetsByPriceLoss);
    }

    async function handleGuestLogin() {
        const guest: User = await userApi.getUserByUsername("guest");
        await handleLogin(guest);

        window.open('/dashboard','_blank');
    }

    return (
        <div className="home">
            <div className="left-side">
                <img className="logo" src="/fs_olivebranches_padding.png" />
            </div>
            <div className="right-side">
                <LoginPanel handleLogin={async (user: User) => await handleLogin(user)}/>
                <p className="guest-login">Just visiting?<span onClick={() => handleGuestLogin()}>Log in as a Guest.</span></p>
            </div>
        </div>
    )
}

export default Home;