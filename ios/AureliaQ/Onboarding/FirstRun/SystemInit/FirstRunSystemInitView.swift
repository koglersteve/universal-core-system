import SwiftUI

struct FirstRunSystemInitView: View {
    let onComplete: () -> Void

    @State private var currentIndex = 0
    @State private var progress: CGFloat = 0
    @State private var systemReady = false

    private let steps = FirstRunSystemInitStep.allCases

    var body: some View {
        AQScreen("System Initialization") {
            VStack(spacing: AQSpacing.xl) {

                if !systemReady {
                    VStack(spacing: AQSpacing.md) {
                        Text(steps[currentIndex].rawValue)
                            .font(AQTypography.title)
                            .multilineTextAlignment(.center)

                        ProgressView(value: progress)
                            .progressViewStyle(.linear)
                            .tint(AQColors.primary)
                            .padding(.horizontal, AQSpacing.lg)
                    }
                    .transition(.opacity)
                }

                if systemReady {
                    VStack(spacing: AQSpacing.lg) {
                        Image(systemName: "checkmark.seal.fill")
                            .font(.system(size: 72))
                            .foregroundColor(.green)
                            .transition(.scale.combined(with: .opacity))

                        Text("System Ready")
                            .font(AQTypography.title)
                            .multilineTextAlignment(.center)

                        AQButton(title: "Continue") {
                            onComplete()
                        }
                    }
                }

                Spacer()
            }
            .onAppear {
                runInitializationSequence()
            }
        }
    }

    // MARK: - Boot Sequence

    private func runInitializationSequence() {
        let total = Double(steps.count)
        let interval = 0.9

        for i in 0..<steps.count {
            DispatchQueue.main.asyncAfter(deadline: .now() + (Double(i) * interval)) {
                withAnimation(.easeInOut(duration: 0.4)) {
                    currentIndex = i
                    progress = CGFloat(Double(i + 1) / total)
                }

                if i == steps.count - 1 {
                    DispatchQueue.main.asyncAfter(deadline: .now() + 0.8) {
                        withAnimation(.spring(response: 0.6, dampingFraction: 0.7)) {
                            systemReady = true
                        }
                    }
                }
            }
        }
    }
}
