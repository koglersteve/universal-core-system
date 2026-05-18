export const universeMiddleware = async (c: any, next: any) => {
  // Attach a simple universe context
  (c as any).universe = {
    requestId: crypto.randomUUID?.() ?? Date.now().toString()
  };
  await next();
};
