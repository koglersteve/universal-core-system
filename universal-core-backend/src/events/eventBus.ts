type EventPayload = {
  type: string;
  timestamp: string;
  data?: any;
};

const eventLog: EventPayload[] = [];

export function emitEvent(type: string, data?: any) {
  const event = {
    type,
    timestamp: new Date().toISOString(),
    data: data || null,
  };

  eventLog.push(event);

  // Keep log from growing forever
  if (eventLog.length > 5000) {
    eventLog.shift();
  }
}

export function getEvents() {
  return eventLog;
}
