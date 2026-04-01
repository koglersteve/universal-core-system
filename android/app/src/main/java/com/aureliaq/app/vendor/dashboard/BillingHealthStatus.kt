package com.aureliaq.app.vendor.dashboard

data class BillingHealthStatus(
    val billingConnected: Boolean = false,
    val subscriptionActive: Boolean = false,
    val adCreditsValid: Boolean = true,
    val lastReceiptSync: String? = null,
    val overallHealthy: Boolean = false
)
