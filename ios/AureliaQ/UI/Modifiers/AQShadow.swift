import SwiftUI

struct AQShadow: ViewModifier {
    func body(content: Content) -> some View {
        content.shadow(color: .black.opacity(0.1), radius: 8, x: 0, y: 4)
    }
}

extension View {
    func aqShadow() -> some View {
        self.modifier(AQShadow())
    }
}
