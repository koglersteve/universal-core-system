import SwiftUI

struct FirstRunCarouselPage: View {
    let item: FirstRunCarouselItem

    var body: some View {
        VStack(spacing: AQSpacing.lg) {

            Image(systemName: item.icon)
                .font(.system(size: 64))
                .foregroundColor(AQColors.primary)
                .padding(.bottom, AQSpacing.md)

            Text(item.title)
                .font(AQTypography.title)
                .multilineTextAlignment(.center)

            Text(item.subtitle)
                .font(AQTypography.body)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
                .padding(.horizontal, AQSpacing.lg)
        }
        .padding()
    }
}
