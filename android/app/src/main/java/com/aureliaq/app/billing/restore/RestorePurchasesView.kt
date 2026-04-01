package com.aureliaq.app.billing.restore

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp

@Composable
fun RestorePurchasesView(
    onClose: () -> Unit
) {
    val context = LocalContext.current
    val viewModel = remember { RestorePurchasesViewModel(context) }

    val state by viewModel.state.collectAsState()

    Scaffold(
        topBar = {
            TopAppBar(title = { Text("Restore Purchases") })
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .padding(padding)
                .padding(20.dp)
        ) {

            Text(
                text = "Restore your subscriptions and ad packages.",
                style = MaterialTheme.typography.bodyLarge
            )

            Spacer(modifier = Modifier.height(24.dp))

            when (state) {
                RestoreResult.Idle -> {
                    Button(
                        onClick = { viewModel.restore() },
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text("Restore Purchases")
                    }
                }

                RestoreResult.Restoring -> {
                    CircularProgressIndicator()
                    Spacer(modifier = Modifier.height(12.dp))
                    Text("Restoring…")
                }

                RestoreResult.Success -> {
                    Text(
                        text = "Purchases restored successfully.",
                        style = MaterialTheme.typography.titleMedium
                    )

                    Spacer(modifier = Modifier.height(12.dp))

                    Button(
                        onClick = onClose,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text("Close")
                    }
                }

                is RestoreResult.Error -> {
                    Text(
                        text = "Error: ${(state as RestoreResult.Error).message}",
                        color = MaterialTheme.colorScheme.error
                    )

                    Spacer(modifier = Modifier.height(12.dp))

                    Button(
                        onClick = onClose,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text("Close")
                    }
                }
            }
        }
    }
}
