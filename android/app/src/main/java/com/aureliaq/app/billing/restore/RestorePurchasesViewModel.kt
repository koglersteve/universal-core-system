package com.aureliaq.app.billing.restore

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.android.billingclient.api.*
import com.aureliaq.app.billing.BillingManager
import com.aureliaq.app.billing.BillingReceiptValidator
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class RestorePurchasesViewModel(
    private val context: Context
) : ViewModel() {

    private val _state = MutableStateFlow<RestoreResult>(RestoreResult.Idle)
    val state: StateFlow<RestoreResult> = _state

    private val billingManager = BillingManager.getInstance(context)

    fun restore() {
        _state.value = RestoreResult.Restoring

        billingManager.startConnection {
            restoreSubscriptions()
            restoreInAppPurchases()
        }
    }

    private fun restoreSubscriptions() {
        val params = QueryPurchasesParams.newBuilder()
            .setProductType(BillingClient.ProductType.SUBS)
            .build()

        billingManager.billingClient.queryPurchasesAsync(params) { _, purchases ->
            purchases.forEach { purchase ->
                BillingReceiptValidator.validate(purchase)
            }
        }
    }

    private fun restoreInAppPurchases() {
        val params = QueryPurchasesParams.newBuilder()
            .setProductType(BillingClient.ProductType.INAPP)
            .build()

        billingManager.billingClient.queryPurchasesAsync(params) { _, purchases ->
            purchases.forEach { purchase ->
                BillingReceiptValidator.validate(purchase)
            }

            _state.value = RestoreResult.Success
        }
    }
}
