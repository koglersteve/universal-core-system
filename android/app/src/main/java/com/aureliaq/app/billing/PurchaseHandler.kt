package com.aureliaq.app.billing

import com.android.billingclient.api.*

object PurchaseHandler : PurchasesUpdatedListener {

    override fun onPurchasesUpdated(
        result: BillingResult,
        purchases: MutableList<Purchase>?
    ) {
        if (result.responseCode == BillingClient.BillingResponseCode.OK && purchases != null) {
            for (purchase in purchases) {
                BillingReceiptValidator.validate(purchase)
            }
        }
    }
}
