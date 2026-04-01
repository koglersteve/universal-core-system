package com.aureliaq.app.receipts

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import java.text.SimpleDateFormat
import java.util.*

@Composable
fun ReceiptHistoryView(
    onClose: () -> Unit
) {
    val context = LocalContext.current
    val viewModel = remember { ReceiptHistoryViewModel(context) }

    val receipts by viewModel.receipts.collectAsState()

    LaunchedEffect(Unit) {
        viewModel.loadReceipts()
    }

    Scaffold(
        topBar = {
            TopAppBar(title = { Text("Receipt History") })
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .padding(padding)
                .padding(16.dp)
        ) {

            if (receipts.isEmpty()) {
                Text(
                    text = "No receipts found.",
                    style = MaterialTheme.typography.bodyLarge
                )
            } else {
                LazyColumn {
                    items(receipts) { receipt ->
                        ReceiptCard(receipt)
                    }
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            Button(
                onClick = onClose,
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("Close")
            }
        }
    }
}

@Composable
private fun ReceiptCard(receipt: ReceiptItem) {
    val date = remember(receipt.purchaseTime) {
        SimpleDateFormat("MMM dd, yyyy h:mm a", Locale.getDefault())
            .format(Date(receipt.purchaseTime))
    }

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {

            Text(
                text = receipt.productId,
                style = MaterialTheme.typography.titleMedium
            )

            Spacer(modifier = Modifier.height(6.dp))

            Text("Order ID: ${receipt.orderId ?: "—"}")
            Text("Token: ${receipt.purchaseToken.take(12)}…")
            Text("Date: $date")
            Text("Platform: ${receipt.platform}")
        }
    }
}
