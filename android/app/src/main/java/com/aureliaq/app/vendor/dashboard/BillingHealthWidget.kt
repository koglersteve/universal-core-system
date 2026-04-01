package com.aureliaq.app.vendor.dashboard

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp

@Composable
fun BillingHealthWidget() {
    val context = LocalContext.current
    val viewModel = remember { BillingHealthViewModel(context) }

    val status by viewModel.status.collectAsState()

    LaunchedEffect(Unit) {
        viewModel.load()
    }

    val color = when {
        status.overallHealthy -> Color(0xFF4CAF50) // green
        status.subscriptionActive -> Color(0xFFFFC107) // yellow
        else -> Color(0xFFF44336) // red
    }

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(12.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {

            Text(
                text = "Billing Health",
                style = MaterialTheme.typography.titleMedium
            )

            Spacer(modifier = Modifier.height(12.dp))

            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(12.dp)
                    .background(color)
            ) {}

            Spacer(modifier = Modifier.height(16.dp))

            Text("Billing Connected: ${status.billingConnected}")
            Text("Subscription Active: ${status.subscriptionActive}")
            Text("Ad Credits Valid: ${status.adCreditsValid}")
            Text("Last Receipt Sync: ${status.lastReceiptSync}")
        }
    }
}
