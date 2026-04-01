import SwiftUI

struct ReceiptRow: View {
    let receipt: ReceiptRecord

    var body: some View {
        AQCard {
            VStack(alignment: .leading, spacing: AQSpacing.sm) {

                Text(receipt.productName)
                    .font(AQTypography.headline)

                HStack {
                    Text(receipt.platform.uppercased())
                        .font(AQTypography.caption)
                        .foregroundColor(.secondary)

                    Spacer()

                    Text("\(receipt.currency) \(String(format: "%.2f", receipt.amount))")
                        .font(AQTypography.headline)
                        .foregroundColor(AQColors.primary)
                }

                Text("Purchased: \(receipt.purchasedAt.formatted(date: .abbreviated, time: .shortened))")
                    .font(AQTypography.caption)
                    .foregroundColor(.secondary)

                Text("Transaction ID: \(receipt.transactionId)")
                    .font(AQTypography.caption)
                    .foregroundColor(.secondary)

                Text("Status: \(receipt.status.capitalized)")
                    .font(AQTypography.caption)
                    .foregroundColor(receipt.status == "completed" ? .green : .red)
            }
        }
    }
}
