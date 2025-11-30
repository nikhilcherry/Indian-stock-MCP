// Simple API test without MCP server initialization
import * as dotenv from "dotenv";

dotenv.config();

const BASE_URL = "https://stock.indianapi.in";
const API_KEY = process.env.ISE_API_KEY;

console.log("=".repeat(60));
console.log("🧪 Direct API Test (No MCP Server)");
console.log("=".repeat(60));
console.log(`API Key: ${API_KEY ? API_KEY.substring(0, 20) + "..." : "❌ NOT FOUND"}`);
console.log(`Base URL: ${BASE_URL}`);
console.log("=".repeat(60));

async function testEndpoints() {
    const endpoints = [
        { name: "News", url: `${BASE_URL}/news` },
        { name: "Top Gainers", url: `${BASE_URL}/stock/gainers` },
        { name: "Top Losers", url: `${BASE_URL}/stock/losers` },
        { name: "Stock Price (Reliance)", url: `${BASE_URL}/stock/price?name=Reliance` },
    ];

    for (const endpoint of endpoints) {
        console.log(`\n📡 Testing: ${endpoint.name}`);
        console.log(`URL: ${endpoint.url}`);

        try {
            const response = await fetch(endpoint.url, {
                headers: {
                    "x-api-key": API_KEY || "",
                },
            });

            console.log(`Status: ${response.status} ${response.statusText}`);

            if (response.ok) {
                const data = await response.json();
                const dataStr = JSON.stringify(data, null, 2);
                console.log(`✅ Success! Response length: ${dataStr.length} bytes`);
                console.log(`Preview:`, dataStr.substring(0, 300) + "...");
            } else {
                const errorText = await response.text();
                console.log(`❌ Error Response:`, errorText.substring(0, 300));
            }
        } catch (err) {
            console.log(`❌ Request Failed:`, err.message);
        }

        console.log("-".repeat(60));
    }
}

testEndpoints().then(() => {
    console.log("\n✅ All tests complete!");
    process.exit(0);
}).catch(err => {
    console.error("❌ Test failed:", err);
    process.exit(1);
});
