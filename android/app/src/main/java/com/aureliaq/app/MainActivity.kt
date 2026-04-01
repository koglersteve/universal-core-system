package com.aureliaq.app

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.activity.ComponentActivity
import com.aureliaq.app.billing.DeepLinkPurchaseHandler
import com.aureliaq.app.billing.BillingResultModel

class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        handleDeepLink(intent)
    }

    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        handleDeepLink(intent)
    }

    private fun handleDeepLink(intent: Intent?) {
        val data: Uri? = intent?.data ?: return

        // Example deep link:
        // aureliaq://purchase?productId=vendor.premium.monthly

        if (data.host == "purchase") {
            DeepLinkPurchaseHandler.handle(
                activity = this,
                uri = data
            ) { result ->
                when (result) {

                    is BillingResultModel.Launched -> {
                        // Optional: show toast or UI banner
                        println("Purchase launched for: ${result.productId}")
                    }

                    is BillingResultModel.ProductNotFound -> {
                        println("Product not found: ${result.id}")
                    }

                    BillingResultModel.Invalid -> {
                        println("Invalid deep link")
                    }
                }
            }
        }
    }
}
