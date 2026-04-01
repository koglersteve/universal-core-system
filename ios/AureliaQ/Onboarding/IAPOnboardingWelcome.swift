import SwiftUI

struct IAPOnboardingWelcome: View {
    let onContinue: () -> Void

    var body: some View {
        AQScreen("Welcome") {
            VStack(spacing: AQSpacing.lg) {
                Text("Unlock Premium Features")
                    .font(AQTypography.title)
                    .multilineTextAlignment(.center)

                Text("Choose a subscription or package to get started. You can upgrade anytime.")
                    .font(AQTypography.body)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)

                AQButton(title: "Continue", action: onContinue)
            }
        }
    }
}
