package com.aureliaq.app.iap

import android.app.Activity
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import com.android.billingclient.api.ProductDetails

@Composable
fun IAPOnboardingView(
    onComplete: () -> Unit
) {
    val context = LocalContext.current
    val activity = context as Activity

    val viewModel = remember { IAPOnboardingViewModel(context) }

    val products by viewModel.products.collectAsState()

    LaunchedEffect(Unit) {
        viewModel.loadProducts()
    }

    Scaffold(
        topBar = {
            TopAppBar(title = { Text("Upgrade & Unlock") })
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .padding(padding)
                .padding(16.dp)
        ) {

            Text(
                text = "Choose a plan to unlock premium features.",
                style = MaterialTheme.typography.bodyLarge
            )

            Spacer(modifier = Modifier.height(16.dp))

            products.forEach { product ->
                IAPProductCard(
                    product = product,
                    onClick = { viewModel.purchase(activity, product) }
                )
            }

            Spacer(modifier = Modifier.height(24.dp))

            Button(
                onClick = onComplete,
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("Continue")
            }
        }
    }
}
