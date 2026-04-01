package com.aureliaq.app.billing

import android.app.Activity
import android.content.Context
import com.android.billingclient.api.*

class BillingManager private constructor(context: Context) {

    private val billingClient: BillingClient = BillingClient.newBuilder(context)
        .setListener(PurchaseHandler)
        .enablePendingPurchases()
        .build()

    companion object {
        @Volatile private var INSTANCE: BillingManager? = null

        fun getInstance(context: Context): BillingManager {
            return INSTANCE ?: synchronized(this) {
                INSTANCE ?: BillingManager(context).also { INSTANCE = it }
            }
        }
    }

    fun startConnection(onReady: () -> Unit) {
        billingClient.startConnection(object : BillingClientStateListener {
            override fun onBillingSetupFinished(result: BillingResult) {
                if (result.responseCode == BillingClient.BillingResponseCode.OK) {
                    onReady()
                }
            }

            override fun onBillingServiceDisconnected() {}
        })
    }

    fun loadProducts(onLoaded: (List<ProductDetails>) -> Unit) {
        val params = QueryProductDetailsParams.newBuilder()
            .setProductList(BillingProducts.productList)
            .build()

        billingClient.queryProductDetailsAsync(params) { _, productDetailsList ->
            onLoaded(productDetailsList)
        }
    }

    fun launchPurchase(activity: Activity, product: ProductDetails) {
        val offerToken = product.subscriptionOfferDetails?.firstOrNull()?.offerToken

        val params = BillingFlowParams.newBuilder()
            .setProductDetailsParamsList(
                listOf(
                    BillingFlowParams.ProductDetailsParams.newBuilder()
                        .setProductDetails(product)
                        .apply {
                            if (offerToken != null) setOfferToken(offerToken)
                        }
                        .build()
                )
            )
            .build()

        billingClient.launchBillingFlow(activity, params)
    }
}

