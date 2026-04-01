import SwiftUI

struct FirstRunWelcomeView: View {
    let onContinue: () -> Void

    var body: some View {
        AQScreen("Welcome to Aurelia‑Q") {
            VStack(spacing: AQSpacing.lg) {

                Text("Your Intelligent Operating System")
                    .font(AQTypography.title)
                    .multilineTextAlignment(.center)

                Text("Let’s walk you through the core features and get your account set up.")
                    .font(AQTypography.body)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)

                AQButton(title: "Continue", action: onContinue)
            }
        }
    }
}
