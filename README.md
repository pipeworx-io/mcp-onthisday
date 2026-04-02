# @pipeworx/mcp-onthisday

MCP server for historical events, births, and deaths on any date via the [byabbe.se On This Day API](https://byabbe.se/on-this-day/). Free, no authentication required.

## Tools

| Tool | Description |
|------|-------------|
| `get_events` | Get historical events that took place on a specific month and day |
| `get_births` | Get notable people born on a specific month and day |
| `get_deaths` | Get notable people who died on a specific month and day |

## Quickstart via Pipeworx Gateway

```bash
curl -X POST https://gateway.pipeworx.io/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "onthisday__get_events",
      "arguments": { "month": 7, "day": 20 }
    },
    "id": 1
  }'
```

## License

MIT
