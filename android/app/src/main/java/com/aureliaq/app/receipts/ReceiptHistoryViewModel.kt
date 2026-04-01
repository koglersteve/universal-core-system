package com.aureliaq.app.receipts

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.android.billingclient.api.*
import com.aureliaq.app.billing.BillingManager
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class ReceiptHistoryViewModel(
    private val context: Context
) : ViewModel() {

    private val _receipts = MutableStateFlow<List<ReceiptItem>>(emptyList())
    val receipts: StateFlow<List<ReceiptItem>> = _receipts

    private val billingManager = BillingManager.getInstance(context)

    fun loadReceipts() {
        billingManager.startConnection {
            queryAllReceipts()
        }
    }

    private fun queryAllReceipts() {
        val subsParams = QueryPurchasesParams.newBuilder()
            .setProductType(BillingClient.ProductType.SUBS)
            .build()

        val inAppParams = QueryPurchasesParams.newBuilder()
            .setProductType(BillingClient.ProductType.INAPP)
            .build()

        val allReceipts = mutableListOf<ReceiptItem>()

        billingManager.billingClient.queryPurchasesAsync(subsParams) { _, purchases ->
            purchases.forEach { purchase ->
                allReceipts.add(
                    ReceiptItem(
                        productId = purchase.products.firstOrNull() ?: "unknown",
                        orderId = purchase.orderId,
                        purchaseToken = purchase.purchaseToken,
                        purchaseTime = purchase.purchaseTime
                    )
                )
            }

            billingManager.billingClient.queryPurchasesAsync(inAppParams) { _, inAppPurchases ->
                inAppPurchases.forEach { purchase ->
                    allReceipts.add(
                        ReceiptItem(
                            productId = purchase.products.firstOrNull() ?: "unknown",
                            orderId = purchase.orderId,
                            purchaseToken = purchase.purchaseToken,
                            purchaseTime = purchase.purchaseTime
                        )
                    )
                }

                _receipts.value = allReceipts.sortedByDescending { it.purchaseTime }
            }
        }
    }
}
