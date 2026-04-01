import Foundation
import UserNotifications
import AVFoundation
import Photos
import AppTrackingTransparency

final class FirstRunPermissionsManager {

    static func requestNotifications() async -> Bool {
        let center = UNUserNotificationCenter.current()
        let result = try? await center.requestAuthorization(options: [.alert, .sound, .badge])
        return result ?? false
    }

    static func requestCamera() async -> Bool {
        let status = AVCaptureDevice.authorizationStatus(for: .video)
        switch status {
        case .authorized:
            return true
        case .notDetermined:
            return await AVCaptureDevice.requestAccess(for: .video)
        default:
            return false
        }
    }

    static func requestPhotos() async -> Bool {
        let status = PHPhotoLibrary.authorizationStatus()
        switch status {
        case .authorized, .limited:
            return true
        case .notDetermined:
            let result = await PHPhotoLibrary.requestAuthorization(for: .readWrite)
            return result == .authorized || result == .limited
        default:
            return false
        }
    }

    static func requestTracking() async -> Bool {
        if #available(iOS 14, *) {
            let status = ATTrackingManager.trackingAuthorizationStatus
            if status == .notDetermined {
                let result = await ATTrackingManager.requestTrackingAuthorization()
                return result == .authorized
            }
            return status == .authorized
        }
        return true
    }

    static func requestAll() async -> Bool {
        let n = await requestNotifications()
        let c = await requestCamera()
        let p = await requestPhotos()
        let t = await requestTracking()
        return n && c && p && t
    }
}
