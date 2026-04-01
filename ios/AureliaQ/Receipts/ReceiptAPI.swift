import Foundation

struct ReceiptAPI {
    static let baseURL = URL(string: "https://your-backend.com")!

    static func fetchReceipts(userId: String) async throws -> [ReceiptRecord] {
        let url = baseURL.appendingPathComponent("/api/subscriptions/\(userId)/receipts")
        let (data, response) = try await URLSession.shared.data(from: url)

        guard let http = response as? HTTPURLResponse,
              (200..<300).contains(http.statusCode) else {
            throw NSError(domain: "receipts", code: 0)
        }

        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .iso8601
        return try decoder.decode([ReceiptRecord].self, from: data)
    }
}
