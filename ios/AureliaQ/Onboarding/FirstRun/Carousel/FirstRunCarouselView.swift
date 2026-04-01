import SwiftUI

struct FirstRunCarouselView: View {
    let onContinue: () -> Void
    let onSkip: () -> Void

    @State private var index: Int = 0

    private let items: [FirstRunCarouselItem] = [
        FirstRunCarouselItem(
            title: "Run Your Community",
            subtitle: "Manage members, permissions, and operations with clarity and control.",
            icon: "person.3.fill"
        ),
        FirstRunCarouselItem(
            title: "Upgrade Vendor Tiers",
            subtitle: "Unlock advanced tools and analytics as your business grows.",
            icon: "chart.bar.fill"
        ),
        FirstRunCarouselItem(
            title: "Advertise with CPM Packages",
            subtitle: "Launch targeted campaigns and track performance in real time.",
            icon: "megaphone.fill"
        ),
        FirstRunCarouselItem(
            title: "Track Billing & Receipts",
            subtitle: "View purchase history, manage subscriptions, and stay organized.",
            icon: "doc.text.magnifyingglass"
        ),
        FirstRunCarouselItem(
            title: "Deep‑Link Purchases",
            subtitle: "Buy instantly from QR codes, emails, or cross‑app links.",
            icon: "link.circle.fill"
        )
    ]

    var body: some View {
        AQScreen("Welcome") {
            VStack(spacing: AQSpacing.xl) {

                TabView(selection: $index) {
                    ForEach(Array(items.enumerated()), id: \.offset) { idx, item in
                        FirstRunCarouselPage(item: item)
                            .tag(idx)
                    }
                }
                .tabViewStyle(PageTabViewStyle(indexDisplayMode: .never))
                .frame(height: 420)

                HStack(spacing: 8) {
                    ForEach(0..<items.count, id: \.self) { i in
                        Circle()
                            .fill(i == index ? AQColors.primary : Color.gray.opacity(0.3))
                            .frame(width: 10, height: 10)
                    }
                }

                VStack(spacing: AQSpacing.md) {
                    AQButton(title: index == items.count - 1 ? "Get Started" : "Continue") {
                        if index == items.count - 1 {
                            onContinue()
                        } else {
                            withAnimation {
                                index += 1
                            }
                        }
                    }

                    Button("Skip for Now") {
                        onSkip()
                    }
                    .foregroundColor(.secondary)
                }
            }
        }
    }
}
