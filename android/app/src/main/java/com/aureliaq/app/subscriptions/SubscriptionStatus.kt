package com.aureliaq.app.subscriptions

data class SubscriptionStatus(
    val active: Boolean,
    val productId: String?,
    val renewalDate: String?,
    val platformLink: String = "https://play.google.com/store/account/subscriptions"
)
