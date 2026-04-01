package com.aureliaq.app.billing

import android.app.Activity
import android.net.Uri

object DeepLinkPurchaseHandler {

    fun handle(activity: Activity, uri: Uri, onResult: (BillingResultModel) -> Unit) {
        val productId = uri.getQueryParameter("productId") ?: run {
            onResult(BillingResultModel.Invalid)
            return
        }

        val manager = BillingManager.getInstance(activity)

        manager.startConnection {
            manager.loadProducts { products ->
                val product = products.find { it.productId == productId }

                if (product == null) {
                    onResult(BillingResultModel.ProductNotFound(productId))
                    return@loadProducts
                }

                manager.launchPurchase(activity, product)
                onResult(BillingResultModel.Launched(productId))
            }
        }
    }
}
