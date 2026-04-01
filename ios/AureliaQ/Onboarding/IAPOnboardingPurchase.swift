import SwiftUI
import StoreKit

struct IAPOnboardingPurchase: View {
    let userId: String
    let product: Product
    let onSuccess: () -> Void
    let onError: (String) -> Void

    @State private var message = ""

    var body: some View {
        AQScreen("Confirm Purchase") {
            AQCard {
                VStack(alignment: .leading, spacing: AQSpacing.md) {
                    Text(product.displayName)
                        .font(AQTypography.headline)

                    Text(product.description)
                        .font(AQTypography.caption)
                        .foregroundColor(.secondary)

                    Text("Price: \(product.displayPrice)")
                        .font(AQTypography.headline)
                        .foregroundColor(AQColors.primary)
                }
            }

            AQButton(title: "Purchase") {
                Task { await purchase() }
            }

            if !message.isEmpty {
                Text(message)
                    .foregroundColor(.blue)
            }
        }
    }

    private func purchase() async {
        do {
            let transaction = try await IAPManager.shared.purchase(productId: product.id)

            let validated = try await IAPReceiptValidator.validatePurchase(
                userId: userId,
                transaction: transaction,
                productId: product.id
            )

            if validated {
                onSuccess()
            } else {
                onError("Receipt validation failed.")
            }

        } catch {
            onError(error.localizedDescription)
        }
    }
}
