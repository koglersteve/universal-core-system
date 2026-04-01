import SwiftUI

struct VendorConsoleView: View {
    @State private var subscription: VendorSubscription?
    @State private var analytics: VendorAnalytics?
    @State private var message = ""
    @State private var loading = true

    let userId = "demo-vendor-123"

    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 24) {

                    if let sub = subscription {
                        subscriptionCard(sub)
                    }

                    if let stats = analytics {
                        analyticsCard(stats)
                    }

                    NavigationLink("Upgrade Subscription") {
                        VendorUpgradeView(userId: userId)
                    }
                    .buttonStyle(.borderedProminent)
                    .padding(.top, 12)

                    if !message.isEmpty {
                        Text(message)
                            .foregroundColor(.blue)
                    }
                }
                .padding()
            }
            .navigationTitle("Vendor Console")
            .task { await loadData() }
            .refreshable { await loadData() }
        }
    }

    private func loadData() async {
        loading = true
        do {
            subscription = try await VendorAPI.fetchSubscription(userId: userId)
            analytics = try await VendorAPI.fetchAnalytics(userId: userId)
            message = "Updated"
        } catch {
            message = "Error: \(error.localizedDescription)"
        }
        loading = false
    }

    @ViewBuilder
    private func subscriptionCard(_ sub: VendorSubscription) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Subscription")
                .font(.headline)

            Text("Tier: \(sub.tier.capitalized)")
            Text("Status: \(sub.status.capitalized)")
                .foregroundColor(sub.status == "active" ? .green : .red)

            if let expires = sub.expiresAt {
                Text("Renews: \(expires.formatted(date: .abbreviated, time: .omitted))")
            }

            Text("Auto‑Renew: \(sub.autoRenew ? "On" : "Off")")
        }
        .padding()
        .frame(maxWidth: .infinity)
        .background(.thinMaterial)
        .cornerRadius(12)
    }

    @ViewBuilder
    private func analyticsCard(_ stats: VendorAnalytics) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Analytics")
                .font(.headline)

            HStack {
                stat("Impressions", stats.impressions)
                stat("Clicks", stats.clicks)
                stat("Views", stats.views)
            }
        }
        .padding()
        .frame(maxWidth: .infinity)
        .background(.thinMaterial)
        .cornerRadius(12)
    }

    private func stat(_ label: String, _ value: Int) -> some View {
        VStack {
            Text("\(value)")
                .font(.title2)
                .bold()
            Text(label)
                .font(.caption)
        }
        .frame(maxWidth: .infinity)
    }
}
