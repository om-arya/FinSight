import { User, Holding } from "../api/UserAPI";
import { Asset } from "../api/AssetAPI";

const SessionState = () => {

    function setUser(user: User) {
        sessionStorage.setItem("user", JSON.stringify(user));
    }

    function setHoldings(holdings: Holding[]) {
        holdings.sort((a, b) => a.ticker.localeCompare(b.ticker));
        sessionStorage.setItem("holdings", JSON.stringify(holdings));
    }

    function setHoldingAssets(holdingAssets: Asset[]) {
        holdingAssets.sort((a, b) => a.ticker.localeCompare(b.ticker));
        sessionStorage.setItem("holdingAssets", JSON.stringify(holdingAssets));
    }

    function setAllAssets(allAssets: Asset[]) {
        allAssets.sort((a, b) => a.ticker.localeCompare(b.ticker));
        sessionStorage.setItem("allAssets", JSON.stringify(allAssets));
    }

    function setTopAssetsByPriceChange(topAssetsByPriceChange: Asset[]) {
        sessionStorage.setItem("topAssetsByPriceChange", JSON.stringify(topAssetsByPriceChange));
    }

    function setTopAssetsByPriceGain(topAssetsByPriceGain: Asset[]) {
        sessionStorage.setItem("topAssetsByPriceGain", JSON.stringify(topAssetsByPriceGain));
    }

    function setTopAssetsByPriceLoss(topAssetsByPriceLoss: Asset[]) {
        sessionStorage.setItem("topAssetsByPriceLoss", JSON.stringify(topAssetsByPriceLoss));
    }

    function getUser() {
        const user = sessionStorage.getItem("user");
        return user ? JSON.parse(user) as User : null;
    }

    function getHoldings() {
        const holdings = sessionStorage.getItem("holdings");
        return holdings ? JSON.parse(holdings) as Holding[] : null;
    }

    function getHoldingAssets() {
        const holdingAssets = sessionStorage.getItem("holdingAssets");
        return holdingAssets ? JSON.parse(holdingAssets) as Asset[] : null;
    }

    function getAllAssets() {
        const allAssets = sessionStorage.getItem("allAssets");
        return allAssets ? JSON.parse(allAssets) as Asset[] : null;
    }

    function getTopAssetsByPriceChange() {
        const topAssetsByPriceChange = sessionStorage.getItem("topAssetsByPriceChange");
        return topAssetsByPriceChange ? JSON.parse(topAssetsByPriceChange) as Asset[] : null;
    }

    function getTopAssetsByPriceGain() {
        const topAssetsByPriceGain = sessionStorage.getItem("topAssetsByPriceGain");
        return topAssetsByPriceGain ? JSON.parse(topAssetsByPriceGain) as Asset[] : null;
    }

    function getTopAssetsByPriceLoss() {
        const topAssetsByPriceLoss = sessionStorage.getItem("topAssetsByPriceLoss");
        return topAssetsByPriceLoss ? JSON.parse(topAssetsByPriceLoss) as Asset[] : null;
    }

    function clearSessionState() {
        sessionStorage.clear();
    }

    return { setUser, setHoldings, setHoldingAssets, setAllAssets, setTopAssetsByPriceChange, setTopAssetsByPriceGain,
             setTopAssetsByPriceLoss, getUser, getHoldings, getHoldingAssets, getAllAssets, getTopAssetsByPriceChange,
             getTopAssetsByPriceGain, getTopAssetsByPriceLoss, clearSessionState };
}

export default SessionState;