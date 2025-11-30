# MCP Server Configuration Guide

## For Claude Desktop

1. **Locate your Claude Desktop config file:**
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - Full path: `C:\Users\Nikhi\AppData\Roaming\Claude\claude_desktop_config.json`

2. **Add this MCP server configuration:**

```json
{
  "mcpServers": {
    "indian-stock-exchange": {
      "command": "node",
      "args": [
        "c:\\Users\\Nikhi\\OneDrive\\Desktop\\file\\Indian-Stock-Exchange-MCP\\build\\index.js"
      ],
      "env": {
        "ISE_API_KEY": "sk-live-ecVWXWmgQvSVDVq5v1dtdpctmSFZtpZB2IozSqOp"
      }
    }
  }
}
```

3. **Restart Claude Desktop** to load the new MCP server

4. **Verify it's working:**
   - Look for the 🔌 icon in Claude Desktop
   - You should see "indian-stock-exchange" listed
   - Try asking: "Get me the latest stock news from India"

---

## Available Tools

Once connected, you can use these 8 tools through Claude:

1. **get-news** - Get Indian stock exchange news
2. **get-stock-details** - Get details for a specific stock (e.g., "Tata Steel")
3. **get-stock-price** - Get latest price of a stock (e.g., "Reliance")
4. **get-market-news** - Get latest market news
5. **get-stock-history** - Get historical data (requires stock name and period: 1m, 6m, 1y)
6. **get-top-gainers** - Get top gaining stocks
7. **get-top-losers** - Get top losing stocks
8. **get-stock-recommendations** - Get stock recommendations

---

## Example Prompts

Try these in Claude Desktop after setup:

- "What are the top gainers in the Indian stock market today?"
- "Get me the current price of Reliance Industries"
- "Show me the historical data for Infosys for the last 6 months"
- "What are the latest stock recommendations?"

---

## Troubleshooting

**Server not appearing?**
- Make sure you restarted Claude Desktop
- Check that the path to `index.js` is correct
- Verify Node.js is installed: `node --version`

**API errors?**
- Verify your API key is correct in the config
- Check that the `.env` file exists with the correct key

**Build errors?**
- Run `npm run build` in the project directory
- Make sure TypeScript compiled successfully
