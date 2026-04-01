import SwiftUI

@main
struct AureliaQApp: App {
    @State private var deepLinkMessage: String = ""
    @State private var showBanner: Bool = false

    var body: some Scene {
        WindowGroup {
            ZStack {

                // MARK: - First Run Logic
                if FirstRunManager.isFirstRun {
                    FirstRunFlow(userId: "demo-user-123")
                } else {
                    FounderConsoleView()
                }

                // MARK: - Global Banner
                if showBanner {
                    VStack {
                        Text(deepLinkMessage)
                            .font(.headline)
                            .foregroundColor(.white)
                            .padding()
                            .frame(maxWidth: .infinity)
                            .background(Color.blue.opacity(0.85))
                            .cornerRadius(12)
                            .padding()
                        Spacer()
                    }
                    .transition(.move(edge: .top).combined(with: .opacity))
                    .animation(.easeInOut, value: showBanner)
                }
            }
            .onOpenURL { url in
                Task {
                    await handleDeepLink(url)
                }
            }
        }
    }

    // MARK: - Deep Link Handler

    private func handleDeepLink(_ url: URL) async {
        let result = await DeepLinkPurchaseHandler.handle(url: url, userId: "demo-user-123")

        switch result {
        case .success(let product):
            deepLinkMessage = "Purchase successful: \(product.displayName)"
        case .validationFailed(let product):
            deepLinkMessage = "Validation failed for: \(product.displayName)"
        case .productNotFound(let id):
            deepLinkMessage = "Product not found: \(id)"
        case .invalid:
            deepLinkMessage = "Invalid purchase link."
        case .error(let msg):
            deepLinkMessage = "Error: \(msg)"
        }

        showBanner = true

        // Auto-hide banner after 4 seconds
        DispatchQueue.main.asyncAfter(deadline: .now() + 4) {
            withAnimation {
                showBanner = false
            }
        }
    }
}
