import Foundation

struct VendorSubscription: Identifiable, Decodable {
    let id: String
    let tier: String
    let status: String
    let expiresAt: Date?
    let autoRenew: Bool
}

struct VendorAnalytics: Decodable {
    let impressions: Int
    let clicks: Int
    let views: Int
}
