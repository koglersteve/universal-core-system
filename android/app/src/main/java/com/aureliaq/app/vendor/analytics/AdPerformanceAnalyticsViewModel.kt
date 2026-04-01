package com.aureliaq.app.vendor.analytics

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class AdPerformanceAnalyticsViewModel(
    private val context: Context
) : ViewModel() {

    private val _state = MutableStateFlow(AdAnalyticsState())
    val state: StateFlow<AdAnalyticsState> = _state

    fun load() {
        viewModelScope.launch {
            // Replace with backend call
            val analytics = AdAnalyticsState(
                totalImpressions = 18500,
                impressionsRemaining = 3500,
                ctr = 2.4,
                cpc = 0.18,
                cpm = 4.20,
                trendPercent = 8.7
            )

            _state.value = analytics
        }
    }
}
