import axios, { HttpStatusCode } from "axios";

import { FLY_URL } from "./data/FLY_URL.ts";

const API_URL = FLY_URL + "assets";

export interface Asset {
    ticker: string;
    name: string;
    exchange: string;
    sector: string;
    prices: number[];
}

interface ResponseEntity {
    data: any;
    status: HttpStatusCode;
}

/**
 * This function provides several methods to provide CRUD functionality on
 * asset data, working closely with the back end REST API.
 */
const AssetAPI = () => {

    /* CREATE ENDPOINTS */

    // For internal use only. The user does NOT have the ability to
    // create assets.

    /**
     * Create a new asset to save into the database. If an asset with
     * this ticker already exists, it is silently ignored.
     * 
     * @param asset object to save as an entity in the database.
     * @returns the HTTP status returned by the request.
     */
    async function createAsset(asset: Asset): Promise<HttpStatusCode> {
        const response = await axios.post(API_URL, asset) as ResponseEntity;
        return response.status as HttpStatusCode;
    }

    /* READ ENDPOINTS */

    /**
     * Get the asset from the database with the specified ticker. If the
     * asset does not exist, the controller returns an empty body.
     * 
     * @param ticker of the asset to get from the database.
     * @returns the asset returned by the request, which is empty if
     *          it does not exist.
     */
    async function getAssetByTicker(ticker: string): Promise<Asset> {
        const response = await axios.get(API_URL + '/' + ticker) as ResponseEntity;
        return response.data as Asset;
    }

    /**
     * Get all assets from the database.
     * 
     * @returns an array of all assets from the database.
     */
    async function getAllAssets(): Promise<Asset[]> {
        const response = await axios.get(API_URL + '/all') as ResponseEntity;
        return response.data as Asset[];
    }

    /**
     * Get the top 8 assets by the highest % change between their last
     * 2 prices.
     * 
     * @returns an array of the top 8 assets by price change.
     */
    async function getTopAssetsByPriceChange(): Promise<Asset[]> {
        const response = await axios.get(API_URL + '/toppricechange') as ResponseEntity;
        return response.data as Asset[];
    }

    /**
     * Get the top 8 assets by the most positive % change between their
     * last 2 prices.
     * 
     * @returns an array of the top 8 assets by price gain.
     */
    async function getTopAssetsByPriceGain(): Promise<Asset[]> {
        const response = await axios.get(API_URL + '/toppricegain') as ResponseEntity;
        return response.data as Asset[];
    }

    /**
     * Get the top 8 assets by the most negative % change between their
     * last 2 prices.
     * 
     * @returns an array of the top 8 assets by price loss.
     */
    async function getTopAssetsByPriceLoss(): Promise<Asset[]> {
        const response = await axios.get(API_URL + '/toppriceloss') as ResponseEntity;
        return response.data as Asset[];
    }

    /* UPDATE ENDPOINTS */

    // For internal use only. The user does NOT have the ability to
    // change asset data.

    /**
     * Add the new price to the prices of the asset with the specified
     * ticker. If the asset does not exist, it is silently ignored.
     * 
     * @param ticker of the asset to update the prices of.
     * @param newPrice to add to the prices.
     * @returns the HTTP status returned by the request.
     */

    async function addAssetPrice(ticker: string, newPrice: number): Promise<HttpStatusCode> {
        const response = await axios.patch(API_URL + '/' + ticker + "?newPrice=" + newPrice) as ResponseEntity;
        console.log("RESPONSE STATUS: " + response.status);
        return response.status as HttpStatusCode;
    }

    /* DELETE ENDPOINTS */

    // For internal use only. The user does NOT have the ability to
    // delete assets.

    /**
     * Delete the asset with the specified ticker from the database. If
     * the asset does not exist, it is silently ignored.
     * 
     * @param ticker of the asset to delete from the database.
     * @returns the HTTP status returned by the request.
     */
    async function deleteAsset(ticker: string): Promise<HttpStatusCode> {
        const response = await axios.delete(API_URL + '/' + ticker) as ResponseEntity;
        return response.status as HttpStatusCode;
    }

    return { createAsset, getAssetByTicker, getAllAssets, getTopAssetsByPriceChange, getTopAssetsByPriceGain,
             getTopAssetsByPriceLoss, addAssetPrice, deleteAsset };
}

export default AssetAPI;