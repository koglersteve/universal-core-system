// Default export
export default function personalizedRanking(items: any[], user: any = null) {
  return items;
}

// Named export (distinct function name)
export function personalizedRankingFn(items: any[], user: any = null) {
  return items;
}

// Alias to satisfy named import
export const personalizedRanking = personalizedRankingFn;
