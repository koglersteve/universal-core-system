// src/services/subscriptions/models/AdEntitlement.ts

export type PurchasePlatform = "apple" | "google";

export type AdEntitlementStatus =
  | "active"
  | "expired"
  | "canceled"
  | "pending";

export interface AdEntitlement {
  id: string;
  userId: string; // advertiser user id
  purchasePlatform: PurchasePlatform;
  productId: string;      // IAP product id
  transactionId: string;  // Apple/Google transaction id
  purchaseDate: Date;
  renewalDate?: Date | null;
  expiresAt?: Date | null;

  impressionsPurchased: number;
  impressionsUsed: number;
  impressionsRemaining: number;

  status: AdEntitlementStatus;

  autoRenew: boolean;
  lastReceipt: string;
  validated: boolean;

  createdAt: Date;
  updatedAt: Date;
}
