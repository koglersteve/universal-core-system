package com.aureliaq.app.vendor.dashboard

import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier

@Composable
fun VendorUpgradeButton(
    modifier: Modifier = Modifier,
    onUpgrade: () -> Unit
) {
    Button(
        onClick = onUpgrade,
        modifier = modifier
    ) {
        Text("Upgrade to Premium")
    }
}
