import Foundation

struct FounderVendorSubscription: Identifiable, Decodable {
    let id: String
    let userId: String
    let tier: String
    let status: String
    let vendorListingActive: Bool
    let expiresAt: Date?
}

struct FounderAdEntitlement: Identifiable, Decodable {
    let id: String
    let advertiserUserId: String
    let impressionsPurchased: Int
    let impressionsUsed: Int
    let impressionsRemaining: Int
    let status: String
}

struct FounderAd: Identifiable, Decodable {
    let id: String
    let advertiserUserId: String
    let headline: String?
    let active: Bool
}
