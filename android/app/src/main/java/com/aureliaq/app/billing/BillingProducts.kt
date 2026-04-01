package com.aureliaq.app.billing

import com.android.billingclient.api.BillingClient
import com.android.billingclient.api.QueryProductDetailsParams

object BillingProducts {

    val productList = listOf(
        QueryProductDetailsParams.Product.newBuilder()
            .setProductId("vendor.premium.monthly")
            .setProductType(BillingClient.ProductType.SUBS)
            .build(),

        QueryProductDetailsParams.Product.newBuilder()
            .setProductId("ads.cpm.10000")
            .setProductType(BillingClient.ProductType.INAPP)
            .build()
    )
}
