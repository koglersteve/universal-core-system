package com.aureliaq.app.vendor.dashboard

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp

@Composable
fun VendorAdCreditsWidget(
    onPurchaseCredits: () -> Unit
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
                text = "Ad Credits",
                style = MaterialTheme.typography.titleMedium
            )

            Spacer(modifier = Modifier.height(8.dp))

            Text("Available: ${state.adCredits}")

            Spacer(modifier = Modifier.height(12.dp))

            Button(
                onClick = onPurchaseCredits,
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("Buy More Credits")
            }
        }
    }
}
