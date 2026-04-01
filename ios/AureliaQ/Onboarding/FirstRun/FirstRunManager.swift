import Foundation

final class FirstRunManager {
    private static let key = "AureliaQ_FirstRunCompleted"

    static var isFirstRun: Bool {
        !UserDefaults.standard.bool(forKey: key)
    }

    static func complete() {
        UserDefaults.standard.set(true, forKey: key)
    }
}
