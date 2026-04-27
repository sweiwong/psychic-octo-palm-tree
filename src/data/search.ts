import type { SearchEntry } from './types';

const MAX_RESULTS = 30;

export function search(query: string, index: SearchEntry[]): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const matches: SearchEntry[] = [];
  for (const entry of index) {
    if (matches.length >= MAX_RESULTS) break;
    const haystack = `${entry.name} ${entry.summary}`.toLowerCase();
    if (haystack.includes(q)) {
      matches.push(entry);
    }
  }
  return matches;
}
