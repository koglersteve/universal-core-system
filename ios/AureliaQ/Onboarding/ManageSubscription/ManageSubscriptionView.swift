import SwiftUI
import StoreKit

struct ManageSubscriptionView: View {
    let userId: String

    @State private var subscription: ManageSubscriptionModel?
    @State private var loading = true
    @State private var message = ""
    @State private var autoRenew = true

    var body: some View {
        AQScreen("Manage Subscription") {

            if loading {
                ProgressView("Loading…")
            } else if let sub = subscription {
                subscriptionCard(sub)
                renewalCard(sub)
                actionsSection(sub)
            }

            if !message.isEmpty {
                Text(message)
                    .foregroundColor(.blue)
                    .padding(.top, AQSpacing.md)
            }
        }
        .task { await loadData() }
        .refreshable { await loadData() }
    }

    // MARK: - Load Data

    private func loadData() async {
        loading = true
        do {
            subscription = try await ManageSubscriptionAPI.fetchSubscription(userId: userId)
            autoRenew = subscription?.autoRenew ?? true
        } catch {
            message = "Error: \(error.localizedDescription)"
        }
        loading = false
    }

    // MARK: - UI Sections

    @ViewBuilder
    private func subscriptionCard(_ sub: ManageSubscriptionModel) -> some View {
        AQCard {
            VStack(alignment: .leading, spacing: AQSpacing.sm) {
                Text("Current Plan")
                    .font(AQTypography.headline)

                Text(sub.tier)
                    .font(AQTypography.title)
                    .foregroundColor(AQColors.primary)

                Text("Status: \(sub.status.capitalized)")
                    .font(AQTypography.caption)
                    .foregroundColor(sub.status == "active" ? .green : .red)
            }
        }
    }

    @ViewBuilder
    private func renewalCard(_ sub: ManageSubscriptionModel) -> some View {
        AQCard {
            VStack(alignment: .leading, spacing: AQSpacing.md) {
                Text("Billing & Renewal")
                    .font(AQTypography.headline)

                if let renew = sub.renewalDate {
                    Text("Renews on: \(renew.formatted(date: .abbreviated, time: .omitted))")
                        .font(AQTypography.body)
                }

                Toggle("Auto‑Renew", isOn: $autoRenew)
                    .onChange(of: autoRenew) { newValue in
                        Task { await updateAutoRenew(newValue) }
                    }
            }
        }
    }

    @ViewBuilder
    private func actionsSection(_ sub: ManageSubscriptionModel) -> some View {
        VStack(spacing: AQSpacing.lg) {

            // Upgrade / Downgrade
            NavigationLink("Upgrade / Downgrade Plan") {
                IAPOnboardingProductSelect { product in
                    // Push into purchase flow
                }
            }
            .buttonStyle(.borderedProminent)

            // Billing History
            NavigationLink("View Billing History") {
                ReceiptHistoryView()
            }

            // Cancel Subscription (App Store)
            Button {
                openAppStoreSubscriptions()
            } label: {
                Text("Cancel Subscription (App Store)")
                    .foregroundColor(.red)
            }

            // Support
            Button {
                openSupport()
            } label: {
                Text("Contact Support")
                    .foregroundColor(AQColors.primary)
            }
        }
        .padding(.top, AQSpacing.lg)
    }

    // MARK: - Actions

    private func updateAutoRenew(_ value: Bool) async {
        do {
            try await ManageSubscriptionAPI.updateAutoRenew(userId: userId, enabled: value)
            message = "Auto‑renew updated."
        } catch {
            message = "Error: \(error.localizedDescription)"
        }
    }

    private func openAppStoreSubscriptions() {
        guard let url = URL(string: "https://apps.apple.com/account/subscriptions") else { return }
        UIApplication.shared.open(url)
    }

    private func openSupport() {
        guard let url = URL(string: "mailto:support@aureliaq.com") else { return }
        UIApplication.shared.open(url)
    }
}
