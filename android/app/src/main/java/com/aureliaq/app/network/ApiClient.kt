package com.aureliaq.app.network

import okhttp3.*
import org.json.JSONObject

object ApiClient {

    private val client = OkHttpClient()
    private const val BASE_URL = "https://your-backend.com"

    fun post(path: String, body: Map<String, Any>): JSONObject? {
        val json = JSONObject(body)
        val requestBody = RequestBody.create(
            MediaType.parse("application/json"),
            json.toString()
        )

        val request = Request.Builder()
            .url(BASE_URL + path)
            .post(requestBody)
            .build()

        client.newCall(request).execute().use { response ->
            val responseBody = response.body()?.string() ?: return null
            return JSONObject(responseBody)
        }
    }
}
