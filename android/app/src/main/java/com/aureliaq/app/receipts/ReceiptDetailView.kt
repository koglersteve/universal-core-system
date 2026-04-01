package com.aureliaq.app.receipts

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import java.text.SimpleDateFormat
import java.util.*

@Composable
fun ReceiptDetailView(
    receipt: ReceiptItem,
    onClose: () -> Unit
) {
    val context = LocalContext.current

    val formattedDate = remember(receipt.purchaseTime) {
        SimpleDateFormat("MMM dd, yyyy h:mm a", Locale.getDefault())
            .format(Date(receipt.purchaseTime))
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Receipt Details") }
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .padding(padding)
                .padding(20.dp)
        ) {

            Text(
                text = receipt.productId,
                style = MaterialTheme.typography.titleLarge
            )

            Spacer(modifier = Modifier.height(16.dp))

            DetailRow("Order ID", receipt.orderId ?: "—")
            DetailRow("Purchase Token", receipt.purchaseToken)
            DetailRow("Purchase Date", formattedDate)
            DetailRow("Platform", receipt.platform)

            Spacer(modifier = Modifier.height(24.dp))

            Button(
                onClick = {
                    copyToClipboard(context, receipt.purchaseToken)
                },
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("Copy Token")
            }

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

@Composable
private fun DetailRow(label: String, value: String) {
    Column(modifier = Modifier.padding(vertical = 6.dp)) {
        Text(
            text = label,
            style = MaterialTheme.typography.labelLarge
        )
        Text(
            text = value,
            style = MaterialTheme.typography.bodyLarge
        )
    }
}

private fun copyToClipboard(context: Context, text: String) {
    val clipboard = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
    val clip = ClipData.newPlainText("Receipt Token", text)
    clipboard.setPrimaryClip(clip)
}
