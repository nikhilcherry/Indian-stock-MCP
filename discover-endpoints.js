// Comprehensive API endpoint discovery script
import * as dotenv from "dotenv";

dotenv.config();

const BASE_URL = "https://stock.indianapi.in";
const API_KEY = process.env.ISE_API_KEY;

console.log("=".repeat(70));
console.log("🔍 Indian Stock Exchange API - Endpoint Discovery");
console.log("=".repeat(70));
console.log(`Base URL: ${BASE_URL}`);
console.log(`API Key: ${API_KEY ? API_KEY.substring(0, 20) + "..." : "❌ NOT FOUND"}`);
console.log("=".repeat(70));

// All possible endpoints to test
const endpoints = [
    // News endpoints
    { name: "General News", url: "/news" },
    { name: "Market News", url: "/market/news" },

    // Stock data endpoints
    { name: "Stock Details (Reliance)", url: "/stock/details?name=Reliance" },
    { name: "Stock Price (Reliance)", url: "/stock/price?name=Reliance" },
    { name: "Stock History (Reliance, 1m)", url: "/stock/history?name=Reliance&period=1m" },

    // Market movers
    { name: "Top Gainers", url: "/stock/gainers" },
    { name: "Top Losers", url: "/stock/losers" },

    // Recommendations
    { name: "Stock Recommendations", url: "/stock/recommendations" },

    // Additional possible endpoints
    { name: "Market Overview", url: "/market/overview" },
    { name: "Market Status", url: "/market/status" },
    { name: "Indices", url: "/indices" },
    { name: "Stock List", url: "/stocks" },
];

async function testEndpoint(endpoint) {
    const url = `${BASE_URL}${endpoint.url}`;

    try {
        const response = await fetch(url, {
            headers: {
                "x-api-key": API_KEY || "",
            },
        });

        const status = `${response.status} ${response.statusText}`;

        if (response.ok) {
            const data = await response.json();
            const dataStr = JSON.stringify(data);
            const preview = dataStr.length > 150 ? dataStr.substring(0, 150) + "..." : dataStr;

            return {
                name: endpoint.name,
                url: endpoint.url,
                status: "✅ " + status,
                working: true,
                dataLength: dataStr.length,
                preview: preview
            };
        } else {
            const errorText = await response.text();
            return {
                name: endpoint.name,
                url: endpoint.url,
                status: "❌ " + status,
                working: false,
                error: errorText.substring(0, 100)
            };
        }
    } catch (err) {
        return {
            name: endpoint.name,
            url: endpoint.url,
            status: "❌ ERROR",
            working: false,
            error: err.message
        };
    }
}

async function discoverEndpoints() {
    console.log("\n📡 Testing Endpoints...\n");

    const results = [];

    for (const endpoint of endpoints) {
        const result = await testEndpoint(endpoint);
        results.push(result);

        console.log(`${result.status} ${result.name}`);
        console.log(`   URL: ${result.url}`);

        if (result.working) {
            console.log(`   Data: ${result.dataLength} bytes`);
            console.log(`   Preview: ${result.preview}`);
        } else {
            console.log(`   Error: ${result.error}`);
        }

        console.log("");
    }

    // Summary
    console.log("=".repeat(70));
    console.log("📊 Summary");
    console.log("=".repeat(70));

    const working = results.filter(r => r.working);
    const broken = results.filter(r => !r.working);

    console.log(`\n✅ Working Endpoints (${working.length}):`);
    working.forEach(r => console.log(`   - ${r.name}: ${r.url}`));

    console.log(`\n❌ Broken Endpoints (${broken.length}):`);
    broken.forEach(r => console.log(`   - ${r.name}: ${r.url}`));

    console.log("\n" + "=".repeat(70));
}

discoverEndpoints().then(() => {
    console.log("✅ Discovery complete!");
    process.exit(0);
}).catch(err => {
    console.error("❌ Discovery failed:", err);
    process.exit(1);
});
