import axios from "axios";

export const API_URL = "http://localhost:8080/assets";

export interface ResponseEntity {
    data: any;
    status: number;
    headers: any;
}

/* READ ENDPOINTS */

/**
 * Get the asset from the database with the specified ticker. If the
 * asset does not exist, the controller returns a NOT_FOUND status.
 * 
 * @param ticker of the asset to get from the database.
 * @return a ResponseEntity consisting of an asset object, which is
 *         empty if not found, along with an HTTP status.
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
 * @return a ResponseEntity consisting of an HTTP status.
 */

export async function addAssetPrice(ticker: string, newPrice: number) {
    const response = await axios.patch<ResponseEntity>(API_URL + '/' + ticker, newPrice);
    return response;
}