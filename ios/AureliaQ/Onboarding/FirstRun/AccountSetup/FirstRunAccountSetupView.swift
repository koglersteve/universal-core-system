import SwiftUI

struct FirstRunAccountSetupView: View {
    @State private var model = FirstRunAccountSetupModel()
    let onContinue: (FirstRunAccountSetupModel) -> Void
    let onSkip: () -> Void

    var body: some View {
        AQScreen("Set Up Your Account") {
            VStack(spacing: AQSpacing.xl) {

                AQCard {
                    VStack(alignment: .leading, spacing: AQSpacing.md) {

                        Text("Your Name")
                            .font(AQTypography.caption)
                            .foregroundColor(.secondary)

                        TextField("John Doe", text: $model.displayName)
                            .textFieldStyle(.roundedBorder)

                        Text("Email")
                            .font(AQTypography.caption)
                            .foregroundColor(.secondary)

                        TextField("you@example.com", text: $model.email)
                            .textFieldStyle(.roundedBorder)

                        Text("Role")
                            .font(AQTypography.caption)
                            .foregroundColor(.secondary)

                        Picker("Role", selection: $model.role) {
                            ForEach(UserRole.allCases) { role in
                                Text(role.rawValue).tag(role)
                            }
                        }
                        .pickerStyle(.segmented)
                    }
                }

                AQButton(title: "Continue") {
                    onContinue(model)
                }

                Button("Skip for Now") {
                    onSkip()
                }
                .foregroundColor(.secondary)
            }
        }
    }
}
