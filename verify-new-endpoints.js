// Verify newly discovered endpoints
import * as dotenv from "dotenv";

dotenv.config();

const BASE_URL = "https://stock.indianapi.in";
const API_KEY = process.env.ISE_API_KEY;

console.log("🔍 Verifying New Endpoints...");
console.log(`Base URL: ${BASE_URL}`);

const endpoints = [
    { name: "Stock Details", url: "/stock?name=Reliance" },
    { name: "Historical Data", url: "/historical?stock_name=Reliance&period=1m&filter=default" },
    { name: "Trending Stocks", url: "/trending" },
    { name: "Price Shockers", url: "/price_shockers" },
    { name: "BSE Active", url: "/bse_most_active_stocks" },
    { name: "NSE Active", url: "/nse_most_active_stocks" },
    { name: "Commodities", url: "/commodities" },
    { name: "IPO", url: "/ipo" },
];

async function verify() {
    for (const ep of endpoints) {
        const url = `${BASE_URL}${ep.url}`;
        console.log(`\nTesting: ${ep.name} (${ep.url})`);

        try {
            const response = await fetch(url, {
                headers: { "x-api-key": API_KEY || "" }
            });

            console.log(`Status: ${response.status} ${response.statusText}`);

            if (response.ok) {
                const data = await response.json();
                const preview = JSON.stringify(data).substring(0, 100);
                console.log(`✅ Success! Data: ${preview}...`);
            } else {
                const err = await response.text();
                console.log(`❌ Failed: ${err.substring(0, 100)}`);
            }
        } catch (e) {
            console.log(`❌ Error: ${e.message}`);
        }
    }
}

verify();
