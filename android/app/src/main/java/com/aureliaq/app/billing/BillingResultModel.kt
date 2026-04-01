package com.aureliaq.app.billing

sealed class BillingResultModel {
    data class Launched(val productId: String) : BillingResultModel()
    data class ProductNotFound(val id: String) : BillingResultModel()
    object Invalid : BillingResultModel()
}
