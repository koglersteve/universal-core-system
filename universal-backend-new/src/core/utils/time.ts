// src/core/utils/time.ts

export function now(): number {
  return Date.now();
}

export function toDate(timestamp: number): Date {
  return new Date(timestamp);
}

export function secondsAgo(sec: number): number {
  return Date.now() - sec * 1000;
}

export function minutesAgo(min: number): number {
  return Date.now() - min * 60 * 1000;
}
