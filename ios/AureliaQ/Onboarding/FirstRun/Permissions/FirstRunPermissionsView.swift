import SwiftUI

struct FirstRunPermissionsView: View {
    let onContinue: () -> Void
    let onSkip: () -> Void

    @State private var notificationsGranted = false
    @State private var cameraGranted = false
    @State private var photosGranted = false
    @State private var trackingGranted = false

    @State private var loading = false

    var body: some View {
        AQScreen("Permissions") {
            VStack(spacing: AQSpacing.xl) {

                AQCard {
                    VStack(alignment: .leading, spacing: AQSpacing.md) {

                        permissionRow(
                            title: "Notifications",
                            subtitle: "Stay updated with important alerts.",
                            granted: notificationsGranted,
                            action: requestNotifications
                        )

                        permissionRow(
                            title: "Camera",
                            subtitle: "Capture photos for your profile or content.",
                            granted: cameraGranted,
                            action: requestCamera
                        )

                        permissionRow(
                            title: "Photos",
                            subtitle: "Upload images from your library.",
                            granted: photosGranted,
                            action: requestPhotos
                        )

                        permissionRow(
                            title: "Tracking",
                            subtitle: "Improve ad relevance and analytics.",
                            granted: trackingGranted,
                            action: requestTracking
                        )
                    }
                }

                if loading {
                    ProgressView("Requesting…")
                }

                AQButton(title: "Enable All") {
                    Task {
                        loading = true
                        let _ = await FirstRunPermissionsManager.requestAll()
                        loading = false
                        onContinue()
                    }
                }

                Button("Skip for Now") {
                    onSkip()
                }
                .foregroundColor(.secondary)
            }
        }
    }

    // MARK: - Permission Row

    @ViewBuilder
    private func permissionRow(
        title: String,
        subtitle: String,
        granted: Bool,
        action: @escaping () async -> Void
    ) -> some View {
        HStack {
            VStack(alignment: .leading, spacing: 4) {
                Text(title)
                    .font(AQTypography.body)
                Text(subtitle)
                    .font(AQTypography.caption)
                    .foregroundColor(.secondary)
            }

            Spacer()

            if granted {
                Image(systemName: "checkmark.circle.fill")
                    .foregroundColor(.green)
            } else {
                Button("Enable") {
                    Task {
                        await action()
                    }
                }
                .buttonStyle(.bordered)
            }
        }
    }

    // MARK: - Individual Requests

    private func requestNotifications() async {
        notificationsGranted = await FirstRunPermissionsManager.requestNotifications()
    }

    private func requestCamera() async {
        cameraGranted = await FirstRunPermissionsManager.requestCamera()
    }

    private func requestPhotos() async {
        photosGranted = await FirstRunPermissionsManager.requestPhotos()
    }

    private func requestTracking() async {
        trackingGranted = await FirstRunPermissionsManager.requestTracking()
    }
}
