import SwiftUI
import StoreKit

struct VendorUpgradeView: View {
    let userId: String
    @StateObject private var iap = IAPManager.shared
    @State private var message = ""

    var body: some View {
        List {
            Section("Upgrade Options") {
                ForEach(iap.products.filter { $0.id.contains("vendor") }, id: \.id) { product in
                    Button {
                        Task { await upgrade(product) }
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
        .navigationTitle("Upgrade")
        .task { await iap.loadProducts() }
    }

    private func upgrade(_ product: Product) async {
        do {
            let transaction = try await iap.purchase(productId: product.id)

            let validated = try await IAPReceiptValidator.validatePurchase(
                userId: userId,
                transaction: transaction,
                productId: product.id
            )

            if validated {
                message = "Upgrade successful!"
            } else {
                message = "Validation failed."
            }

        } catch {
            message = "Error: \(error.localizedDescription)"
        }
    }
}
