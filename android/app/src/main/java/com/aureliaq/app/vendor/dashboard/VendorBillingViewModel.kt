package com.aureliaq.app.vendor.dashboard

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.android.billingclient.api.*
import com.aureliaq.app.billing.BillingManager
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

data class VendorBillingState(
    val subscriptionActive: Boolean = false,
    val subscriptionProductId: String? = null,
    val renewalDate: String? = null,
    val adCredits: Int = 0,
    val billingHealthy: Boolean = true
)

class VendorBillingViewModel(
    private val context: Context
) : ViewModel() {

    private val _state = MutableStateFlow(VendorBillingState())
    val state: StateFlow<VendorBillingState> = _state

    private val billingManager = BillingManager.getInstance(context)

    fun load() {
        billingManager.startConnection {
            loadSubscription()
            loadAdCredits()
        }
    }

    private fun loadSubscription() {
        val params = QueryPurchasesParams.newBuilder()
            .setProductType(BillingClient.ProductType.SUBS)
            .build()

        billingManager.billingClient.queryPurchasesAsync(params) { _, purchases ->
            if (purchases.isNotEmpty()) {
                val p = purchases.first()
                _state.value = _state.value.copy(
                    subscriptionActive = true,
                    subscriptionProductId = p.products.firstOrNull(),
                    renewalDate = p.purchaseTime.toString()
                )
            }
        }
    }

    private fun loadAdCredits() {
        // Replace with your backend call
        _state.value = _state.value.copy(adCredits = 10000)
    }
}
