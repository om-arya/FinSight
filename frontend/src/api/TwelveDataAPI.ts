import axios from 'axios';
import { createAsset, addAssetPrice } from "./AssetAPI.ts";
import { TD_PROD_KEY, TD_TEST_KEY } from './TD_KEY.ts';
import { TICKERS } from './tickers/TICKERS.ts';

interface EODData {
    symbol: string;
    data: any;
    close: number;
}

// Update asset prices daily at midnight (12:00 AM EST) via GitHub Actions.
updateAssetPrices();

/**
 * Get the new prices for each ticker and send them to the back end
 * to be stored in the database.
 */
async function updateAssetPrices() {
    const responses: EODData[] = await getEODData(TICKERS);

    const tickers: string[] = []
    const prices: number[] = []

    responses.forEach((response) => {
        for (const key in response.data) {
            const data = response.data[key];
            tickers.push(data[key].symbol);
            prices.push(data[key].close);
        }
    })

    for (let i = 0; i < tickers.length; i++) {
        await addAssetPrice(tickers[i], prices[i]);
    }
}

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

/**
 * Fetch the EOD data for each of the provided tickers.
 * The process will take 70 seconds for 8 requests at a time.
 * 
 * @param tickers to fetch the EOD data for.
 * @returns a JSON object consisting of EOD data for each of the
 *          provided tickers.
 */
async function getEODData(tickers: string[]): Promise<EODData[]> {
    const TD_URL = `https://api.twelvedata.com/eod?apikey=${TD_PROD_KEY}&dp=2&symbol=`;

    let responses: EODData[] = [];
    const batchLimit = 8;
    let count = 1;
    // API limit is 8 requests per minute, so we send 8 requests
    // every 70 seconds.
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
            await sleep(70000);
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
        createAsset(assetsObj[key]);
    }
}
createAllAssets();
*/

// Run this file with "cd frontend/src/api && node --loader ts-node/esm TwelveDataAPI.ts"