export type Joke = {
  id: string;
  text: string;
};

export type Category = {
  id: string;
  name: string;
};

export type FavoriteItem = {
  id: string;
  favoritedAt: number;
};

export type HistoryItem = {
  id: string;
  viewedAt: number;
};
