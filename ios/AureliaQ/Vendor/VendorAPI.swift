import Foundation

struct VendorAPI {
    static let baseURL = URL(string: "https://your-backend.com")!

    static func fetchSubscription(userId: String) async throws -> VendorSubscription {
        let url = baseURL.appendingPathComponent("/api/vendors/\(userId)/subscription")
        let (data, response) = try await URLSession.shared.data(from: url)

        guard let http = response as? HTTPURLResponse,
              (200..<300).contains(http.statusCode) else {
            throw NSError(domain: "vendor", code: 0)
        }

        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .iso8601
        return try decoder.decode(VendorSubscription.self, from: data)
    }

    static func fetchAnalytics(userId: String) async throws -> VendorAnalytics {
        let url = baseURL.appendingPathComponent("/api/vendors/\(userId)/analytics")
        let (data, response) = try await URLSession.shared.data(from: url)

        guard let http = response as? HTTPURLResponse,
              (200..<300).contains(http.statusCode) else {
            throw NSError(domain: "vendor", code: 1)
        }

        return try JSONDecoder().decode(VendorAnalytics.self, from: data)
    }

    static func upgradeTier(userId: String, productId: String) async throws {
        var request = URLRequest(url: baseURL.appendingPathComponent("/api/vendors/\(userId)/upgrade"))
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")

        let body = ["productId": productId]
        request.httpBody = try JSONSerialization.data(withJSONObject: body)

        let (_, response) = try await URLSession.shared.data(for: request)

        guard let http = response as? HTTPURLResponse,
              (200..<300).contains(http.statusCode) else {
            throw NSError(domain: "vendor", code: 2)
        }
    }
}
