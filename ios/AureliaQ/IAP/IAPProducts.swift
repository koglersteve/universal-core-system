import Foundation

enum IAPProducts {
    // Advertiser CPM packages
    static let cpm1000   = "com.aureliaq.ads.cpm1000"
    static let cpm5000   = "com.aureliaq.ads.cpm5000"
    static let cpm10000  = "com.aureliaq.ads.cpm10000"

    // Vendor subscription tiers
    static let vendorLocal     = "com.aureliaq.vendor.local"
    static let vendorRegional  = "com.aureliaq.vendor.regional"
    static let vendorNational  = "com.aureliaq.vendor.national"

    static let all: [String] = [
        cpm1000, cpm5000, cpm10000,
        vendorLocal, vendorRegional, vendorNational
    ]
}
