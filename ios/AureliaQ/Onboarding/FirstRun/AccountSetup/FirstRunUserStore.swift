import Foundation

struct FirstRunUserStore {
    static func save(_ model: FirstRunAccountSetupModel) {
        UserDefaults.standard.set(model.displayName, forKey: "FR_DisplayName")
        UserDefaults.standard.set(model.email, forKey: "FR_Email")
        UserDefaults.standard.set(model.role.rawValue, forKey: "FR_Role")
    }
}
