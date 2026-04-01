package com.aureliaq.app.vendor.dashboard

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.android.billingclient.api.*
import com.aureliaq.app.billing.BillingManager
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class BillingHealthViewModel(
    private val context: Context
) : ViewModel() {

    private val _status = MutableStateFlow(BillingHealthStatus())
    val status: StateFlow<BillingHealthStatus> = _status

    private val billingManager = BillingManager.getInstance(context)

    fun load() {
        billingManager.startConnection {
            _status.value = _status.value.copy(billingConnected = true)
            checkSubscription()
            checkAdCredits()
            checkReceiptSync()
            computeOverallHealth()
        }
    }

    private fun checkSubscription() {
        val params = QueryPurchasesParams.newBuilder()
            .setProductType(BillingClient.ProductType.SUBS)
            .build()

        billingManager.billingClient.queryPurchasesAsync(params) { _, purchases ->
            _status.value = _status.value.copy(
                subscriptionActive = purchases.isNotEmpty()
            )
            computeOverallHealth()
        }
    }

    private fun checkAdCredits() {
        // Replace with backend call
        val valid = true
        _status.value = _status.value.copy(adCreditsValid = valid)
        computeOverallHealth()
    }

    private fun checkReceiptSync() {
        // Replace with backend call
        _status.value = _status.value.copy(
            lastReceiptSync = "Just now"
        )
        computeOverallHealth()
    }

    private fun computeOverallHealth() {
        val s = _status.value
        val healthy =
            s.billingConnected &&
            s.subscriptionActive &&
            s.adCreditsValid

        _status.value = _status.value.copy(overallHealthy = healthy)
    }
}
