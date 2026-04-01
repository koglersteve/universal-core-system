package com.aureliaq.app.ads.purchase

import android.app.Activity
import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.android.billingclient.api.ProductDetails
import com.aureliaq.app.billing.BillingManager
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class AdPackagePurchaseViewModel(
    private val context: Context
) : ViewModel() {

    private val _products = MutableStateFlow<List<ProductDetails>>(emptyList())
    val products: StateFlow<List<ProductDetails>> = _products

    private val billingManager = BillingManager.getInstance(context)

    fun loadProducts() {
        billingManager.startConnection {
            billingManager.loadProducts { list ->
                _products.value = list.filter {
                    it.productId.startsWith("ads.cpm")
                }
            }
        }
    }

    fun purchase(activity: Activity, product: ProductDetails) {
        billingManager.launchPurchase(activity, product)
    }
}
