import SwiftUI

struct AQSectionHeader: View {
    let title: String

    var body: some View {
        Text(title)
            .font(AQTypography.headline)
            .foregroundColor(AQColors.secondary)
            .padding(.bottom, AQSpacing.sm)
    }
}
