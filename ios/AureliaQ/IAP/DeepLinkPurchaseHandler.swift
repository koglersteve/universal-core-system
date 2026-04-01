import Foundation
import StoreKit
import SwiftUI

/// Handles deep links like:
/// aureliaq://purchase?productId=vendor.premium.monthly
/// aureliaq://purchase?productId=ads.cpm.10000
///
/// This allows external links (web, email, QR codes) to trigger IAP flows.
struct DeepLinkPurchaseHandler {

    static func handle(url: URL, userId: String) async -> DeepLinkPurchaseResult {
        guard url.scheme == "aureliaq",
              url.host == "purchase",
              let components = URLComponents(url: url, resolvingAgainstBaseURL: false),
              let productId = components.queryItems?.first(where: { $0.name == "productId" })?.value
        else {
            return .invalid
        }

        do {
            // Load products if needed
            let iap = IAPManager.shared
            if iap.products.isEmpty {
                try await iap.loadProducts()
            }

            guard let product = iap.products.first(where: { $0.id == productId }) else {
                return .productNotFound(productId)
            }

            // Purchase
            let transaction = try await iap.purchase(productId: product.id)

            // Validate with backend
            let validated = try await IAPReceiptValidator.validatePurchase(
                userId: userId,
                transaction: transaction,
                productId: product.id
            )

            return validated ? .success(product) : .validationFailed(product)

        } catch {
            return .error(error.localizedDescription)
        }
    }
}

enum DeepLinkPurchaseResult {
    case success(Product)
    case validationFailed(Product)
    case productNotFound(String)
    case invalid
    case error(String)
}
