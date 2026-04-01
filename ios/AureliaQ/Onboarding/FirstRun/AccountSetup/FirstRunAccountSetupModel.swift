import Foundation

struct FirstRunAccountSetupModel {
    var displayName: String = ""
    var email: String = ""
    var role: UserRole = .founder
}

enum UserRole: String, CaseIterable, Identifiable {
    case founder = "Founder"
    case vendor = "Vendor"
    case advertiser = "Advertiser"

    var id: String { rawValue }
}
