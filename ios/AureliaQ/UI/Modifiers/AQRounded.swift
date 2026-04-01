import SwiftUI

struct AQRounded: ViewModifier {
    let radius: CGFloat

    func body(content: Content) -> some View {
        content.cornerRadius(radius)
    }
}

extension View {
    func aqRounded(_ radius: CGFloat = 12) -> some View {
        self.modifier(AQRounded(radius: radius))
    }
}
