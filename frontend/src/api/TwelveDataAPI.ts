import axios from 'axios';
import AssetAPI from "./AssetAPI.ts";
import { TD_PROD_KEY, TD_TEST_KEY } from './data/TD_KEY.ts';
import { TICKERS } from './data/TICKERS.ts';

interface EODData {
    symbol: string;
    data: any;
    close: number;
}

const assetApi = AssetAPI();

// Update asset prices daily at 2:00 AM EST via GitHub Actions.
console.log("RUNNING");
updateAssetPrices();

/**
 * Get the new prices for each ticker and send them to the back end
 * to be stored in the database.
 */
async function updateAssetPrices() {
    const responses: EODData[] = await getEODData(TICKERS);

    responses.forEach(async (response) => {
        for (const key in response.data) {
            const data = response.data[key];
            const ticker: string = data.symbol;
            const newPrice: number = parseFloat(data.close);
            console.log("TICKER: " + ticker + "\nNEWPRICE: " + newPrice);
            await assetApi.addAssetPrice(ticker, newPrice);
        }
    })
}

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

/**
 * Fetch the EOD data for each of the provided tickers.
 * The process will take 65 seconds for 8 requests at a time.
 * 
 * @param tickers to fetch the EOD data for.
 * @returns a JSON object consisting of EOD data for each of the
 *          provided tickers.
 */
async function getEODData(tickers: string[]): Promise<EODData[]> {
    const TD_URL = `https://api.twelvedata.com/eod?apikey=${TD_PROD_KEY}&dp=2&symbol=`;

    let responses: EODData[] = [];
    const batchLimit = 8;
    let count = 500;
    // API limit is 8 requests per minute, so we send 8 requests
    // every 65 seconds.
    while (count < tickers.length) {
        const ticker_batch: string[] = tickers.slice(count, count + batchLimit);

        try {
            const response = await axios.get(TD_URL + ticker_batch.join(',')) as EODData;
            responses.push(response);
            count += batchLimit;
        } catch (error) {
            console.error(error);
        }

        if (count < tickers.length) {
            await sleep(65000);
        }
    }

    return responses;
}

/**
 * For each asset in assets.json, create an asset object in the
 * database.
 * 
 * We run this only when historical asset data must be replaced.
*/
/*
import assetsObj from './assets/assets.json' with { type : "json" };
async function createAllAssets() {
    for (const key in assetsObj) {
        assetApi.createAsset(assetsObj[key]);
    }
}
createAllAssets();
*/

// Run this file with "cd frontend/src/api && node --loader ts-node/esm TwelveDataAPI.ts"