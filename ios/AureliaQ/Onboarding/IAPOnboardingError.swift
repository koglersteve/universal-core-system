import SwiftUI

struct IAPOnboardingError: View {
    let message: String
    let onRetry: () -> Void

    var body: some View {
        AQScreen("Error") {
            VStack(spacing: AQSpacing.lg) {
                Text("Something Went Wrong")
                    .font(AQTypography.title)

                Text(message)
                    .font(AQTypography.body)
                    .foregroundColor(.red)
                    .multilineTextAlignment(.center)

                AQButton(title: "Try Again", action: onRetry)
            }
        }
    }
}
