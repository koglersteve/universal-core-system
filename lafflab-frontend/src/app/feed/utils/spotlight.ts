export function calculateSpotlightScale(distance: number) {
  const maxScale = 1.05;
  const minScale = 0.95;
  const normalized = Math.max(0, 1 - distance * 0.002);
  return minScale + (maxScale - minScale) * normalized;
}

export function calculateSpotlightOpacity(distance: number) {
  const maxOpacity = 1;
  const minOpacity = 0.6;
  const normalized = Math.max(0, 1 - distance * 0.002);
  return minOpacity + (maxOpacity - minOpacity) * normalized;
}
