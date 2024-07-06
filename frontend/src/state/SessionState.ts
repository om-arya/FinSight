import { User, Holding } from "../api/UserAPI";
import { Asset } from "../api/AssetAPI";

const SessionState = () => {

    function setUser(user: User) {
        sessionStorage.setItem("user", JSON.stringify(user));
    }

    function setHoldings(holdings: Holding[]) {
        sessionStorage.setItem("holdings", JSON.stringify(holdings));
    }

    function setHoldingAssets(holdingAssets: Asset[]) {
        sessionStorage.setItem("holdingAssets", JSON.stringify(holdingAssets));
    }

    function setAllAssets(allAssets: Asset[]) {
        sessionStorage.setItem("allAssets", JSON.stringify(allAssets));
    }

    function setTop10AssetsByPriceChange(top10AssetsByPriceChange: Asset[]) {
        sessionStorage.setItem("top10AssetsByPriceChange", JSON.stringify(top10AssetsByPriceChange));
    }

    function setTop10AssetsByPriceGain(top10AssetsByPriceGain: Asset[]) {
        sessionStorage.setItem("top10AssetsByPriceGain", JSON.stringify(top10AssetsByPriceGain));
    }

    function setTop10AssetsByPriceLoss(top10AssetsByPriceLoss: Asset[]) {
        sessionStorage.setItem("top10AssetsByPriceLoss", JSON.stringify(top10AssetsByPriceLoss));
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

    function getTop10AssetsByPriceChange() {
        const top10AssetsByPriceChange = sessionStorage.getItem("top10AssetsByPriceChange");
        return top10AssetsByPriceChange ? JSON.parse(top10AssetsByPriceChange) as Asset[] : null;
    }

    function getTop10AssetsByPriceGain() {
        const top10AssetsByPriceGain = sessionStorage.getItem("top10AssetsByPriceGain");
        return top10AssetsByPriceGain ? JSON.parse(top10AssetsByPriceGain) as Asset[] : null;
    }

    function getTop10AssetsByPriceLoss() {
        const top10AssetsByPriceLoss = sessionStorage.getItem("top10AssetsByPriceLoss");
        return top10AssetsByPriceLoss ? JSON.parse(top10AssetsByPriceLoss) as Asset[] : null;
    }

    function clearSessionState() {
        sessionStorage.clear();
    }

    return { setUser, setHoldings, setHoldingAssets, setAllAssets, setTop10AssetsByPriceChange, setTop10AssetsByPriceGain,
             setTop10AssetsByPriceLoss, getUser, getHoldings, getHoldingAssets, getAllAssets, getTop10AssetsByPriceChange,
             getTop10AssetsByPriceLoss, clearSessionState };
}

export default SessionState;