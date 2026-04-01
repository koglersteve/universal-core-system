"use client";

import ProtectedLayout from "../(protected)/layout";

export default function VendorPage() {
  return (
    <ProtectedLayout>
      <div style={{ padding: 40 }}>
        <h1>Vendor Console</h1>
        <p>Manage listings and subscriptions.</p>

        <section style={{ marginTop: 30 }}>
          <h2>Your Listings</h2>
          <p>No listings yet.</p>
        </section>

        <section style={{ marginTop: 30 }}>
          <h2>Subscription Status</h2>
          <p>Vendor subscription tools coming soon.</p>
        </section>

        <section style={{ marginTop: 30 }}>
          <h2>Directory Placement</h2>
          <p>Directory controls will appear here in a later phase.</p>
        </section>
      </div>
    </ProtectedLayout>
  );
}

