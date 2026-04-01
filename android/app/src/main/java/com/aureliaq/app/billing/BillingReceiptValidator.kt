package com.aureliaq.app.billing

import android.util.Log
import com.android.billingclient.api.Purchase
import okhttp3.*
import org.json.JSONObject
import java.io.IOException

object BillingReceiptValidator {

    private val client = OkHttpClient()

    fun validate(purchase: Purchase) {
        val json = JSONObject().apply {
            put("productId", purchase.products.first())
            put("purchaseToken", purchase.purchaseToken)
            put("orderId", purchase.orderId)
        }

        val body = RequestBody.create(
            MediaType.parse("application/json"),
            json.toString()
        )

        val request = Request.Builder()
            .url("https://your-backend.com/api/validate/android")
            .post(body)
            .build()

        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                Log.e("BillingReceiptValidator", "Validation failed: ${e.message}")
            }

            override fun onResponse(call: Call, response: Response) {
                Log.d("BillingReceiptValidator", "Validation success: ${response.code()}")
            }
        })
    }
}
