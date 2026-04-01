import Foundation

struct ManageSubscriptionAPI {
    static let baseURL = URL(string: "https://your-backend.com")!

    static func fetchSubscription(userId: String) async throws -> ManageSubscriptionModel {
        let url = baseURL.appendingPathComponent("/api/subscriptions/\(userId)/current")
        let (data, response) = try await URLSession.shared.data(from: url)

        guard let http = response as? HTTPURLResponse,
              (200..<300).contains(http.statusCode) else {
            throw NSError(domain: "subscription", code: 0)
        }

        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .iso8601
        return try decoder.decode(ManageSubscriptionModel.self, from: data)
    }

    static func updateAutoRenew(userId: String, enabled: Bool) async throws {
        var request = URLRequest(url: baseURL.appendingPathComponent("/api/subscriptions/\(userId)/auto-renew"))
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")

        let body = ["enabled": enabled]
        request.httpBody = try JSONSerialization.data(withJSONObject: body)

        let (_, response) = try await URLSession.shared.data(for: request)

        guard let http = response as? HTTPURLResponse,
              (200..<300).contains(http.statusCode) else {
            throw NSError(domain: "subscription", code: 1)
        }
    }
}
