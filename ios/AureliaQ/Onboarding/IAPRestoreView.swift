import SwiftUI

struct IAPRestoreView: View {
    let userId: String

    @State private var message = ""
    @State private var restored = 0
    @State private var loading = false

    var body: some View {
        AQScreen("Restore Purchases") {

            Text("If you’ve switched devices or reinstalled the app, you can restore your purchases here.")
                .font(AQTypography.body)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
                .padding(.bottom, AQSpacing.lg)

            AQButton(title: loading ? "Restoring…" : "Restore Purchases") {
                Task { await restore() }
            }
            .disabled(loading)

            if restored > 0 {
                Text("Restored \(restored) purchase\(restored == 1 ? "" : "s").")
                    .foregroundColor(.green)
                    .padding(.top, AQSpacing.md)
            }

            if !message.isEmpty {
                Text(message)
                    .foregroundColor(.blue)
                    .padding(.top, AQSpacing.md)
            }
        }
    }

    private func restore() async {
        loading = true
        message = ""

        do {
            let count = try await IAPRestoreService.restorePurchases(userId: userId)
            restored = count

            message = count > 0
                ? "Your purchases have been restored."
                : "No purchases found to restore."

        } catch {
            message = "Error: \(error.localizedDescription)"
        }

        loading = false
    }
}
