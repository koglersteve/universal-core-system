import SwiftUI
import StoreKit

struct IAPOnboardingProductSelect: View {
    @StateObject private var iap = IAPManager.shared
    let onSelect: (Product) -> Void

    var body: some View {
        AQScreen("Choose a Plan") {

            if iap.products.isEmpty {
                ProgressView("Loading products…")
                    .task { await iap.loadProducts() }
            } else {
                AQListContainer {
                    ForEach(iap.products, id: \.id) { product in
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

                                    AQButton(title: "Select") {
                                        onSelect(product)
                                    }
                                    .frame(width: 120)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
