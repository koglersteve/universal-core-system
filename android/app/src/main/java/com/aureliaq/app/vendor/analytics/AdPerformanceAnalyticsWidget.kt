package com.aureliaq.app.vendor.analytics

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp

@Composable
fun AdPerformanceAnalyticsWidget(
    onViewAnalytics: () -> Unit
) {
    val context = LocalContext.current
    val viewModel = remember { AdPerformanceAnalyticsViewModel(context) }

    val state by viewModel.state.collectAsState()

    LaunchedEffect(Unit) {
        viewModel.load()
    }

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(12.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {

            Text(
                text = "Ad Performance",
                style = MaterialTheme.typography.titleMedium
            )

            Spacer(modifier = Modifier.height(12.dp))

            Text("Total Impressions: ${state.totalImpressions}")
            Text("Remaining: ${state.impressionsRemaining}")
            Text("CTR: ${state.ctr}%")
            Text("CPC: $${"%.2f".format(state.cpc)}")
            Text("CPM: $${"%.2f".format(state.cpm)}")

            Spacer(modifier = Modifier.height(12.dp))

            val trendColor = if (state.trendPercent >= 0) {
                MaterialTheme.colorScheme.primary
            } else {
                MaterialTheme.colorScheme.error
            }

            Text(
                text = "Trend: ${state.trendPercent}%",
                color = trendColor
            )

            Spacer(modifier = Modifier.height(16.dp))

            Button(
                onClick = onViewAnalytics,
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("View Full Analytics")
            }
        }
    }
}
