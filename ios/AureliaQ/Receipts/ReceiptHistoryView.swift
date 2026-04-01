import SwiftUI

struct ReceiptHistoryView: View {
    @State private var receipts: [ReceiptRecord] = []
    @State private var message = ""
    @State private var loading = true

    let userId = "demo-user-123"

    var body: some View {
        AQScreen("Purchase History") {

            if loading {
                ProgressView("Loading receipts…")
            } else if receipts.isEmpty {
                Text("No purchases found.")
                    .font(AQTypography.body)
                    .foregroundColor(.secondary)
                    .padding(.top, AQSpacing.lg)
            } else {
                AQListContainer {
                    ForEach(receipts) { receipt in
                        ReceiptRow(receipt: receipt)
                    }
                }
            }

            if !message.isEmpty {
                Text(message)
                    .foregroundColor(.blue)
            }
        }
        .task { await loadData() }
        .refreshable { await loadData() }
    }

    private func loadData() async {
        loading = true
        do {
            receipts = try await ReceiptAPI.fetchReceipts(userId: userId)
            message = "Updated"
        } catch {
            message = "Error: \(error.localizedDescription)"
        }
        loading = false
    }
}
