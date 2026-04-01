import SwiftUI

struct AQStatBlock: View {
    let label: String
    let value: String

    var body: some View {
        VStack {
            Text(value)
                .font(AQTypography.title)
                .foregroundColor(AQColors.primary)
            Text(label)
                .font(AQTypography.caption)
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity)
    }
}
