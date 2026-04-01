import SwiftUI

struct AdvertiserConsoleView: View {
    @State private var entitlements: [AdEntitlement] = []
    @State private var ads: [AdCreative] = []
    @State private var message = ""
    @State private var loading = true

    let userId = "demo-advertiser-123"

    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 24) {

                    entitlementSection
                    adsSection

                    NavigationLink("Buy More Impressions") {
                        AdvertiserUpgradeView(userId: userId)
                    }
                    .buttonStyle(.borderedProminent)

                    NavigationLink("Create New Ad") {
                        AdvertiserCreateAdView(userId: userId)
                    }

                    if !message.isEmpty {
                        Text(message)
                            .foregroundColor(.blue)
                    }
                }
                .padding()
            }
            .navigationTitle("Advertiser Console")
            .task { await loadData() }
            .refreshable { await loadData() }
        }
    }

    private func loadData() async {
        loading = true
        do {
            entitlements = try await AdvertiserAPI.fetchEntitlements(userId: userId)
            ads = try await AdvertiserAPI.fetchAds(userId: userId)
            message = "Updated"
        } catch {
            message = "Error: \(error.localizedDescription)"
        }
        loading = false
    }

    @ViewBuilder
    private var entitlementSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Ad Entitlements")
                .font(.headline)

            ForEach(entitlements) { ent in
                VStack(alignment: .leading) {
                    Text("Purchased: \(ent.impressionsPurchased)")
                    Text("Used: \(ent.impressionsUsed)")
                    Text("Remaining: \(ent.impressionsRemaining)")
                    Text("Status: \(ent.status.capitalized)")
                        .foregroundColor(ent.status == "active" ? .green : .red)
                }
                .padding()
                .frame(maxWidth: .infinity)
                .background(.thinMaterial)
                .cornerRadius(12)
            }
        }
    }

    @ViewBuilder
    private var adsSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Your Ads")
                .font(.headline)

            ForEach(ads) { ad in
                VStack(alignment: .leading, spacing: 6) {
                    Text(ad.headline)
                        .font(.headline)

                    if let body = ad.body {
                        Text(body)
                            .font(.caption)
                            .foregroundColor(.secondary)
                    }

                    HStack {
                        Text("Active: \(ad.active ? "Yes" : "No")")
                            .foregroundColor(ad.active ? .green : .red)

                        Spacer()

                        Button(ad.active ? "Pause" : "Resume") {
                            Task {
                                try? await AdvertiserAPI.toggleAd(adId: ad.id)
                                await loadData()
                            }
                        }
                        .buttonStyle(.bordered)
                    }
                }
                .padding()
                .background(.thinMaterial)
                .cornerRadius(12)
            }
        }
    }
}
