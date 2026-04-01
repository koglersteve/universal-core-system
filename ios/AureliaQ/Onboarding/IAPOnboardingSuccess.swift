import SwiftUI

struct IAPOnboardingSuccess: View {
    let onDone: () -> Void

    var body: some View {
        AQScreen("Success") {
            VStack(spacing: AQSpacing.lg) {
                Text("You're All Set!")
                    .font(AQTypography.title)

                Text("Your purchase was successful and your account is now upgraded.")
                    .font(AQTypography.body)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)

                AQButton(title: "Continue", action: onDone)
            }
        }
    }
}
