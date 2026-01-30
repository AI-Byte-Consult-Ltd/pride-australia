import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";

const GDPRPage = () => {
  const siteUrl = "https://pridesocial.org";
  const title = "GDPR & EU Data Protection | Pride Social Network";
  const description =
    "Your EU/EEA privacy rights under GDPR, how Pride Social Network handles personal data, cookies, security, and international transfers.";
  const lastUpdated = "January 30, 2026";

  /**
   * IMPORTANT NOTE (kept in code comments, not UI):
   * - We do NOT claim Australia has an EU adequacy decision (it does not).
   * - We frame cross-border transfers using SCCs + supplementary measures where needed.
   * - We position the platform as EU-first with HQ in the European Union.
   */

  const controller = {
    name: "Pride Social Network (operated by AI Byte Consult Ltd.)",
    email: "info@pridesocial.org",
    website: "pridesocial.org",
    euHqAddress: "Via del Corso 123, 00186 Rome (RM), Italy",
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${siteUrl}/gdpr`} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${siteUrl}/gdpr`} />
      </Helmet>

      <Layout>
        <article className="py-16 lg:py-24">
          <div className="container max-w-3xl">
            <header className="mb-12 animate-fade-in">
              <p className="text-sm text-muted-foreground mb-2">Last updated: {lastUpdated}</p>
              <h1 className="font-display text-4xl font-bold mb-4">GDPR & EU Data Protection</h1>

              <div className="p-5 rounded-2xl border bg-card shadow-card">
                <p className="text-lg text-muted-foreground">
                  Pride Social Network follows an <span className="font-medium">EU-first</span> approach to privacy and
                  safety. This page explains how we protect personal data under the{" "}
                  <span className="font-medium">EU General Data Protection Regulation (GDPR)</span> and related EU/EEA
                  privacy rules (including cookie requirements).
                </p>
              </div>
            </header>

            <div
              className="prose prose-neutral dark:prose-invert max-w-none space-y-10 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              {/* 1 */}
              <section>
                <h2 className="font-display text-2xl font-semibold mb-4">1. Who This Applies To</h2>
                <p className="text-muted-foreground">
                  This GDPR page is written for users located in the{" "}
                  <span className="font-medium">European Union / European Economic Area (EU/EEA)</span>. If you use Pride
                  Social Network from outside the EU/EEA, our privacy practices remain consistent, but certain legal
                  rights and procedures may differ by jurisdiction.
                </p>
                <p className="text-muted-foreground mt-4">
                  For the full overview of how we collect, use, and protect data across the platform, see our{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </section>

              {/* 2 */}
              <section>
                <h2 className="font-display text-2xl font-semibold mb-4">2. Data Controller (EU-first HQ)</h2>
                <p className="text-muted-foreground mb-4">
                  For GDPR purposes, the <span className="font-medium">data controller</span> is the entity that decides
                  how and why your personal data is processed.
                </p>

                <div className="p-5 rounded-2xl border bg-card shadow-card not-prose">
                  <p className="font-medium">{controller.name}</p>
                  <p className="text-muted-foreground">EU HQ: {controller.euHqAddress}</p>
                  <p className="text-muted-foreground">
                    Email:{" "}
                    <a className="text-primary hover:underline" href={`mailto:${controller.email}`}>
                      {controller.email}
                    </a>
                  </p>
                  <p className="text-muted-foreground">Website: {controller.website}</p>
                </div>

                <p className="text-muted-foreground mt-4">
                  We may use trusted vendors (processors) for hosting, security, analytics (where enabled), and payment
                  processing. Processors act on our instructions and are contractually required to protect personal data.
                </p>
              </section>

              {/* 3 */}
              <section>
                <h2 className="font-display text-2xl font-semibold mb-4">3. What Data We Collect</h2>
                <p className="text-muted-foreground mb-4">
                  We collect data needed to operate the platform, keep it safe, and improve it. Depending on how you use
                  Pride Social Network, this can include:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>
                    <strong>Account data:</strong> email, authentication identifiers, account creation date, security
                    signals.
                  </li>
                  <li>
                    <strong>Profile data:</strong> display name, username, bio, avatar, preferences you choose to add.
                  </li>
                  <li>
                    <strong>Content you create:</strong> posts, replies, mentions, and other content you submit.
                  </li>
                  <li>
                    <strong>Community interaction data:</strong> likes, echoes (reposts), replies, and related metadata.
                  </li>
                  <li>
                    <strong>Technical and log data:</strong> IP address, device/browser information, timestamps, error
                    logs, and security events (anti-abuse).
                  </li>
                  <li>
                    <strong>Payments (if you support the project):</strong> payment confirmations and transaction status
                    from providers (we do not store full card numbers when handled by payment processors).
                  </li>
                </ul>

                <div className="p-5 rounded-2xl bg-muted/30 border not-prose mt-6">
                  <p className="font-medium mb-2">Special note: sensitive data</p>
                  <p className="text-muted-foreground text-sm">
                    Pride Social Network is an LGBTQIA+ community space. Some user-generated content may reveal sensitive
                    information (for example, sexual orientation or gender identity). We encourage members to share only
                    what they feel safe sharing. We design safety and moderation to reduce risks from exposure or misuse.
                  </p>
                </div>
              </section>

              {/* 4 */}
              <section>
                <h2 className="font-display text-2xl font-semibold mb-4">4. Why We Process Data (Purposes)</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>
                    <strong>To provide the service:</strong> create accounts, show the feed, enable posts/replies/mentions,
                    and maintain core features.
                  </li>
                  <li>
                    <strong>To keep the platform safe:</strong> prevent spam, abuse, harassment, fraud, and security
                    incidents.
                  </li>
                  <li>
                    <strong>To operate and improve:</strong> debug, monitor performance, improve reliability, and refine
                    features based on usage (with privacy-respecting controls).
                  </li>
                  <li>
                    <strong>To communicate with you:</strong> service notices, security alerts, support responses, and
                    (where you choose) updates.
                  </li>
                  <li>
                    <strong>To meet legal obligations:</strong> compliance, lawful requests, record-keeping where required.
                  </li>
                </ul>
              </section>

              {/* 5 */}
              <section>
                <h2 className="font-display text-2xl font-semibold mb-4">5. Legal Bases Under GDPR</h2>
                <p className="text-muted-foreground mb-4">
                  GDPR requires a valid legal basis for processing. Depending on the context, Pride Social Network relies
                  on:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-3">
                  <li>
                    <strong>Contract (Art. 6(1)(b)):</strong> to provide the service you requested (account, platform
                    features).
                  </li>
                  <li>
                    <strong>Legitimate interests (Art. 6(1)(f)):</strong> to secure the service, prevent abuse, and improve
                    reliability — balanced against your rights.
                  </li>
                  <li>
                    <strong>Consent (Art. 6(1)(a)):</strong> for optional processing such as non-essential cookies or
                    certain marketing communications (where used).
                  </li>
                  <li>
                    <strong>Legal obligation (Art. 6(1)(c)):</strong> when we must comply with applicable laws.
                  </li>
                </ul>

                <p className="text-muted-foreground mt-4">
                  Where sensitive (special category) data is processed (Art. 9), we aim to minimize it and apply
                  additional safeguards. In many cases, sensitive information appears only because users voluntarily
                  include it in their own content.
                </p>
              </section>

              {/* 6 */}
              <section>
                <h2 className="font-display text-2xl font-semibold mb-4">6. Cookies and Similar Technologies (EU Rules)</h2>
                <p className="text-muted-foreground">
                  EU cookie rules generally require consent for non-essential cookies (for example, analytics/marketing),
                  while strictly necessary cookies can be used to provide the service (for example, session, security,
                  load balancing).
                </p>

                <p className="text-muted-foreground mt-4">
                  We aim to follow these principles:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>
                    <strong>Necessary cookies:</strong> enabled by default because the site cannot function safely without
                    them.
                  </li>
                  <li>
                    <strong>Preferences:</strong> optional and used to remember your choices (where implemented).
                  </li>
                  <li>
                    <strong>Analytics:</strong> only enabled with consent where legally required (where implemented).
                  </li>
                  <li>
                    <strong>Marketing:</strong> we avoid tracking-based advertising as a default approach; if ever used, it
                    would require clear consent.
                  </li>
                </ul>

                <p className="text-muted-foreground mt-4">
                  See our{" "}
                  <Link to="/cookies" className="text-primary hover:underline">
                    Cookie Policy
                  </Link>{" "}
                  for details and controls.
                </p>
              </section>

              {/* 7 */}
              <section>
                <h2 className="font-display text-2xl font-semibold mb-4">7. Your Rights Under GDPR</h2>
                <p className="text-muted-foreground mb-4">
                  If you are in the EU/EEA, you have rights over your personal data, including:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>
                    <strong>Access:</strong> request a copy of your data.
                  </li>
                  <li>
                    <strong>Rectification:</strong> correct inaccurate or incomplete data.
                  </li>
                  <li>
                    <strong>Erasure:</strong> request deletion in certain circumstances.
                  </li>
                  <li>
                    <strong>Restriction:</strong> limit processing in certain cases.
                  </li>
                  <li>
                    <strong>Portability:</strong> receive data in a structured, machine-readable format (where applicable).
                  </li>
                  <li>
                    <strong>Objection:</strong> object to processing based on legitimate interests and to direct marketing.
                  </li>
                  <li>
                    <strong>Withdraw consent:</strong> where processing is based on consent (e.g., optional cookies).
                  </li>
                </ul>
              </section>

              {/* 8 */}
              <section>
                <h2 className="font-display text-2xl font-semibold mb-4">8. How to Exercise Your Rights</h2>
                <p className="text-muted-foreground mb-4">To submit a GDPR request, you can:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>
                    Email{" "}
                    <a className="text-primary hover:underline" href={`mailto:${controller.email}`}>
                      {controller.email}
                    </a>{" "}
                    with subject: <strong>“GDPR Request”</strong>
                  </li>
                  <li>
                    Use our{" "}
                    <Link to="/contact" className="text-primary hover:underline">
                      Contact page
                    </Link>
                  </li>
                  <li>Use account settings where available (for example, updating profile info).</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  We may ask you to verify your identity to protect your data. We aim to respond within{" "}
                  <strong>one month</strong> (GDPR standard), and sooner where possible.
                </p>
              </section>

              {/* 9 */}
              <section>
                <h2 className="font-display text-2xl font-semibold mb-4">9. International Data Transfers</h2>
                <p className="text-muted-foreground">
                  Pride Social Network is EU-first, but our infrastructure and service providers may involve processing
                  outside the EU/EEA. When personal data is transferred internationally, we use appropriate safeguards,
                  such as:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>European Commission Standard Contractual Clauses (SCCs) where applicable</li>
                  <li>Vendor due diligence and contractual security requirements</li>
                  <li>Supplementary measures when needed (encryption, access controls, minimization)</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  We aim to minimize cross-border transfers and store only what is necessary to operate the platform
                  safely and reliably.
                </p>
              </section>

              {/* 10 */}
              <section>
                <h2 className="font-display text-2xl font-semibold mb-4">10. Data Retention</h2>
                <p className="text-muted-foreground">
                  We keep personal data only as long as needed for the purposes described above, including legal,
                  security, and operational needs. Retention depends on data type:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>
                    <strong>Account data:</strong> retained while your account is active; removed or anonymized after
                    deletion where feasible.
                  </li>
                  <li>
                    <strong>Content:</strong> retained until removed by you or moderated; some content may remain visible
                    if shared publicly unless deleted.
                  </li>
                  <li>
                    <strong>Security logs:</strong> retained for a limited period to detect and investigate abuse.
                  </li>
                  <li>
                    <strong>Payments:</strong> transaction records may be retained as required for accounting/legal
                    obligations.
                  </li>
                </ul>
              </section>

              {/* 11 */}
              <section>
                <h2 className="font-display text-2xl font-semibold mb-4">11. Security Measures</h2>
                <p className="text-muted-foreground">
                  We implement technical and organizational safeguards appropriate to the risk, including access controls,
                  secure authentication flows, encryption in transit where available, incident monitoring, and continuous
                  improvement of our security posture.
                </p>
                <p className="text-muted-foreground mt-4">
                  No system is perfectly secure. If you believe your account is compromised, contact us immediately at{" "}
                  <a className="text-primary hover:underline" href={`mailto:${controller.email}`}>
                    {controller.email}
                  </a>
                  .
                </p>
              </section>

              {/* 12 */}
              <section>
                <h2 className="font-display text-2xl font-semibold mb-4">12. Complaints</h2>
                <p className="text-muted-foreground mb-4">
                  If you’re not satisfied with our response, you have the right to lodge a complaint with your local EU
                  Data Protection Authority (DPA).
                </p>
                <div className="p-5 rounded-2xl border bg-card shadow-card not-prose">
                  <p className="font-medium">EU/EEA Supervisory Authorities</p>
                  <p className="text-muted-foreground text-sm">
                    You can find the list of DPAs through the{" "}
                    <a
                      href="https://edpb.europa.eu/about-edpb/about-edpb/members_en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      European Data Protection Board (EDPB)
                    </a>
                    .
                  </p>
                </div>
              </section>

              {/* 13 */}
              <section>
                <h2 className="font-display text-2xl font-semibold mb-4">13. Related Policies</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>
                    <Link to="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/cookies" className="text-primary hover:underline">
                      Cookie Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </section>

              {/* 14 */}
              <section className="mb-2">
                <h2 className="font-display text-2xl font-semibold mb-4">14. Contact</h2>
                <p className="text-muted-foreground">
                  Questions about GDPR or data protection? Email{" "}
                  <a className="text-primary hover:underline" href={`mailto:${controller.email}`}>
                    {controller.email}
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>
        </article>
      </Layout>
    </>
  );
};

export default GDPRPage;
