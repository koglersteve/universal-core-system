package com.aureliaq.app.billing.restore

sealed class RestoreResult {
    object Idle : RestoreResult()
    object Restoring : RestoreResult()
    object Success : RestoreResult()
    data class Error(val message: String) : RestoreResult()
}
