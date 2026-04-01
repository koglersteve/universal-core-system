import Foundation
import StoreKit

struct IAPReceiptValidator {

    static func validatePurchase(
        userId: String,
        transaction: Transaction,
        productId: String
    ) async throws -> Bool {

        guard let jws = transaction.jwsRepresentation else {
            throw NSError(domain: "iap", code: 3, userInfo: [NSLocalizedDescriptionKey: "Missing JWS"])
        }

        let body: [String: Any] = [
            "userId": userId,
            "platform": "apple",
            "receipt": jws,
            "productId": productId
        ]

        let response = try await APIClient.post(path: "/api/subscriptions/vendors/purchase", jsonBody: body)
        return (response["ok"] as? Bool) == true
    }
}
