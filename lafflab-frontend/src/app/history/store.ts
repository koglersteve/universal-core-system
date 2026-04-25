let history: string[] = [];

export function getHistory() {
  return history;
}

export function addToHistory(id: string) {
  if (!history.includes(id)) history.push(id);
}

export function clearHistory() {
  history = [];
}
