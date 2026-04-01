import SwiftUI

struct FirstRunFounderRitualView: View {
    let onComplete: () -> Void

    @State private var opacity: Double = 0
    @State private var scale: CGFloat = 0.85
    @State private var showSeal = false

    private var ritualData: FounderRitualData {
        FounderRitualData(
            displayName: UserDefaults.standard.string(forKey: "FR_DisplayName") ?? "Founder",
            role: UserDefaults.standard.string(forKey: "FR_Role") ?? "Founder",
            timestamp: Date()
        )
    }

    var body: some View {
        AQScreen("Initialization") {
            VStack(spacing: AQSpacing.xl) {

                VStack(spacing: AQSpacing.md) {
                    Text("Welcome, \(ritualData.displayName)")
                        .font(AQTypography.title)
                        .opacity(opacity)
                        .scaleEffect(scale)

                    Text("Aurelia‑Q recognizes you as the system’s Founder.")
                        .font(AQTypography.body)
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                        .opacity(opacity)
                }

                if showSeal {
                    Image(systemName: "seal.fill")
                        .font(.system(size: 72))
                        .foregroundColor(AQColors.primary)
                        .transition(.scale.combined(with: .opacity))
                        .padding(.top, AQSpacing.lg)
                }

                Spacer()

                AQButton(title: "Continue") {
                    onComplete()
                }
                .padding(.bottom, AQSpacing.xl)
            }
            .onAppear {
                withAnimation(.easeOut(duration: 1.0)) {
                    opacity = 1
                    scale = 1.0
                }

                DispatchQueue.main.asyncAfter(deadline: .now() + 1.2) {
                    withAnimation(.spring(response: 0.6, dampingFraction: 0.7)) {
                        showSeal = true
                    }
                }
            }
        }
    }
}
