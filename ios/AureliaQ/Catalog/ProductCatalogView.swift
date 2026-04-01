import SwiftUI
import StoreKit

struct ProductCatalogView: View {
    @StateObject private var iap = IAPManager.shared
    @State private var message = ""

    private var vendorProducts: [Product] {
        iap.products.filter { $0.id.contains("vendor") }
    }

    private var advertiserProducts: [Product] {
        iap.products.filter { $0.id.contains("ads") }
    }

    var body: some View {
        AQScreen("Product Catalog") {

            if iap.products.isEmpty {
                ProgressView("Loading products…")
                    .task { await iap.loadProducts() }
            } else {
                vendorSection
                advertiserSection
            }

            if !message.isEmpty {
                Text(message)
                    .foregroundColor(.blue)
                    .padding(.top, AQSpacing.md)
            }
        }
    }

    // MARK: - Vendor Section

    private var vendorSection: some View {
        VStack(alignment: .leading, spacing: AQSpacing.md) {
            AQSectionHeader(title: "Vendor Subscriptions")

            ForEach(vendorProducts, id: \.id) { product in
                AQCard {
                    VStack(alignment: .leading, spacing: AQSpacing.sm) {
                        Text(product.displayName)
                            .font(AQTypography.headline)

                        Text(product.description)
                            .font(AQTypography.caption)
                            .foregroundColor(.secondary)

                        HStack {
                            Text(product.displayPrice)
                                .font(AQTypography.headline)
                                .foregroundColor(AQColors.primary)

                            Spacer()

                            AQButton(title: "Purchase") {
                                Task { await purchase(product) }
                            }
                            .frame(width: 120)
                        }
                    }
                }
            }
        }
    }

    // MARK: - Advertiser Section

    private var advertiserSection: some View {
        VStack(alignment: .leading, spacing: AQSpacing.md) {
            AQSectionHeader(title: "Advertiser CPM Packages")

            ForEach(advertiserProducts, id: \.id) { product in
                AQCard {
                    VStack(alignment: .leading, spacing: AQSpacing.sm) {
                        Text(product.displayName)
                            .font(AQTypography.headline)

                        Text(product.description)
                            .font(AQTypography.caption)
                            .foregroundColor(.secondary)

                        HStack {
                            Text(product.displayPrice)
                                .font(AQTypography.headline)
                                .foregroundColor(AQColors.primary)

                            Spacer()

                            AQButton(title: "Buy") {
                                Task { await purchase(product) }
                            }
                            .frame(width: 120)
                        }
                    }
                }
            }
        }
    }

    // MARK: - Purchase Handler

    private func purchase(_ product: Product) async {
        do {
            let transaction = try await iap.purchase(productId: product.id)

            let validated = try await IAPReceiptValidator.validatePurchase(
                userId: "demo-user-123",
                transaction: transaction,
                productId: product.id
            )

            message = validated ? "Purchase successful!" : "Validation failed."

        } catch {
            message = "Error: \(error.localizedDescription)"
        }
    }
}
