import axios from 'axios';
import cron from 'node-cron';
import { addAssetPrice } from "./AssetAPI.ts";
import { TD_KEY, BACKUP_TD_KEY } from './TD_KEY.ts';
import { TICKERS } from './tickers/TICKERS.ts';

interface EODData {
    data: any;
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
    const responses: Array<EODData> = getEODData(TICKERS);

    const tickers: Array<string> = []
    const prices: Array<number> = []

    responses.forEach((response) => {
        let data = response.data;
        for (const key in data) {
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
function getEODData(tickers: Array<string>): Array<EODData> {
    const TD_URL_BEGINNING = "https://api.twelvedata.com/eod?symbol=";
    const TD_URL_END = `&dp=2&apikey=${TD_KEY}`;
    let TD_URL = "";

    let ticker_batch: Array<string> = [];
    let responses: Array<EODData> = [];
    let count = 1;
    // API limit is 8 requests per minute, so we send 8 requests
    // every 70 seconds.
    const interval = setInterval(async () => {
        while (ticker_batch.length < 8 && count <= tickers.length) {
            ticker_batch.push(tickers[count]);
            count++;
        }

        if (count - 1 == tickers.length) {
            clearInterval(interval);
        }

        TD_URL = TD_URL_BEGINNING + ticker_batch.join(",") + TD_URL_END;

        try {
            let response = await axios.get(TD_URL) as EODData;
            responses.push(response);
        } catch (error) {
            console.error(error);
        }

        ticker_batch.length = 0;
    }, 70000);

    return responses;
}

// node --loader ts-node/esm TwelveDataAPI.ts