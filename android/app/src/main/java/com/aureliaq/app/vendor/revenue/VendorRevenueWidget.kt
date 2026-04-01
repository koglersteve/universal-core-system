package com.aureliaq.app.vendor.revenue

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp

@Composable
fun VendorRevenueWidget(
    onViewRevenue: () -> Unit
) {
    val context = LocalContext.current
    val viewModel = remember { VendorRevenueViewModel(context) }

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
                text = "Revenue",
                style = MaterialTheme.typography.titleMedium
            )

            Spacer(modifier = Modifier.height(12.dp))

            Text(
                text = "$${"%.2f".format(state.totalRevenue)}",
                style = MaterialTheme.typography.headlineMedium
            )

            Spacer(modifier = Modifier.height(8.dp))

            Text("Subscriptions: $${"%.2f".format(state.subscriptionRevenue)}")
            Text("Ad Packages: $${"%.2f".format(state.adPackageRevenue)}")

            Spacer(modifier = Modifier.height(12.dp))

            Text("Last Payout: ${state.lastPayout ?: "—"}")
            Text("Next Payout: ${state.nextPayout ?: "—"}")

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
                onClick = onViewRevenue,
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("View Full Revenue Dashboard")
            }
        }
    }
}
