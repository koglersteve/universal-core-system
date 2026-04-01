package com.aureliaq.app.vendor.revenue

data class VendorRevenueState(
    val totalRevenue: Double = 0.0,
    val subscriptionRevenue: Double = 0.0,
    val adPackageRevenue: Double = 0.0,
    val lastPayout: String? = null,
    val nextPayout: String? = null,
    val trendPercent: Double = 0.0
)
