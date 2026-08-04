# mcp-onthisday

On This Day MCP — wraps byabbe.se/on-this-day (free, no auth)

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `get_events` | Search historical events on a specific date. Provide month (1-12) and day (1-31). Returns event descriptions, years, and details. |
| `get_births` | Find notable people born on a specific date. Provide month (1-12) and day (1-31). Returns names, birth years, and biographical details. |
| `get_deaths` | Find notable people who died on a specific date. Provide month (1-12) and day (1-31). Returns names, death years, and biographical detail. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "onthisday": {
      "url": "https://gateway.pipeworx.io/onthisday/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Onthisday data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
