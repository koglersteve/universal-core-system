import SwiftUI

struct AQButton: View {
    let title: String
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(title)
                .font(AQTypography.headline)
                .foregroundColor(.white)
                .padding(.vertical, 12)
                .frame(maxWidth: .infinity)
                .background(AQColors.primary)
                .aqRounded()
                .aqShadow()
        }
    }
}
