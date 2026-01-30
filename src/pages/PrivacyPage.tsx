import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useJurisdiction } from '@/contexts/JurisdictionContext';

const PrivacyPage = () => {
  const { jurisdiction, countryName } = useJurisdiction();

  const lastUpdated = 'January 30, 2026';

  const siteName = 'Pride Social Network';
  const contactEmail = 'info@pridesocial.org';

  const isEU = jurisdiction === 'eu';
  const isAU = jurisdiction === 'australia';
  const isWorld = jurisdiction === 'world';

  return (
    <>
      <Helmet>
        <title>Privacy Policy | Pride Social Network</title>
        <meta
          name="description"
          content="Read the Privacy Policy for Pride Social Network. Learn how we collect, use, share, and protect personal information, including cookies and GDPR information for EU users."
        />
      </Helmet>

      <Layout>
        <article className="py-16 lg:py-24">
          <div className="container max-w-3xl">
            <header className="mb-12 animate-fade-in">
              <p className="text-sm text-muted-foreground mb-2">Last updated: {lastUpdated}</p>
              <h1 className="font-display text-4xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-lg text-muted-foreground">
                This policy applies to {siteName} users in {countryName}.
              </p>
              {isEU && (
                <p className="text-sm text-muted-foreground mt-3">
                  EU notice: This policy includes GDPR disclosures and cookie information for European Union users.
                </p>
              )}
            </header>

            <div
              className="prose prose-neutral dark:prose-invert max-w-none animate-fade-in"
              style={{ animationDelay: '0.1s' }}
            >
              {/* 1 */}
              <section className="mb-10">
                <h2 className="font-display text-2xl font-semibold mb-4">1. Overview</h2>
                <p className="text-muted-foreground">
                  This Privacy Policy explains how {siteName} (“we”, “us”, “our”) collects, uses, shares, and protects
                  personal information when you access or use our website, apps, and related services (the “Platform”).
                </p>
                <p className="text-muted-foreground mt-4">
                  We build with an EU-first approach and apply strong privacy and safety practices globally. However,
                  certain rights and disclosures depend on the region you select in the header (European Union, World, or
                  Australia).
                </p>
              </section>

              {/* 2 */}
              <section className="mb-10">
                <h2 className="font-display text-2xl font-semibold mb-4">2. Information We Collect</h2>

                <p className="text-muted-foreground mb-4">We collect the following categories of information:</p>

                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>
                    <strong>Account information:</strong> email address, authentication data (handled by our auth
                    provider), and basic account identifiers.
                  </li>
                  <li>
                    <strong>Profile information:</strong> display name, username, bio (if provided), and optional profile
                    details.
                  </li>
                  <li>
                    <strong>Content you create:</strong> posts, replies, mentions, and other content you submit on the
                    Platform.
                  </li>
                  <li>
                    <strong>Support and payments:</strong> if you purchase a membership or support us, payment processing
                    is handled by third-party providers. We receive confirmation and limited transaction metadata (for
                    example, tier, timestamp, provider reference), not full card details.
                  </li>
                  <li>
                    <strong>Communications:</strong> messages you send to us (support requests, feedback, partnership
                    inquiries).
                  </li>
                  <li>
                    <strong>Usage and device data:</strong> log data (timestamps, pages viewed, approximate location
                    derived from IP), device/browser information, and security signals.
                  </li>
                  <li>
                    <strong>Cookies and similar technologies:</strong> described in the Cookies section below.
                  </li>
                </ul>

                <p className="text-muted-foreground mt-4">
                  We do not intentionally collect sensitive categories of personal data. Please avoid posting sensitive
                  personal information in public areas of the Platform.
                </p>
              </section>

              {/* 3 */}
              <section className="mb-10">
                <h2 className="font-display text-2xl font-semibold mb-4">3. How We Use Information</h2>
                <p className="text-muted-foreground mb-4">We use personal information to:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Provide and operate core features (registration, profiles, posts, replies, mentions, notifications).</li>
                  <li>Maintain safety, prevent abuse, detect spam/harassment patterns, and enforce rules.</li>
                  <li>Improve performance and user experience (debugging, analytics where enabled, product iteration).</li>
                  <li>Process memberships/support and deliver related benefits (e.g., badges, internal coins where applicable).</li>
                  <li>Communicate with you (service notices, security alerts, support responses).</li>
                  <li>Comply with legal obligations and protect rights and safety of users and the Platform.</li>
                </ul>
              </section>

              {/* 4 - Legal bases for EU */}
              {isEU && (
                <section className="mb-10">
                  <h2 className="font-display text-2xl font-semibold mb-4">4. GDPR Legal Bases (EU Users)</h2>
                  <p className="text-muted-foreground mb-4">
                    For users in the European Union, we process personal data under the following legal bases (Article 6
                    GDPR), depending on the context:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>
                      <strong>Contract:</strong> to provide the Platform and core features you request (account creation,
                      posts, replies, notifications).
                    </li>
                    <li>
                      <strong>Legitimate interests:</strong> to keep the Platform secure, prevent abuse, maintain
                      reliability, and improve features—balanced against your rights.
                    </li>
                    <li>
                      <strong>Consent:</strong> for optional cookies/trackers and certain non-essential processing where
                      required.
                    </li>
                    <li>
                      <strong>Legal obligation:</strong> where we must comply with applicable laws, lawful requests, and
                      enforcement obligations.
                    </li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    Where we rely on consent, you can withdraw it at any time (see Cookies and Your Rights).
                  </p>
                </section>
              )}

              {/* 5 */}
              <section className="mb-10">
                <h2 className="font-display text-2xl font-semibold mb-4">5. Cookies & Similar Technologies</h2>

                <p className="text-muted-foreground">
                  We use cookies and similar technologies (local storage, pixels where applicable) to operate the
                  Platform, remember preferences, improve performance, and help keep accounts secure.
                </p>

                <h3 className="font-display text-xl font-semibold mt-6 mb-3">5.1 Cookie categories</h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>
                    <strong>Strictly necessary:</strong> required for login sessions, security, load balancing, and basic
                    site functionality. These cannot be disabled without breaking core features.
                  </li>
                  <li>
                    <strong>Preferences:</strong> remember choices like region/jurisdiction selection and UI settings.
                  </li>
                  <li>
                    <strong>Analytics (optional):</strong> help us understand usage and improve the product. If enabled,
                    we aim to minimize data and use privacy-friendly settings.
                  </li>
                  <li>
                    <strong>Marketing (not required):</strong> we do not run behavioral advertising by default. If this
                    changes, we will update this policy and (where required) request consent.
                  </li>
                </ul>

                <h3 className="font-display text-xl font-semibold mt-6 mb-3">5.2 Managing cookies</h3>
                <p className="text-muted-foreground">
                  You can control cookies through your browser settings and, where available, our cookie preferences UI.
                  Blocking strictly necessary cookies may prevent you from logging in or using core features.
                </p>

                {isEU && (
                  <>
                    <h3 className="font-display text-xl font-semibold mt-6 mb-3">5.3 EU consent approach</h3>
                    <p className="text-muted-foreground">
                      For EU users, non-essential cookies (such as optional analytics) are used only where legally
                      permitted and, when required, only after you provide consent. You can withdraw consent at any time
                      via your browser controls and/or our cookie preferences UI (when available).
                    </p>
                  </>
                )}
              </section>

              {/* 6 */}
              <section className="mb-10">
                <h2 className="font-display text-2xl font-semibold mb-4">6. Sharing & Disclosure</h2>
                <p className="text-muted-foreground mb-4">
                  We do not sell your personal information. We share information only in limited situations:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>
                    <strong>Service providers:</strong> hosting, authentication, email delivery, analytics (if enabled),
                    and payments. Providers process data under contractual obligations and only as necessary to deliver
                    services.
                  </li>
                  <li>
                    <strong>Legal and safety:</strong> to comply with law, respond to lawful requests, protect users,
                    investigate fraud/abuse, and enforce our terms.
                  </li>
                  <li>
                    <strong>Business transfers:</strong> in the event of a reorganization or asset transfer, with
                    appropriate safeguards and notice where required.
                  </li>
                </ul>

                <p className="text-muted-foreground mt-4">
                  If you post content publicly, it may be visible to other users and may be shared by them. Please use
                  care when posting personal information in public areas.
                </p>
              </section>

              {/* 7 - International transfers for EU */}
              {isEU && (
                <section className="mb-10">
                  <h2 className="font-display text-2xl font-semibold mb-4">7. International Data Transfers (EU Users)</h2>
                  <p className="text-muted-foreground">
                    Our service providers may process data in different countries. Where personal data is transferred
                    outside the European Economic Area, we use appropriate safeguards when required (for example, standard
                    contractual clauses and vendor due diligence) and we take steps to minimize data shared to what is
                    necessary.
                  </p>
                </section>
              )}

              {/* 8 */}
              <section className="mb-10">
                <h2 className="font-display text-2xl font-semibold mb-4">8. Data Security</h2>
                <p className="text-muted-foreground">
                  We implement reasonable technical and organizational measures to protect personal information against
                  unauthorized access, alteration, disclosure, or destruction. No method of transmission or storage is
                  100% secure; however, we work to continuously improve safeguards and respond to incidents.
                </p>
              </section>

              {/* 9 */}
              <section className="mb-10">
                <h2 className="font-display text-2xl font-semibold mb-4">9. Data Retention</h2>
                <p className="text-muted-foreground">
                  We retain personal information only as long as necessary to provide the Platform, comply with legal
                  obligations, resolve disputes, and enforce agreements. Retention periods depend on the type of data and
                  how it is used (e.g., account records, security logs, support communications).
                </p>
              </section>

              {/* 10 - rights */}
              <section className="mb-10">
                <h2 className="font-display text-2xl font-semibold mb-4">10. Your Rights</h2>

                {isEU && (
                  <>
                    <p className="text-muted-foreground mb-4">
                      If you are in the European Union, you have rights under the GDPR, including:
                    </p>
                    <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                      <li>Right to access your personal data</li>
                      <li>Right to rectification (correct inaccurate data)</li>
                      <li>Right to erasure (“right to be forgotten”) in certain cases</li>
                      <li>Right to restrict processing in certain cases</li>
                      <li>Right to data portability</li>
                      <li>Right to object to processing based on legitimate interests</li>
                      <li>Right to withdraw consent at any time (where processing is based on consent)</li>
                      <li>Right to lodge a complaint with a supervisory authority</li>
                    </ul>
                    <p className="text-muted-foreground mt-4">
                      To exercise these rights, contact us at{' '}
                      <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">
                        {contactEmail}
                      </a>
                      . We may ask for information to verify your identity before fulfilling requests.
                    </p>
                  </>
                )}

                {isAU && (
                  <>
                    <p className="text-muted-foreground mb-4">
                      If you are in Australia, you may have rights to access and correct personal information we hold
                      about you, subject to applicable laws. To request access or correction, contact{' '}
                      <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">
                        {contactEmail}
                      </a>
                      .
                    </p>
                  </>
                )}

                {isWorld && (
                  <>
                    <p className="text-muted-foreground mb-4">
                      If you are outside the EU and Australia, local laws may grant privacy rights (access, correction,
                      deletion, or objection). We aim to honor reasonable requests where feasible and consistent with
                      legal obligations. Contact{' '}
                      <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">
                        {contactEmail}
                      </a>
                      .
                    </p>
                  </>
                )}
              </section>

              {/* 11 */}
              <section className="mb-10">
                <h2 className="font-display text-2xl font-semibold mb-4">11. Children</h2>
                <p className="text-muted-foreground">
                  The Platform is not intended for children. If you believe a child has provided personal data to us,
                  please contact{' '}
                  <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">
                    {contactEmail}
                  </a>{' '}
                  and we will take appropriate steps.
                </p>
              </section>

              {/* 12 */}
              <section className="mb-10">
                <h2 className="font-display text-2xl font-semibold mb-4">12. Changes to this Policy</h2>
                <p className="text-muted-foreground">
                  We may update this Privacy Policy to reflect changes to the Platform, legal requirements, or our
                  practices. If we make material changes, we will take reasonable steps to notify users (for example, by
                  posting a notice on the Platform). The “Last updated” date reflects the latest revision.
                </p>
              </section>

              {/* 13 */}
              <section className="mb-6">
                <h2 className="font-display text-2xl font-semibold mb-4">13. Contact</h2>
                <p className="text-muted-foreground">
                  For privacy questions or requests, contact{' '}
                  <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">
                    {contactEmail}
                  </a>
                  .
                </p>
              </section>

              {/* Optional jurisdiction-specific footer note */}
              {isEU && (
                <section className="mt-10">
                  <p className="text-xs text-muted-foreground">
                    EU note: This Privacy Policy is intended to provide transparency under GDPR and related EU privacy
                    rules. It does not replace legal advice.
                  </p>
                </section>
              )}
            </div>
          </div>
        </article>
      </Layout>
    </>
  );
};

export default PrivacyPage;
