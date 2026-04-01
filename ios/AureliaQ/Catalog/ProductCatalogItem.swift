import Foundation

struct ProductCatalogItem: Identifiable {
    let id = UUID()
    let title: String
    let description: String
    let productId: String
    let price: String
    let category: Category

    enum Category {
        case vendor
        case advertiser
    }
}
