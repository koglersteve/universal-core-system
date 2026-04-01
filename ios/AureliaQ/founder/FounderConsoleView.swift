import SwiftUI

struct FounderConsoleView: View {
    @State private var vendorSubs: [FounderVendorSubscription] = []
    @State private var adEntitlements: [FounderAdEntitlement] = []
    @State private var ads: [FounderAd] = []
    @State private var message: String = ""

    var body: some View {
        NavigationView {
            List {
                Section("Vendor Subscriptions") {
                    ForEach(vendorSubs) { sub in
                        HStack {
                            VStack(alignment: .leading) {
                                Text("User: \(sub.userId)")
                                Text("Tier: \(sub.tier) • Status: \(sub.status)")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                            }
                            Spacer()
                            Menu {
                                Button("Activate") {
                                    Task { await action("/api/founder/vendors/\(sub.id)/activate") }
                                }
                                Button("Expire", role: .destructive) {
                                    Task { await action("/api/founder/vendors/\(sub.id)/expire") }
                                }
                            } label: {
                                Image(systemName: "ellipsis.circle")
                            }
                        }
                    }
                }

                Section("Ad Entitlements") {
                    ForEach(adEntitlements) { ent in
                        HStack {
                            VStack(alignment: .leading) {
                                Text("Advertiser: \(ent.advertiserUserId)")
                                Text("Used \(ent.impressionsUsed)/\(ent.impressionsPurchased)")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                            }
                            Spacer()
                            Menu {
                                Button("Reset Impressions") {
                                    Task { await action("/api/founder/ads/entitlements/\(ent.id)/reset") }
                                }
                                Button("Activate") {
                                    Task { await action("/api/founder/ads/entitlements/\(ent.id)/activate") }
                                }
                                Button("Expire", role: .destructive) {
                                    Task { await action("/api/founder/ads/entitlements/\(ent.id)/expire") }
                                }
                            } label: {
                                Image(systemName: "ellipsis.circle")
                            }
                        }
                    }
                }

                Section("Ads") {
                    ForEach(ads) { ad in
                        VStack(alignment: .leading) {
                            Text(ad.headline ?? "(no headline)")
                            Text("Advertiser: \(ad.advertiserUserId) • Active: \(ad.active ? "Yes" : "No")")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }
                    }
                }

                if !message.isEmpty {
                    Section {
                        Text(message)
                            .foregroundColor(.blue)
                    }
                }
            }
            .navigationTitle("Founder Console")
            .task {
                await loadData()
            }
            .refreshable {
                await loadData()
            }
        }
    }

    private func loadData() async {
        do {
            vendorSubs = try await FounderAPI.fetch("/api/founder/vendors")
            adEntitlements = try await FounderAPI.fetch("/api/founder/ads/entitlements")
            ads = try await FounderAPI.fetch("/api/founder/ads")
            message = "Data refreshed"
        } catch {
            message = "Error loading: \(error.localizedDescription)"
        }
    }

    private func action(_ path: String) async {
        do {
            try await FounderAPI.post(path)
            await loadData()
            message = "Action succeeded"
        } catch {
            message = "Action failed: \(error.localizedDescription)"
        }
    }
}
