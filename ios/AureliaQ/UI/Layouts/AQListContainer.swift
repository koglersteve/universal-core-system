import SwiftUI

struct AQListContainer<Content: View>: View {
    let content: Content

    init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }

    var body: some View {
        VStack(spacing: AQSpacing.md) {
            content
        }
        .padding(.horizontal)
    }
}
