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
  //  CORE SUBSYSTEMS (Persona, Memory, Emotion, etc.)
  //  These match your existing backend route systems.
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
  //  KERNEL + OS (Your system-level modules)
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
}
