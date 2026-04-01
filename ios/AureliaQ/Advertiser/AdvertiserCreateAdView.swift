import SwiftUI

struct AdvertiserCreateAdView: View {
    let userId: String

    @State private var headline = ""
    @State private var body = ""
    @State private var message = ""

    var body: some View {
        Form {
            Section("Headline") {
                TextField("Enter headline", text: $headline)
            }

            Section("Body") {
                TextField("Enter body text", text: $body)
            }

            Button("Create Ad") {
                Task {
                    do {
                        try await AdvertiserAPI.createAd(
                            userId: userId,
                            headline: headline,
                            body: body
                        )
                        message = "Ad created!"
                    } catch {
                        message = "Error: \(error.localizedDescription)"
                    }
                }
            }

            if !message.isEmpty {
                Text(message)
                    .foregroundColor(.blue)
            }
        }
        .navigationTitle("Create Ad")
    }
}
