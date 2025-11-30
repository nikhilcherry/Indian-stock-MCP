// Verify updated MCP tools logic
import * as dotenv from "dotenv";

dotenv.config();

const BASE_URL = "https://stock.indianapi.in";
const API_KEY = process.env.ISE_API_KEY;

console.log("🔍 Verifying Updated MCP Tools Logic...");

async function testTool(name, url) {
    console.log(`\n🛠️  Tool: ${name}`);
    console.log(`    URL: ${url}`);

    try {
        const response = await fetch(url, {
            headers: { "x-api-key": API_KEY || "" }
        });

        if (response.ok) {
            const data = await response.json();
            const preview = JSON.stringify(data).substring(0, 100);
            console.log(`    ✅ Success! Data: ${preview}...`);

            // Specific check for stock price logic
            if (name === "get-stock-price" && data.currentPrice) {
                console.log(`    💰 Price extracted: ${data.currentPrice}`);
            }
        } else {
            console.log(`    ❌ Failed: ${response.status} ${response.statusText}`);
        }
    } catch (e) {
        console.log(`    ❌ Error: ${e.message}`);
    }
}

async function runTests() {
    await testTool("get-news", `${BASE_URL}/news`);
    await testTool("get-stock-details", `${BASE_URL}/stock?name=Reliance`);
    await testTool("get-stock-price", `${BASE_URL}/stock?name=Reliance`);
    await testTool("get-stock-history", `${BASE_URL}/historical?stock_name=Reliance&period=1m&filter=default`);
    await testTool("get-trending-stocks", `${BASE_URL}/trending`);
    await testTool("get-top-gainers", `${BASE_URL}/stock/gainers`);
    await testTool("get-top-losers", `${BASE_URL}/stock/losers`);
    await testTool("get-bse-active", `${BASE_URL}/bse_most_active_stocks`);
    await testTool("get-nse-active", `${BASE_URL}/nse_most_active_stocks`);
    await testTool("get-commodities", `${BASE_URL}/commodities`);
    await testTool("get-price-shockers", `${BASE_URL}/price_shockers`);
}

runTests();
