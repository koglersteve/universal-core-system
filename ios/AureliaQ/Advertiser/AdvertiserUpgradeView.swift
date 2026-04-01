import SwiftUI
import StoreKit

struct AdvertiserUpgradeView: View {
    let userId: String
    @StateObject private var iap = IAPManager.shared
    @State private var message = ""

    var body: some View {
        List {
            Section("CPM Packages") {
                ForEach(iap.products.filter { $0.id.contains("ads") }, id: \.id) { product in
                    Button {
                        Task { await purchase(product) }
                    } label: {
                        HStack {
                            VStack(alignment: .leading) {
                                Text(product.displayName)
                                Text(product.description)
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                            }
                            Spacer()
                            Text(product.displayPrice)
                        }
                    }
                }
            }

            if !message.isEmpty {
                Text(message)
                    .foregroundColor(.blue)
            }
        }
        .navigationTitle("Buy Impressions")
        .task { await iap.loadProducts() }
    }

    private func purchase(_ product: Product) async {
        do {
            let transaction = try await iap.purchase(productId: product.id)

            let validated = try await IAPReceiptValidator.validatePurchase(
                userId: userId,
                transaction: transaction,
                productId: product.id
            )

            message = validated ? "Purchase successful!" : "Validation failed."

        } catch {
            message = "Error: \(error.localizedDescription)"
        }
    }
}
