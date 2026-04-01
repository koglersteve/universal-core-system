import SwiftUI
import StoreKit

struct IAPDemoView: View {
    @StateObject private var iap = IAPManager.shared
    @State private var message: String = ""
    @State private var isLoading = false

    var body: some View {
        NavigationView {
            VStack {
                if iap.products.isEmpty {
                    ProgressView("Loading products…")
                        .task {
                            await iap.loadProducts()
                        }
                } else {
                    List(iap.products, id: \.id) { product in
                        Button {
                            Task { await purchase(product) }
                        } label: {
                            HStack {
                                VStack(alignment: .leading) {
                                    Text(product.displayName)
                                        .font(.headline)
                                    Text(product.description)
                                        .font(.subheadline)
                                        .foregroundColor(.secondary)
                                }
                                Spacer()
                                Text(product.displayPrice)
                                    .font(.headline)
                            }
                        }
                    }
                }

                if !message.isEmpty {
                    Text(message)
                        .padding()
                        .foregroundColor(.blue)
                }
            }
            .navigationTitle("Aurelia-Q IAP Demo")
        }
    }

    private func purchase(_ product: Product) async {
        isLoading = true
        message = "Purchasing \(product.displayName)…"

        do {
            let transaction = try await iap.purchase(productId: product.id)

            message = "Validating receipt…"

            let success = try await IAPReceiptValidator.validatePurchase(
                userId: "demo-user-123",
                transaction: transaction,
                productId: product.id
            )

            message = success
                ? "Purchase successful and validated!"
                : "Purchase failed validation."

        } catch {
            message = "Error: \(error.localizedDescription)"
        }

        isLoading = false
    }
}
                                                                            