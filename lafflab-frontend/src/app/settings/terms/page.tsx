"use client";

import AppShell from "@/components/AppShell";

export default function TermsOfService() {
  return (
    <AppShell title="Terms of Service">
      <div className="space-y-[var(--space-4)] text-[10px] leading-relaxed text-white/70 max-w-3xl">

        <p>
          These Terms of Service (“Terms”) govern your access to and use of this
          application (“App”). By using the App, you agree to be bound by these Terms. If
          you do not agree, you may not use the App.
        </p>

        <h2 className="text-[11px] font-semibold text-white mt-[var(--space-4)]">
          1. Use of the App
        </h2>
        <p>
          You may use the App only for lawful purposes and in accordance with these
          Terms. You agree not to misuse the App, interfere with its operation, attempt
          unauthorized access, or engage in any activity that could harm the App, its
          users, or its infrastructure.
        </p>

        <h2 className="text-[11px] font-semibold text-white mt-[var(--space-4)]">
          2. User Accounts
        </h2>
        <p>
          If you create an account, you are responsible for maintaining the security of
          your login credentials and for all activity that occurs under your account. You
          agree to provide accurate information and to update it as necessary to keep it
          current.
        </p>

        <h2 className="text-[11px] font-semibold text-white mt-[var(--space-4)]">
          3. User Content
        </h2>
        <p>
          You retain ownership of content you create or upload (“User Content”). By
          submitting User Content, you grant the App a limited, non‑exclusive,
          revocable license to store, display, and process your content solely for the
          purpose of operating the App and providing its features. You represent that you
          have the rights necessary to submit User Content and that it does not violate
          any laws or infringe the rights of others.
        </p>

        <h2 className="text-[11px] font-semibold text-white mt-[var(--space-4)]">
          4. Prohibited Conduct
        </h2>
        <p>You agree not to:</p>
        <ul className="list-disc pl-4 space-y-1">
          <li>Submit unlawful, harmful, or abusive content.</li>
          <li>Impersonate others or misrepresent your identity.</li>
          <li>Attempt to reverse engineer, modify, or disrupt the App.</li>
          <li>Use the App for commercial advertising without permission.</li>
        </ul>

        <h2 className="text-[11px] font-semibold text-white mt-[var(--space-4)]">
          5. Intellectual Property
        </h2>
        <p>
          All App features, design elements, and content (excluding User Content) are
          owned by the App operator and protected by applicable intellectual property
          laws. You may not copy, distribute, or create derivative works without
          permission.
        </p>

        <h2 className="text-[11px] font-semibold text-white mt-[var(--space-4)]">
          6. Privacy
        </h2>
        <p>
          Your use of the App is also governed by the Privacy Policy. The App follows a
          strict data‑minimization model and does not track you across other apps or
          websites, does not sell personal information, and does not use third‑party
          advertising networks. Please review the Privacy Policy for full details.
        </p>

        <h2 className="text-[11px] font-semibold text-white mt-[var(--space-4)]">
          7. Termination
        </h2>
        <p>
          We may suspend or terminate your access to the App if you violate these Terms
          or engage in harmful or unlawful behavior. You may stop using the App at any
          time. Upon termination, your rights to use the App cease immediately.
        </p>

        <h2 className="text-[11px] font-semibold text-white mt-[var(--space-4)]">
          8. Disclaimers
        </h2>
        <p>
          The App is provided “as is” without warranties of any kind. We do not guarantee
          uninterrupted service, error‑free operation, or that the App will meet your
          expectations. To the fullest extent permitted by law, we disclaim all implied
          warranties.
        </p>

        <h2 className="text-[11px] font-semibold text-white mt-[var(--space-4)]">
          9. Limitation of Liability
        </h2>
        <p>
          To the maximum extent permitted by law, we are not liable for any indirect,
          incidental, consequential, or punitive damages arising from your use of the
          App. Our total liability for any claim shall not exceed the amount you paid to
          use the App, if any.
        </p>

        <h2 className="text-[11px] font-semibold text-white mt-[var(--space-4)]">
          10. Changes to These Terms
        </h2>
        <p>
          We may update these Terms from time to time. When changes occur, we will update
          the effective date and provide notice where required. Continued use of the App
          after changes constitutes acceptance of the updated Terms.
        </p>

        <h2 className="text-[11px] font-semibold text-white mt-[var(--space-4)]">
          11. Contact
        </h2>
        <p>
          If you have questions about these Terms, please refer to the contact
          information provided in the App or in the associated store listing.
        </p>
      </div>
    </AppShell>
  );
}
