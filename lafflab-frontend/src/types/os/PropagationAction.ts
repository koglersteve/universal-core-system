import type { SurfaceId } from "./SurfaceId";

export type PropagationAction = {
  toSurface: SurfaceId;
  weight: number;
  reason: string;
};
