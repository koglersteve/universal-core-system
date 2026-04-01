package com.aureliaq.app.receipts

data class ReceiptItem(
    val productId: String,
    val orderId: String?,
    val purchaseToken: String,
    val purchaseTime: Long,
    val platform: String = "Android"
)
