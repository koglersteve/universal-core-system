import SwiftUI

enum FirstRunStep {
    case welcome
    case features
    case account
    case permissions
    case ritual
    case systemInit
    case iap
    case done
}

struct FirstRunFlow: View {
    @State private var step: FirstRunStep = .welcome
    let userId: String

    var body: some View {
        switch step {

        case .welcome:
            FirstRunWelcomeView {
                step = .features
            }

        case .features:
            FirstRunFeaturesView(
                onContinue: { step = .account },
                onSkip: {
                    FirstRunManager.complete()
                    step = .done
                }
            )

        case .account:
            FirstRunAccountSetupView(
                onContinue: { model in
                    FirstRunUserStore.save(model)
                    step = .permissions
                },
                onSkip: { step = .permissions }
            )

        case .permissions:
            FirstRunPermissionsView(
                onContinue: { step = .ritual },
                onSkip: { step = .ritual }
            )

        case .ritual:
            FirstRunFounderRitualView {
                step = .systemInit
            }

        case .systemInit:
            FirstRunSystemInitView {
                step = .iap
            }

        case .iap:
            IAPOnboardingFlow(userId: userId)
                .onDisappear {
                    FirstRunManager.complete()
                    step = .done
                }

        case .done:
            FounderConsoleView()
        }
    }
}

