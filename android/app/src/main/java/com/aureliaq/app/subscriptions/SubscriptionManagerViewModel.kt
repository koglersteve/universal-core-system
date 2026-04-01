package com.aureliaq.app.subscriptions

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.android.billingclient.api.*
import com.aureliaq.app.billing.BillingManager
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class SubscriptionManagerViewModel(
    private val context: Context
) : ViewModel() {

    private val _status = MutableStateFlow(
        SubscriptionStatus(
            active = false,
            productId = null,
            renewalDate = null
        )
    )
    val status: StateFlow<SubscriptionStatus> = _status

    private val billingManager = BillingManager.getInstance(context)

    fun refresh() {
        billingManager.startConnection {
            queryActiveSubscriptions()
        }
    }

    private fun queryActiveSubscriptions() {
        val params = QueryPurchasesParams.newBuilder()
            .setProductType(BillingClient.ProductType.SUBS)
            .build()

        billingManager.billingClient.queryPurchasesAsync(params) { _, purchases ->
            if (purchases.isNotEmpty()) {
                val purchase = purchases.first()
                _status.value = SubscriptionStatus(
                    active = true,
                    productId = purchase.products.firstOrNull(),
                    renewalDate = purchase.purchaseTime.toString()
                )
            } else {
                _status.value = SubscriptionStatus(
                    active = false,
                    productId = null,
                    renewalDate = null
                )
            }
        }
    }
}
