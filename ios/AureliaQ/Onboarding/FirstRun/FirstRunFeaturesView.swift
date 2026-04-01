import SwiftUI

struct FirstRunFeaturesView: View {
    let onContinue: () -> Void
    let onSkip: () -> Void

    var body: some View {
        FirstRunCarouselView(
            onContinue: onContinue,
            onSkip: onSkip
        )
    }
}
