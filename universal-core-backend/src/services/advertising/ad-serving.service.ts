// src/services/advertising/ad-serving.service.ts

import { Ad } from "./Ad";
import { entitlementService } from "../subscriptions/logic/entitlement.service";

// TEMP: replace with real DB
const adStore: Ad[] = [];

function now(): Date {
  return new Date();
}

export class AdServingService {
  // Create an ad tied to an entitlement
  async createAd(params: {
    advertiserUserId: string;
    entitlementId: string;
    imageUrl?: string;
    headline?: string;
    body?: string;
    targetUrl?: string;
  }): Promise<Ad> {
    const ad: Ad = {
      id: crypto.randomUUID(),
      advertiserUserId: params.advertiserUserId,
      entitlementId: params.entitlementId,
      imageUrl: params.imageUrl,
      headline: params.headline,
      body: params.body,
      targetUrl: params.targetUrl,
      active: true,
      createdAt: now(),
      updatedAt: now(),
    };

    adStore.push(ad);
    return ad;
  }

  // Get an ad to serve (simple random for now)
  async getAdForPlacement(): Promise<Ad | null> {
    const activeAds = adStore.filter(a => a.active);
    if (activeAds.length === 0) return null;

    const ad = activeAds[Math.floor(Math.random() * activeAds.length)];

    // Record impression against entitlement (CPM tracking)
    await entitlementService.recordImpression(ad.entitlementId);

    return ad;
  }

  async listAdsForAdvertiser(advertiserUserId: string): Promise<Ad[]> {
    return adStore.filter(a => a.advertiserUserId === advertiserUserId);
  }

  async deactivateAd(adId: string): Promise<void> {
    const ad = adStore.find(a => a.id === adId);
    if (!ad) return;
    ad.active = false;
    ad.updatedAt = now();
  }
}

export const adServingService = new AdServingService();
