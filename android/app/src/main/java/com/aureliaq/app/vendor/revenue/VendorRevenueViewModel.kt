package com.aureliaq.app.vendor.revenue

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class VendorRevenueViewModel(
    private val context: Context
) : ViewModel() {

    private val _state = MutableStateFlow(VendorRevenueState())
    val state: StateFlow<VendorRevenueState> = _state

    fun load() {
        viewModelScope.launch {
            // Replace with backend call
            val revenue = VendorRevenueState(
                totalRevenue = 1240.50,
                subscriptionRevenue = 840.00,
                adPackageRevenue = 400.50,
                lastPayout = "Mar 15, 2026",
                nextPayout = "Apr 15, 2026",
                trendPercent = 12.4
            )

            _state.value = revenue
        }
    }
}
