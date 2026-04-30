export interface DashboardState {
  kernel: any;
  os: any;
  persona: any;
  memory: any;
  cognitive: any;
  emotion: any;
  behavior: any;
  autonomy: {
    lastDecision?: {
      action?: string;
      goalId?: string;
      at: number;
    };
  };
  updatedAt: number;
}
