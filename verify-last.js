// Verify specific tools that might be failing
import * as dotenv from "dotenv";
dotenv.config();

const BASE_URL = "https://stock.indianapi.in";
const API_KEY = process.env.ISE_API_KEY;

async function check(name, url) {
    try {
        const res = await fetch(url, { headers: { "x-api-key": API_KEY } });
        console.log(`${name}: ${res.status} ${res.statusText}`);
        if (!res.ok) console.log(await res.text());
    } catch (e) { console.log(`${name} Error:`, e.message); }
}

async function run() {
    await check("get-bse-active", `${BASE_URL}/bse_most_active_stocks`);
    await check("get-nse-active", `${BASE_URL}/nse_most_active_stocks`);
    await check("get-commodities", `${BASE_URL}/commodities`);
    await check("get-price-shockers", `${BASE_URL}/price_shockers`);
}
run();
