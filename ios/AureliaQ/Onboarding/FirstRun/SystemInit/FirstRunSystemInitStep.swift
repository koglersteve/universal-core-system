import Foundation

enum FirstRunSystemInitStep: String, CaseIterable, Identifiable {
    case loadingCore = "Loading Core Systems"
    case verifyingIdentity = "Verifying Founder Identity"
    case initializingKernel = "Initializing Kernel"
    case activatingModules = "Activating Modules"
    case linkingCloud = "Linking Mesh Cloud"
    case finalizing = "Finalizing Setup"

    var id: String { rawValue }
}
