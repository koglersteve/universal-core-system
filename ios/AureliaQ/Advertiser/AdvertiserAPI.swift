import Foundation

struct AdvertiserAPI {
    static let baseURL = URL(string: "https://your-backend.com")!

    static func fetchEntitlements(userId: String) async throws -> [AdEntitlement] {
        let url = baseURL.appendingPathComponent("/api/ads/entitlements/\(userId)")
        let (data, response) = try await URLSession.shared.data(from: url)

        guard let http = response as? HTTPURLResponse,
              (200..<300).contains(http.statusCode) else {
            throw NSError(domain: "ads", code: 0)
        }

        return try JSONDecoder().decode([AdEntitlement].self, from: data)
    }

    static func fetchAds(userId: String) async throws -> [AdCreative] {
        let url = baseURL.appendingPathComponent("/api/ads/user/\(userId)")
        let (data, response) = try await URLSession.shared.data(from: url)

        guard let http = response as? HTTPURLResponse,
              (200..<300).contains(http.statusCode) else {
            throw NSError(domain: "ads", code: 1)
        }

        return try JSONDecoder().decode([AdCreative].self, from: data)
    }

    static func fetchAnalytics(adId: String) async throws -> AdAnalytics {
        let url = baseURL.appendingPathComponent("/api/ads/\(adId)/analytics")
        let (data, response) = try await URLSession.shared.data(from: url)

        guard let http = response as? HTTPURLResponse,
              (200..<300).contains(http.statusCode) else {
            throw NSError(domain: "ads", code: 2)
        }

        return try JSONDecoder().decode(AdAnalytics.self, from: data)
    }

    static func toggleAd(adId: String) async throws {
        var request = URLRequest(url: baseURL.appendingPathComponent("/api/ads/\(adId)/toggle"))
        request.httpMethod = "POST"
        let (_, response) = try await URLSession.shared.data(for: request)

        guard let http = response as? HTTPURLResponse,
              (200..<300).contains(http.statusCode) else {
            throw NSError(domain: "ads", code: 3)
        }
    }

    static func createAd(userId: String, headline: String, body: String?) async throws {
        var request = URLRequest(url: baseURL.appendingPathComponent("/api/ads/create"))
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")

        let json: [String: Any] = [
            "userId": userId,
            "headline": headline,
            "body": body ?? ""
        ]

        request.httpBody = try JSONSerialization.data(withJSONObject: json)

        let (_, response) = try await URLSession.shared.data(for: request)

        guard let http = response as? HTTPURLResponse,
              (200..<300).contains(http.statusCode) else {
            throw NSError(domain: "ads", code: 4)
        }
    }
}
