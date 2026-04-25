export type Joke = {
  id: string;
  text: string;
  category: string;
};

export type Category = {
  id: string;
  name: string;
};

export type HistoryItem = {
  id: string;
  viewedAt: number;
};
