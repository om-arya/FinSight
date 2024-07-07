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

    function handleLogin(user: User): Promise<void> {
        return new Promise(async (resolve) => {
            state.setUser(user);
            
            const holdings: Holding[] = user.holdings;
            if (holdings.length > 0) {
                state.setHoldings(holdings);

                const holdingAssets = [];
                let todayReturn = 0;
                let totalCompoundQuarterlyReturn = 0;
                let totalCompoundAnnualReturn = 0;
                holdings.forEach(async (holding) => {
                    const holdingAsset: Asset = await assetApi.getAssetByTicker(holding.ticker);
                    holdingAssets.push(holdingAsset);

                    const prices = holdingAsset.prices;
                    todayReturn += holding.amount * (prices[prices.length - 1] - prices[prices.length - 2]);
                    totalCompoundQuarterlyReturn += (prices[prices.length - 1] / prices[0])^(1 / (prices.length / 91.3125)) - 1;
                    totalCompoundAnnualReturn += (prices[prices.length - 1] / prices[0])^(1 / (prices.length / 365.0)) - 1;
                    state.setHoldingAssets(holdingAssets);
                    state.setTodayReturn(todayReturn);
                    state.setQuarterlyReturn(totalCompoundQuarterlyReturn);
                    state.setAnnualReturn(totalCompoundAnnualReturn / holdings.length);
                })
            } else {
                state.setHoldings([]);
                state.setHoldingAssets([]);
            }
            
            const allAssets: Asset[] = await assetApi.getAllAssets();
            state.setAllAssets(allAssets);

            const top10AssetsByPriceChange: Asset[] = await assetApi.getTopAssetsByPriceChange();
            state.setTopAssetsByPriceChange(top10AssetsByPriceChange);

            const top10AssetsByPriceGain: Asset[] = await assetApi.getTopAssetsByPriceGain();
            state.setTopAssetsByPriceGain(top10AssetsByPriceGain);

            const top10AssetsByPriceLoss: Asset[] = await assetApi.getTopAssetsByPriceLoss();
            state.setTopAssetsByPriceLoss(top10AssetsByPriceLoss);

            resolve();
        });
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