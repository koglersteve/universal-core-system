import Foundation

struct AdEntitlement: Identifiable, Decodable {
    let id: String
    let impressionsPurchased: Int
    let impressionsUsed: Int
    let impressionsRemaining: Int
    let status: String
}

struct AdCreative: Identifiable, Decodable {
    let id: String
    let headline: String
    let body: String?
    let imageUrl: String?
    let active: Bool
}

struct AdAnalytics: Decodable {
    let impressions: Int
    let clicks: Int
    let conversions: Int
}
