// src/services/advertising/Ad.ts

export interface Ad {
  id: string;
  advertiserUserId: string;
  entitlementId: string; // links to AdEntitlement
  imageUrl?: string;
  headline?: string;
  body?: string;
  targetUrl?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
