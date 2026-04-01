"use client";

import ProtectedLayout from "../(protected)/layout";

export default function AdvertiserPage() {
  return (
    <ProtectedLayout>
      <div style={{ padding: 40 }}>
        <h1>Advertiser Console</h1>
        <p>Manage campaigns and view analytics.</p>

        <section style={{ marginTop: 30 }}>
          <h2>Active Campaigns</h2>
          <p>No campaigns yet.</p>
        </section>

        <section style={{ marginTop: 30 }}>
          <h2>Performance Analytics</h2>
          <p>Analytics will appear here in a later phase.</p>
        </section>

        <section style={{ marginTop: 30 }}>
          <h2>Upload Creative</h2>
          <p>Upload tools coming soon.</p>
        </section>
      </div>
    </ProtectedLayout>
  );
}

