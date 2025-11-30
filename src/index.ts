import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as dotenv from "dotenv";

dotenv.config();

const BASE_URL = "https://stock.indianapi.in";
const API_KEY = process.env.ISE_API_KEY;

// ------------------------------
// Helper: API Request
// ------------------------------
async function makeRequest(url: string): Promise<any | null> {
  if (!API_KEY) {
    console.error("❌ Missing ISE_API_KEY in .env");
    return null;
  }

  try {
    const response = await fetch(url, {
      headers: {
        "x-api-key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error("❌ API Request Failed:", err);
    return null;
  }
}

// ------------------------------
// MCP Server Setup
// ------------------------------
const server = new McpServer({
  name: "Indian-Stock-Exchange-MCP",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// ------------------------------
// 1. Get Stock News
// ------------------------------
server.tool(
  "get-news",
  "Get latest stock market news",
  {},
  async () => {
    const url = `${BASE_URL}/news`;
    const data = await makeRequest(url);
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
    };
  }
);

// ------------------------------
// 2. Stock Details
// ------------------------------
server.tool(
  "get-stock-details",
  "Get details for a stock (e.g., 'Reliance', 'TCS')",
  { name: z.string().describe("Stock name") },
  async ({ name }) => {
    const url = `${BASE_URL}/stock?name=${encodeURIComponent(name)}`;
    const data = await makeRequest(url);
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
    };
  }
);

// ------------------------------
// 3. Stock Price
// ------------------------------
server.tool(
  "get-stock-price",
  "Get current price of a stock",
  { name: z.string().describe("Stock name") },
  async ({ name }) => {
    const url = `${BASE_URL}/stock?name=${encodeURIComponent(name)}`;
    const data = await makeRequest(url);

    if (data && data.currentPrice) {
      return {
        content: [{
          type: "text", text: JSON.stringify({
            name: data.companyName,
            currentPrice: data.currentPrice,
            percentChange: data.percentChange,
            updatedAt: new Date().toISOString()
          }, null, 2)
        }],
      };
    }

    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
    };
  }
);

// ------------------------------
// 4. Historical Data
// ------------------------------
server.tool(
  "get-stock-history",
  "Get historical data for a stock",
  {
    name: z.string().describe("Stock name"),
    period: z.string().describe("Period: 1m, 6m, 1yr, 3yr, 5yr, max"),
  },
  async ({ name, period }) => {
    const url = `${BASE_URL}/historical?stock_name=${encodeURIComponent(name)}&period=${encodeURIComponent(period)}&filter=default`;
    const data = await makeRequest(url);
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
    };
  }
);

// ------------------------------
// 5. Trending Stocks
// ------------------------------
server.tool(
  "get-trending-stocks",
  "Get list of trending stocks",
  {},
  async () => {
    const url = `${BASE_URL}/trending`;
    const data = await makeRequest(url);
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
    };
  }
);

// ------------------------------
// 6. Top Gainers
// ------------------------------
server.tool(
  "get-top-gainers",
  "Get top gaining stocks",
  {},
  async () => {
    const url = `${BASE_URL}/stock/gainers`;
    const data = await makeRequest(url);
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
    };
  }
);

// ------------------------------
// 7. Top Losers
// ------------------------------
server.tool(
  "get-top-losers",
  "Get top losing stocks",
  {},
  async () => {
    const url = `${BASE_URL}/stock/losers`;
    const data = await makeRequest(url);
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
    };
  }
);

// ------------------------------
// 8. Commodities
// ------------------------------
server.tool(
  "get-commodities",
  "Get commodities market data",
  {},
  async () => {
    const url = `${BASE_URL}/commodities`;
    const data = await makeRequest(url);
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
    };
  }
);

// ------------------------------
// 11. Price Shockers
// ------------------------------
server.tool(
  "get-price-shockers",
  "Get stocks with significant price movement",
  {},
  async () => {
    const url = `${BASE_URL}/price_shockers`;
    const data = await makeRequest(url);
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
    };
  }
);

// ------------------------------
// Boot the MCP Server
// ------------------------------
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("📈 Indian Stock Exchange MCP Server running...");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
