export type EventName = string;

export interface EventPayload {
  [key: string]: any;
}

export type EventHandler = (payload: EventPayload) => void | Promise<void>;

class EventBus {
  private handlers: Map<EventName, EventHandler[]> = new Map();

  on(event: EventName, handler: EventHandler) {
    const list = this.handlers.get(event) ?? [];
    list.push(handler);
    this.handlers.set(event, list);
  }

  off(event: EventName, handler: EventHandler) {
    const list = this.handlers.get(event);
    if (!list) return;
    this.handlers.set(
      event,
      list.filter((h) => h !== handler)
    );
  }

  async emit(event: EventName, payload: EventPayload = {}) {
    const list = this.handlers.get(event) ?? [];
    for (const handler of list) {
      await handler(payload);
    }
  }
}

export const eventBus = new EventBus();
