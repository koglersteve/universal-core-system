@Composable
fun VendorDashboardScreen(
    onManageSubscription: () -> Unit,
    onUpgrade: () -> Unit,
    onPurchaseCredits: () -> Unit,
    onViewRevenue: () -> Unit,
    onViewAdAnalytics: () -> Unit
) {
    Column {

        // 1. Billing Health Monitor (NEW)
        BillingHealthWidget()

        // 2. Subscription + Billing Widget (existing)
        VendorBillingWidget(
            onManageSubscription = onManageSubscription,
            onUpgrade = onUpgrade
        )

        // 3. Ad Credits Widget (existing)
        VendorAdCreditsWidget(
            onPurchaseCredits = onPurchaseCredits
        )

        // 4. Vendor Revenue Dashboard (NEW)
        VendorRevenueWidget(
            onViewRevenue = onViewRevenue
        )

        // 5. Ad Performance Analytics (NEW)
        AdPerformanceAnalyticsWidget(
            onViewAnalytics = onViewAdAnalytics
        )
    }
}
