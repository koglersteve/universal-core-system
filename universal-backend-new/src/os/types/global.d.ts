// Ensures this file is treated as a module
export {};

declare global {
  //
  // ────────────────────────────────────────────────
  //  GLOBAL ACTION REGISTRY
  // ────────────────────────────────────────────────
  //
  var actions: {
    registry: Record<string, any>;
    list: () => any[];
  };

  //
  // ────────────────────────────────────────────────
  //  GLOBAL GOAL MANAGER
  // ────────────────────────────────────────────────
  //
  var goals: {
    add: (type: string, priority?: number, payload?: any) => any;
    list: () => any[];
    top: () => any;
    complete: (id: string) => void;
  };

  //
  // ────────────────────────────────────────────────
  //  CORE SUBSYSTEMS
  // ────────────────────────────────────────────────
  //
  var memory: {
    getSnapshot?: () => Promise<any> | any;
    store?: (args: any) => Promise<any>;
  };

  var persona: {
    getActive?: () => Promise<any> | any;
    update?: (args: any) => Promise<any>;
  };

  var emotion: {
    getCurrent?: () => Promise<any> | any;
    adjust?: (args: any) => Promise<any>;
  };

  var cognitive: {
    reframe?: (args: any) => Promise<any>;
    getState?: () => Promise<any>;
  };

  var behavior: {
    nudge?: (args: any) => Promise<any>;
    getState?: () => Promise<any>;
  };

  //
  // ────────────────────────────────────────────────
  //  KERNEL + OS
  // ────────────────────────────────────────────────
  //
  var kernel: {
    health?: () => Promise<any>;
    getStatus?: () => Promise<any>;
  };

  var os: {
    sync?: () => Promise<any>;
    getState?: () => Promise<any>;
  };

  //
  // ────────────────────────────────────────────────
  //  EVENT BUS
  // ────────────────────────────────────────────────
  //
  var eventBus: {
    on: (event: string, handler: (payload: any) => void | Promise<void>) => void;
    off: (event: string, handler: (payload: any) => void | Promise<void>) => void;
    emit: (event: string, payload?: any) => Promise<void>;
  };

  //
  // ────────────────────────────────────────────────
  //  DASHBOARD AGGREGATOR
  // ────────────────────────────────────────────────
  //
  var dashboardAggregator: {
    refresh: () => Promise<void>;
    getState: () => any;
    setAutonomyDecision: (action: string, goalId?: string) => void;
  };

  //
  // ────────────────────────────────────────────────
  //  INSIGHT ENGINE
  // ────────────────────────────────────────────────
  //
  var insightEngine: {
    recordKernelHealthWarning: (message: string) => Promise<void>;
    recordKernelHealthCritical: (message: string) => Promise<void>;
    recordAutonomyDecision: (action: string, goalId?: string) => Promise<void>;
    listRecent: (limit?: number) => any[];
  };

  //
  // ────────────────────────────────────────────────
  //  PLUGIN RUNTIME
  // ────────────────────────────────────────────────
  //
  var plugins: {
    list: () => any[];
    get: (id: string) => any;
    register: (manifest: any) => void;
    activate: (id: string) => void;
  };

  //
  // ────────────────────────────────────────────────
  //  PLUGIN CAPABILITY ROUTER
  // ────────────────────────────────────────────────
  //
  var pluginCapabilities: {
    call: (pluginId: string, capability: string, args?: any) => Promise<any>;
    listCapabilities: (pluginId: string) => string[];
  };
}
