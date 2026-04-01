import SwiftUI

enum IAPOnboardingStep {
    case welcome
    case productSelect
    case purchase(Product)
    case success
    case error(String)
}

struct IAPOnboardingFlow: View {
    @State private var step: IAPOnboardingStep = .welcome
    @StateObject private var iap = IAPManager.shared

    let userId: String

    var body: some View {
        switch step {
        case .welcome:
            IAPOnboardingWelcome {
                step = .productSelect
            }

        case .productSelect:
            IAPOnboardingProductSelect { product in
                step = .purchase(product)
            }

        case .purchase(let product):
            IAPOnboardingPurchase(
                userId: userId,
                product: product,
                onSuccess: { step = .success },
                onError: { msg in step = .error(msg) }
            )

        case .success:
            IAPOnboardingSuccess {
                step = .welcome
            }

        case .error(let message):
            IAPOnboardingError(message: message) {
                step = .productSelect
            }
        }
    }
}
