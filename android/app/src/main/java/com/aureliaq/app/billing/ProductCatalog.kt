package com.aureliaq.app.billing

import com.android.billingclient.api.BillingClient
import com.android.billingclient.api.QueryProductDetailsParams

/**
 * ProductCatalog.kt
 *
 * Defines all purchasable products for the Aurelia‑Q Android app.
 * Mirrors the iOS IAPProducts.swift file for cross‑platform parity.
 */
object ProductCatalog {

    // List of all products the BillingClient should load
    val productList = listOf(

        // Vendor Premium Monthly Subscription
        QueryProductDetailsParams.Product.newBuilder()
            .setProductId("vendor.premium.monthly")
            .setProductType(BillingClient.ProductType.SUBS)
            .build(),

        // CPM Ad Package (10,000 impressions)
        QueryProductDetailsParams.Product.newBuilder()
            .setProductId("ads.cpm.10000")
            .setProductType(BillingClient.ProductType.INAPP)
            .build(),

        // Add more products here as you expand the OS:
        //
        // QueryProductDetailsParams.Product.newBuilder()
        //     .setProductId("founder.tier1")
        //     .setProductType(BillingClient.ProductType.INAPP)
        //     .build(),
        //
        // QueryProductDetailsParams.Product.newBuilder()
        //     .setProductId("vendor.premium.yearly")
        //     .setProductType(BillingClient.ProductType.SUBS)
        //     .build(),
    )
}
