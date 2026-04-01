import Foundation
import StoreKit

struct IAPRestoreService {

    static func restorePurchases(userId: String) async throws -> Int {
        var restoredCount = 0

        for await result in Transaction.currentEntitlements {
            guard case .verified(let transaction) = result else { continue }

            let validated = try await IAPReceiptValidator.validatePurchase(
                userId: userId,
                transaction: transaction,
                productId: transaction.productID
            )

            if validated {
                restoredCount += 1
            }
        }

        return restoredCount
    }
}
