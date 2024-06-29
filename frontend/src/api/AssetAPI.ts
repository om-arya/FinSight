import axios from "axios";

const API_URL = "http://localhost:8080/assets";

export interface Asset {
    ticker: string;
    name: string;
    exchange: string;
    type: string;
    prices: number[];
}

export interface ResponseEntity {
    data: any;
    status: number;
    headers: any;
}

/* CREATE ENDPOINTS */

/**
 * For internal use only. The user does NOT have the ability to
 * create assets.
 * 
 * Create a new asset to save into the database. If an asset with
 * this ticker already exists, the controller returns a CONFLICT
 * HTTP status.
 * 
 * @param asset object to save as an entity in the database.
 * @returns a ResponseEntity consisting of an HTTP status.
 */
export async function createAsset(asset: Asset) {
    const response = await axios.post<ResponseEntity>(API_URL, asset);
}

/* READ ENDPOINTS */

/**
 * Get the asset from the database with the specified ticker. If the
 * asset does not exist, the controller returns a NOT_FOUND status.
 * 
 * @param ticker of the asset to get from the database.
 * @returns a ResponseEntity consisting of an asset object, which is
 *          empty if not found, along with an HTTP status.
 */
export async function getAssetByTicker(ticker: string) {
    const response = await axios.get<ResponseEntity>(API_URL + '/' + ticker);
    return response;
}

/* UPDATE ENDPOINTS */

/**
 * Add the new price to the prices of the asset with the specified
 * ticker. If the asset does not exist, the controller returns a
 * NOT_FOUND status.
 * 
 * @param ticker of the asset to update the prices of.
 * @param newPrice to add to the prices.
 * @returns a ResponseEntity consisting of an HTTP status.
 */

export async function addAssetPrice(ticker: string, newPrice: number) {
    const response = await axios.patch<ResponseEntity>(API_URL + '/' + ticker, newPrice);
    return response;
}

/* DELETE ENDPOINTS */

/**
 * For internal use only. The user does NOT have the ability to
 * delete assets.
 * 
 * Delete the asset with the specified ticker from the database. If
 * the asset does not exist, it is silently ignored.
 * 
 * @param ticker of the asset to delete from the database.
 * @returns a ResponseEntity consisting of an HTTP status.
 */
export async function deleteAsset(ticker: string) {
    const response = await axios.delete<ResponseEntity>(API_URL + '/' + ticker);
    return response;
}