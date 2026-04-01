import Foundation

struct ReceiptRecord: Identifiable, Decodable {
    let id: String
    let productId: String
    let productName: String
    let platform: String
    let amount: Double
    let currency: String
    let transactionId: String
    let purchasedAt: Date
    let status: String
}
