import SwiftUI

struct AQCard<Content: View>: View {
    let content: Content

    init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }

    var body: some View {
        content
            .padding(AQSpacing.md)
            .frame(maxWidth: .infinity)
            .background(AQColors.card)
            .aqRounded()
            .aqShadow()
    }
}
