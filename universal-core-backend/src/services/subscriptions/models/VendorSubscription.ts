// src/services/subscriptions/models/VendorSubscription.ts

import { PurchasePlatform } from "./AdEntitlement";

export type VendorTier = "local" | "regional" | "national";

export type VendorSubscriptionStatus =
  | "active"
  | "expired"
  | "canceled"
  | "pending";

export interface VendorSubscription {
  id: string;
  userId: string; // vendor user id
  purchasePlatform: PurchasePlatform;
  productId: string;
  transactionId: string;
  purchaseDate: Date;
  renewalDate: Date;
  expiresAt: Date;

  tier: VendorTier;
  price: number; // 49, 499, 1499

  status: VendorSubscriptionStatus;

  autoRenew: boolean;
  lastReceipt: string;
  validated: boolean;

  vendorListingActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}
