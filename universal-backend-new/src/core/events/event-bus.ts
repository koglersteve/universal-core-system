// src/core/events/event-bus.ts

type EventHandler = (payload: any) => void | Promise<void>;

const subscribers = new Map<string, EventHandler[]>();

export function subscribe(eventName: string, handler: EventHandler) {
  if (!subscribers.has(eventName)) {
    subscribers.set(eventName, []);
  }
  subscribers.get(eventName)!.push(handler);
}

export function publish(eventName: string, payload: any) {
  const handlers = subscribers.get(eventName);
  if (!handlers || handlers.length === 0) return;

  for (const handler of handlers) {
    try {
      const result = handler(payload);
      if (result instanceof Promise) result.catch(console.error);
    } catch (err) {
      console.error(`Event handler error for ${eventName}:`, err);
    }
  }
}
