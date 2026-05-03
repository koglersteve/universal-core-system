"use client";

import AppShell from "@/components/AppShell";

export default function PrivacySettings() {
  return (
    <AppShell title="Privacy Policy">
      <div className="space-y-[var(--space-4)] text-[10px] leading-relaxed text-white/70 max-w-3xl">

        <p>
          This Privacy Policy describes how this application (“App”) collects, uses,
          stores, and protects information. This App is designed with a strict
          data‑minimization philosophy. We do not track you across other apps or
          websites, we do not sell or share your personal information for advertising
          purposes, and we do not collect data unrelated to the operation and
          improvement of this App. By using the App, you acknowledge that you have read
          and understood this Privacy Policy.
        </p>

        <h2 className="text-[11px] font-semibold text-white mt-[var(--space-4)]">
          1. Information We Collect
        </h2>
        <p>
          We collect only the information necessary to operate the App, maintain
          functionality, and understand general usage patterns. The categories of
          information we may collect include:
        </p>
        <ul className="list-disc pl-4 space-y-1">
          <li>
            <span className="font-semibold text-white">App Usage Information:</span>
            aggregated, non‑identifying data about how users interact with the App,
            including screens viewed, features accessed, and general performance metrics.
            This information is used solely to maintain and improve the App.
          </li>
          <li>
            <span className="font-semibold text-white">Account Information:</span>
            if you create an account, we may store your email address, display name, and
            basic profile settings to enable login, personalization, and user‑initiated
            features.
          </li>
          <li>
            <span className="font-semibold text-white">User‑Generated Content:</span>
            posts, drafts, uploads, and other content you voluntarily create or submit
            within the App.
          </li>
        </ul>

        <p>
          We do <span className="font-semibold text-white">not</span> collect information
          about your activity on other apps, websites, or services. We do{" "}
          <span className="font-semibold text-white">not</span> collect precise location
          data, contact lists, device identifiers used for tracking, or any information
          unrelated to the operation of this App.
        </p>

        <h2 className="text-[11px] font-semibold text-white mt-[var(--space-4)]">
          2. No Cross‑App Tracking or Third‑Party Tracking
        </h2>
        <p>
          The App does <span className="font-semibold text-white">not</span> use
          third‑party tracking technologies, advertising identifiers, or cross‑context
          behavioral tracking. We do not allow third parties to track your activity
          across apps or websites, and we do not participate in cross‑service profiling,
          targeted advertising networks, or data brokerage practices.
        </p>

        <h2 className="text-[11px] font-semibold text-white mt-[var(--space-4)]">
          3. Limited In‑App Personalization
        </h2>
        <p>
          Any personalization within the App is based solely on your activity inside this
          App. For example, we may recommend features, tools, or content types based on
          your in‑App behavior. We do not use external data sources, third‑party
          advertising networks, or cross‑app identifiers for personalization.
        </p>

        <h2 className="text-[11px] font-semibold text-white mt-[var(--space-4)]">
          4. How We Use Information
        </h2>
        <p>We use the information we collect exclusively for the following purposes:</p>
        <ul className="list-disc pl-4 space-y-1">
          <li>To operate, maintain, and improve the App and its features.</li>
          <li>To provide account functionality and user‑initiated services.</li>
          <li>To understand aggregate usage patterns and App performance.</li>
          <li>To communicate important App‑related updates, where applicable.</li>
        </ul>

        <h2 className="text-[11px] font-semibold text-white mt-[var(--space-4)]">
          5. Data Storage and Retention
        </h2>
        <p>
          We retain information only for as long as necessary to operate the App, comply
          with legal obligations, or resolve disputes. When information is no longer
          required, we take reasonable steps to delete or de‑identify it. We do not store
          unnecessary personal information, and we do not retain data for advertising or
          tracking purposes.
        </p>

        <h2 className="text-[11px] font-semibold text-white mt-[var(--space-4)]">
          6. Your Rights and Controls
        </h2>
        <p>You may have the ability to:</p>
        <ul className="list-disc pl-4 space-y-1">
          <li>Update your account information within the App.</li>
          <li>Adjust notification and privacy‑related settings.</li>
          <li>Request deletion of your account and associated data, where applicable.</li>
        </ul>

        <h2 className="text-[11px] font-semibold text-white mt-[var(--space-4)]">
          7. Children’s Privacy
        </h2>
        <p>
          This App is not intended for children in jurisdictions requiring parental
          consent for data processing. We do not knowingly collect personal information
          from children in violation of applicable laws. If we become aware that such
          information has been collected, we will take reasonable steps to delete it.
        </p>

        <h2 className="text-[11px] font-semibold text-white mt-[var(--space-4)]">
          8. Platform and Regulatory Compliance
        </h2>
        <p>
          This App is designed to comply with major platform requirements, including
          Apple App Store and Google Play policies, by limiting data collection to what
          is necessary for functionality, avoiding cross‑app tracking, and providing
          clear disclosure of data practices. We also follow general principles found in
          global privacy frameworks, including data minimization, purpose limitation, and
          user transparency.
        </p>

        <h2 className="text-[11px] font-semibold text-white mt-[var(--space-4)]">
          9. Apple App Privacy Disclosure
        </h2>
        <p>
          For purposes of Apple’s App Privacy details, the App collects limited data
          related to App functionality and user‑initiated features only. This may include
          account information (such as email and display name), user‑generated content
          created within the App, and basic app usage information used to maintain and
          improve performance. This data is{" "}
          <span className="font-semibold text-white">not</span> used for tracking,{" "}
          <span className="font-semibold text-white">not</span> linked to you across
          other apps or websites, and{" "}
          <span className="font-semibold text-white">not</span> shared with third parties
          for advertising or profiling.
        </p>
        <p>
          In‑App Disclosure: This app does not track you across apps or websites. We do
          not collect data for advertising, analytics vendors, or third‑party tracking
          technologies. Data collected is used only for App functionality and
          user‑initiated features.
        </p>

        <h2 className="text-[11px] font-semibold text-white mt-[var(--space-4)]">
          10. Google Play Data Safety
        </h2>
        <p>
          For purposes of Google Play’s Data Safety section, the App may collect the
          following categories of data:
        </p>
        <ul className="list-disc pl-4 space-y-1">
          <li>
            <span className="font-semibold text-white">Personal Information:</span> 
            email address and display name, when you choose to create an account, used
            solely for account functionality and user‑initiated features.
          </li>
          <li>
            <span className="font-semibold text-white">App Activity:</span> 
            limited information about how you use the App (such as screens viewed and
            features used) to maintain and improve functionality and performance.
          </li>
          <li>
            <span className="font-semibold text-white">User‑Generated Content:</span> 
            posts, drafts, and other content you create within the App, used only to
            provide core App features.
          </li>
        </ul>
        <p>
          We do <span className="font-semibold text-white">not</span> collect location
          data, financial information, health information, contacts, messages, or device
          identifiers used for tracking. We do{" "}
          <span className="font-semibold text-white">not</span> share your data with
          third parties for advertising, and we do{" "}
          <span className="font-semibold text-white">not</span> sell your personal
          information. Data is encrypted in transit, and users may request deletion of
          their account and associated data where applicable.
        </p>

        <h2 className="text-[11px] font-semibold text-white mt-[var(--space-4)]">
          11. Changes to This Policy
        </h2>
        <p>
          We may update this Privacy Policy to reflect changes in the App or applicable
          requirements. When updates occur, we will revise the effective date and, where
          required, provide additional notice within the App.
        </p>

        <h2 className="text-[11px] font-semibold text-white mt-[var(--space-4)]">
          12. Contact Information
        </h2>
        <p>
          If you have questions about this Privacy Policy or how your information is
          handled, please refer to the contact information provided in the App or in the
          associated store listing.
        </p>
      </div>
    </AppShell>
  );
}
