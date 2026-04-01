package com.aureliaq.app.vendor.analytics

data class AdAnalyticsState(
    val totalImpressions: Int = 0,
    val impressionsRemaining: Int = 0,
    val ctr: Double = 0.0,
    val cpc: Double = 0.0,
    val cpm: Double = 0.0,
    val trendPercent: Double = 0.0
)
