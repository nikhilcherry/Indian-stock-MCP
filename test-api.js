// Quick test script to verify API connectivity
import * as dotenv from "dotenv";

dotenv.config({ path: "./src/.env" });

const BASE_URL = "https://stock.indianapi.in";
const API_KEY = process.env.ISE_API_KEY;

console.log("🔍 Testing Indian Stock Exchange API...\n");
console.log("API Key:", API_KEY ? `${API_KEY.substring(0, 15)}...` : "❌ NOT FOUND");
console.log("Base URL:", BASE_URL);
console.log("\n" + "=".repeat(50) + "\n");

async function testAPI() {
    const testEndpoints = [
        { name: "News", url: `${BASE_URL}/news` },
        { name: "Top Gainers", url: `${BASE_URL}/stock/gainers` },
        { name: "Top Losers", url: `${BASE_URL}/stock/losers` },
    ];

    for (const endpoint of testEndpoints) {
        console.log(`Testing: ${endpoint.name}`);
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
                console.log(`✅ Success! Data received:`, JSON.stringify(data).substring(0, 100) + "...");
            } else {
                const errorText = await response.text();
                console.log(`❌ Error Response:`, errorText.substring(0, 200));
            }
        } catch (error) {
            console.log(`❌ Request Failed:`, error.message);
        }

        console.log("\n" + "-".repeat(50) + "\n");
    }
}

testAPI().catch(console.error);
