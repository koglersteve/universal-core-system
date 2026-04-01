// src/services/subscriptions/logic/entitlement.service.ts

import { AdEntitlement } from "../models/AdEntitlement";
import { VendorSubscription, VendorTier } from "../models/VendorSubscription";

// Replace these with your real DB calls
const adEntitlementStore: AdEntitlement[] = [];
const vendorSubscriptionStore: VendorSubscription[] = [];

function now(): Date {
  return new Date();
}

export class EntitlementService {
  // ---------- AD ENTITLEMENTS (ADVERTISERS) ----------

  async createAdEntitlement(params: {
    userId: string;
    purchasePlatform: "apple" | "google";
    productId: string;
    transactionId: string;
    impressionsPurchased: number;
    autoRenew: boolean;
    receipt: string;
  }): Promise<AdEntitlement> {
    const entity: AdEntitlement = {
      id: crypto.randomUUID(),
      userId: params.userId,
      purchasePlatform: params.purchasePlatform,
      productId: params.productId,
      transactionId: params.transactionId,
      purchaseDate: now(),
      renewalDate: params.autoRenew ? this.calculateNextRenewalDate() : null,
      expiresAt: null,
      impressionsPurchased: params.impressionsPurchased,
      impressionsUsed: 0,
      impressionsRemaining: params.impressionsPurchased,
      status: "active",
      autoRenew: params.autoRenew,
      lastReceipt: params.receipt,
      validated: true, // set true after receipt validation
      createdAt: now(),
      updatedAt: now(),
    };

    adEntitlementStore.push(entity);
    return entity;
  }

  async recordImpression(adEntitlementId: string): Promise<void> {
    const ent = adEntitlementStore.find(e => e.id === adEntitlementId);
    if (!ent || ent.status !== "active") return;

    ent.impressionsUsed += 1;
    ent.impressionsRemaining = Math.max(
      0,
      ent.impressionsPurchased - ent.impressionsUsed
    );
    ent.updatedAt = now();

    if (ent.impressionsRemaining <= 0) {
      ent.status = "expired";
      ent.expiresAt = now();
    }
  }

  async getActiveAdEntitlementsForUser(userId: string): Promise<AdEntitlement[]> {
    return adEntitlementStore.filter(
      e => e.userId === userId && e.status === "active"
    );
  }

  // ---------- VENDOR SUBSCRIPTIONS ----------

  async createVendorSubscription(params: {
    userId: string;
    purchasePlatform: "apple" | "google";
    productId: string;
    transactionId: string;
    tier: VendorTier;
    price: number;
    autoRenew: boolean;
    receipt: string;
  }): Promise<VendorSubscription> {
    const purchaseDate = now();
    const renewalDate = this.calculateNextRenewalDate();
    const expiresAt = renewalDate; // simple: expires when next billing is due

    const sub: VendorSubscription = {
      id: crypto.randomUUID(),
      userId: params.userId,
      purchasePlatform: params.purchasePlatform,
      productId: params.productId,
      transactionId: params.transactionId,
      purchaseDate,
      renewalDate,
      expiresAt,
      tier: params.tier,
      price: params.price,
      status: "active",
      autoRenew: params.autoRenew,
      lastReceipt: params.receipt,
      validated: true,
      vendorListingActive: true,
      createdAt: now(),
      updatedAt: now(),
    };

    vendorSubscriptionStore.push(sub);
    return sub;
  }

  async getActiveVendorSubscriptionForUser(
    userId: string
  ): Promise<VendorSubscription | null> {
    return (
      vendorSubscriptionStore.find(
        s => s.userId === userId && s.status === "active"
      ) || null
    );
  }

  async deactivateVendorSubscription(id: string): Promise<void> {
    const sub = vendorSubscriptionStore.find(s => s.id === id);
    if (!sub) return;
    sub.status = "expired";
    sub.vendorListingActive = false;
    sub.expiresAt = now();
    sub.updatedAt = now();
  }

  // ---------- UTILITIES ----------

  private calculateNextRenewalDate(): Date {
    const d = new Date();
    d.setMonth(d.getMonth() + 1); // simple monthly renewal
    return d;
  }
}

export const entitlementService = new EntitlementService();
