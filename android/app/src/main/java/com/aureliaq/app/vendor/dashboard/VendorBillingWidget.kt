package com.aureliaq.app.vendor.dashboard

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp

@Composable
fun VendorBillingWidget(
    onManageSubscription: () -> Unit,
    onUpgrade: () -> Unit
) {
    val context = LocalContext.current
    val viewModel = remember { VendorBillingViewModel(context) }

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
                text = "Subscription",
                style = MaterialTheme.typography.titleMedium
            )

            Spacer(modifier = Modifier.height(8.dp))

            if (state.subscriptionActive) {
                Text("Status: Active")
                Text("Plan: ${state.subscriptionProductId}")
                Text("Renews: ${state.renewalDate}")

                Spacer(modifier = Modifier.height(12.dp))

                Button(
                    onClick = onManageSubscription,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text("Manage Subscription")
                }

            } else {
                Text("Status: Not Active")

                Spacer(modifier = Modifier.height(12.dp))

                Button(
                    onClick = onUpgrade,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text("Upgrade to Premium")
                }
            }
        }
    }
}
