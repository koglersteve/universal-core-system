package com.aureliaq.app.ads.purchase

import android.app.Activity
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import com.android.billingclient.api.ProductDetails

@Composable
fun AdPackagePurchaseView(
    onClose: () -> Unit
) {
    val context = LocalContext.current
    val activity = context as Activity

    val viewModel = remember { AdPackagePurchaseViewModel(context) }
    val products by viewModel.products.collectAsState()

    LaunchedEffect(Unit) {
        viewModel.loadProducts()
    }

    Scaffold(
        topBar = {
            TopAppBar(title = { Text("Buy Ad Packages") })
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .padding(padding)
                .padding(16.dp)
        ) {

            Text(
                text = "Choose a CPM package to boost your ads.",
                style = MaterialTheme.typography.bodyLarge
            )

            Spacer(modifier = Modifier.height(16.dp))

            val options = products.mapNotNull { product ->
                val price = product.oneTimePurchaseOfferDetails?.formattedPrice ?: return@mapNotNull null
                val impressions = product.productId.removePrefix("ads.cpm.").toIntOrNull() ?: 0

                AdPackageOption(
                    productId = product.productId,
                    impressions = impressions,
                    priceDisplay = price
                )
            }

            options.forEach { option ->
                AdPackageCard(
                    option = option,
                    onClick = {
                        val product = products.find { it.productId == option.productId }
                        if (product != null) {
                            viewModel.purchase(activity, product)
                        }
                    }
                )
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
