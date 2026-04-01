import Foundation

struct ManageSubscriptionModel: Decodable {
    let tier: String
    let status: String
    let autoRenew: Bool
    let renewalDate: Date?
}
