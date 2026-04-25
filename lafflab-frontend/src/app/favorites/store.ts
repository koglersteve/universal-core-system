let favorites: string[] = [];

export function getFavorites() {
  return favorites;
}

export function addFavorite(id: string) {
  if (!favorites.includes(id)) favorites.push(id);
}

export function removeFavorite(id: string) {
  favorites = favorites.filter((x) => x !== id);
}
