// Direct test of the MCP server functionality
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import * as dotenv from "dotenv";

dotenv.config();

const BASE_URL = "https://stock.indianapi.in";
const API_KEY = process.env.ISE_API_KEY;

console.error("=".repeat(60));
console.error("🧪 MCP Server Test");
console.error("=".repeat(60));
console.error(`API Key: ${API_KEY ? API_KEY.substring(0, 20) + "..." : "❌ NOT FOUND"}`);
console.error(`Base URL: ${BASE_URL}`);
console.error("=".repeat(60));

async function testMakeRequest() {
    console.error("\n📡 Testing makeRequest function...\n");

    const testUrl = `${BASE_URL}/news`;
    console.error(`Fetching: ${testUrl}`);

    try {
        const response = await fetch(testUrl, {
            headers: {
                "x-api-key": API_KEY || "",
            },
        });

        console.error(`Status: ${response.status} ${response.statusText}`);

        if (response.ok) {
            const data = await response.json();
            console.error(`✅ Success! Received ${JSON.stringify(data).length} bytes`);
            console.error(`First item:`, JSON.stringify(data[0] || data, null, 2).substring(0, 200));
            return data;
        } else {
            const errorText = await response.text();
            console.error(`❌ Error:`, errorText);
            return null;
        }
    } catch (err) {
        console.error(`❌ Request Failed:`, err.message);
        return null;
    }
}

testMakeRequest().then(() => {
    console.error("\n" + "=".repeat(60));
    console.error("✅ Test Complete");
    console.error("=".repeat(60));
    process.exit(0);
});
