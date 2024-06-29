import axios from 'axios';
import cron from 'node-cron';
import { addAssetPrice } from "./AssetAPI.ts";
import { TD_KEY, BACKUP_TD_KEY } from './TD_KEY.ts';
import { TICKERS } from './tickers/TICKERS.ts';

interface EODData {
    symbol: string;
    data: any;
    close: number;
}

/**
 * Update asset prices daily at midnight (12:00 AM EST).
 */
cron.schedule('0 0 * * *', () => {
    updateAssetPrices();
}, { timezone: "America/New_York" });

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

/**
 * Fetch the EOD data for each of the provided tickers.
 * The process will take (# of tickers / 8) minutes.
 * 
 * @param tickers to fetch the EOD data for.
 * @returns a JSON object consisting of EOD data for each of the
 *          provided tickers.
 */
async function getEODData(tickers: string[]): Promise<EODData[]> {
    const TD_URL_BEGINNING = "https://api.twelvedata.com/eod?symbol=";
    const TD_URL_END = `&dp=2&apikey=${TD_KEY}`;
    let TD_URL = "";

    let responses: EODData[] = [];
    let count = 1;
    // API limit is 8 requests per minute, so we send 8 requests
    // every 70 seconds.
    while (count < tickers.length) {
        const ticker_batch: string[] = tickers.slice(count, count + 8);
        TD_URL = TD_URL_BEGINNING + ticker_batch.join(",") + TD_URL_END;

        try {
            const response = await axios.get(TD_URL) as EODData;
            responses.push(response);
        } catch (error) {
            console.error(error);
        }

        count += 8;
        if (count < tickers.length) {
            await new Promise(resolve => setTimeout(resolve, 70000));
        }
    }

    return responses;
}

// node --loader ts-node/esm TwelveDataAPI.ts