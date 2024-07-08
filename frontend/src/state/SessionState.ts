import { User, Holding } from "../api/UserAPI";
import { Asset } from "../api/AssetAPI";

/**
 * This function provides several getter and setter methods to streamline
 * client-side state management via session storage.
 */

const SessionState = () => {

    function setUser(user: User) {
        sessionStorage.setItem("user", JSON.stringify(user));
    }

    function setHoldingAssets(holdingAssets: Asset[]) {
        holdingAssets.sort((a, b) => a.ticker.localeCompare(b.ticker));
        sessionStorage.setItem("holdingAssets", holdingAssets ? JSON.stringify(holdingAssets) : JSON.stringify([]));
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

    return { setUser, setHoldingAssets, setAllAssets, setTopAssetsByPriceChange, setTopAssetsByPriceGain, setTopAssetsByPriceLoss,
             getUser, getHoldingAssets,getAllAssets, getTopAssetsByPriceChange, getTopAssetsByPriceGain, getTopAssetsByPriceLoss,
             clearSessionState };
}

export default SessionState;