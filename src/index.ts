/**
 * On This Day MCP — wraps byabbe.se/on-this-day (free, no auth)
 *
 * Tools:
 * - get_events: Historical events that occurred on a given month and day
 * - get_births: Notable births on a given month and day
 * - get_deaths: Notable deaths on a given month and day
 */

interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

const BASE_URL = 'https://byabbe.se/on-this-day';

type RawEntry = {
  year: string;
  description: string;
  wikipedia: Array<{ title: string; wikipedia: string }>;
};

type RawResponse = {
  date: string;
  events?: RawEntry[];
  births?: RawEntry[];
  deaths?: RawEntry[];
};

function formatEntry(entry: RawEntry) {
  return {
    year: entry.year,
    description: entry.description,
    wikipedia: entry.wikipedia?.map((w) => ({ title: w.title, url: w.wikipedia })) ?? [],
  };
}

const tools: McpToolExport['tools'] = [
  {
    name: 'get_events',
    description:
      'Get a list of historical events that took place on a specific month and day across all years.',
    inputSchema: {
      type: 'object',
      properties: {
        month: {
          type: 'number',
          description: 'Month as a number (1-12).',
        },
        day: {
          type: 'number',
          description: 'Day of the month (1-31).',
        },
      },
      required: ['month', 'day'],
    },
  },
  {
    name: 'get_births',
    description:
      'Get a list of notable people born on a specific month and day across all years.',
    inputSchema: {
      type: 'object',
      properties: {
        month: {
          type: 'number',
          description: 'Month as a number (1-12).',
        },
        day: {
          type: 'number',
          description: 'Day of the month (1-31).',
        },
      },
      required: ['month', 'day'],
    },
  },
  {
    name: 'get_deaths',
    description:
      'Get a list of notable people who died on a specific month and day across all years.',
    inputSchema: {
      type: 'object',
      properties: {
        month: {
          type: 'number',
          description: 'Month as a number (1-12).',
        },
        day: {
          type: 'number',
          description: 'Day of the month (1-31).',
        },
      },
      required: ['month', 'day'],
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  const month = args.month as number;
  const day = args.day as number;
  switch (name) {
    case 'get_events':
      return fetchEntries(month, day, 'events');
    case 'get_births':
      return fetchEntries(month, day, 'births');
    case 'get_deaths':
      return fetchEntries(month, day, 'deaths');
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function fetchEntries(month: number, day: number, type: 'events' | 'births' | 'deaths') {
  const url = `${BASE_URL}/${month}/${day}/${type}.json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`On This Day API error: ${res.status}`);
  const data = (await res.json()) as RawResponse;
  const entries = data[type] ?? [];
  return {
    date: data.date,
    type,
    count: entries.length,
    [type]: entries.map(formatEntry),
  };
}

export default { tools, callTool } satisfies McpToolExport;
