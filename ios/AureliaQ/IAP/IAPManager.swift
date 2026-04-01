import Foundation
import StoreKit

@MainActor
final class IAPManager: ObservableObject {

    static let shared = IAPManager()

    @Published var products: [Product] = []

    private init() {}

    func loadProducts() async {
        do {
            products = try await Product.products(for: IAPProducts.all)
        } catch {
            print("Failed to load products: \(error)")
        }
    }

    func product(for id: String) -> Product? {
        products.first(where: { $0.id == id })
    }

    func purchase(productId: String) async throws -> Transaction {
        guard let product = product(for: productId) ??
                (try? await Product.products(for: [productId]).first) else {
            throw NSError(domain: "iap", code: 0, userInfo: [NSLocalizedDescriptionKey: "Product not found"])
        }

        let result = try await product.purchase()

        switch result {
        case .success(let verification):
            let transaction = try verification.payloadValue
            await transaction.finish()
            return transaction
        case .userCancelled:
            throw NSError(domain: "iap", code: 1, userInfo: [NSLocalizedDescriptionKey: "User cancelled"])
        default:
            throw NSError(domain: "iap", code: 2, userInfo: [NSLocalizedDescriptionKey: "Purchase failed"])
        }
    }
}
