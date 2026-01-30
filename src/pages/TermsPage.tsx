import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useJurisdiction } from '@/contexts/JurisdictionContext';

const TermsPage = () => {
  const { countryName } = useJurisdiction();

  const lastUpdated = 'January 30, 2026';

  return (
    <>
      <Helmet>
        <title>Terms of Service | Pride Social Network</title>
        <meta
          name="description"
          content="Read the Terms of Service for Pride Social Network. Understand your rights and responsibilities when using our platform."
        />
      </Helmet>

      <Layout>
        <article className="py-16 lg:py-24">
          <div className="container max-w-3xl">
            <header className="mb-12 animate-fade-in">
              <p className="text-sm text-muted-foreground mb-2">Last updated: {lastUpdated}</p>
              <h1 className="font-display text-4xl font-bold mb-4">Terms of Service</h1>
              <p className="text-lg text-muted-foreground">
                These terms apply to Pride Social Network users in {countryName}.
              </p>
            </header>

            <div
              className="prose prose-neutral dark:prose-invert max-w-none animate-fade-in"
              style={{ animationDelay: '0.1s' }}
            >
              {/* 1 */}
              <section className="mb-10">
                <h2 className="font-display text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing or using Pride Social Network (“Pride Social”, “the Platform”, “we”, “us”), you agree to be
                  bound by these Terms of Service (“Terms”) and all applicable laws and regulations. If you do not agree
                  with any part of these Terms, you must not use the Platform.
                </p>
                <p className="text-muted-foreground mt-4">
                  We may update these Terms from time to time. If we make material changes, we will take reasonable steps
                  to notify users (for example, via an in-app notice). Continued use of the Platform after changes become
                  effective constitutes acceptance of the updated Terms.
                </p>
              </section>

              {/* 2 */}
              <section className="mb-10">
                <h2 className="font-display text-2xl font-semibold mb-4">2. Who We Are, EU Priority, and Ecosystem Structure</h2>
                <p className="text-muted-foreground">
                  Pride Social Network is a community-first LGBTQIA+ social platform built with an EU-first approach and a
                  global mission (“Made in EU, for the World”). Our operational priority is the European Union (including
                  Italy), while supporting members worldwide.
                </p>

                <p className="text-muted-foreground mt-4">
                  <strong>EU priority means:</strong> we design policies, safety standards, and product decisions to align
                  first with EU norms and requirements (including data protection principles), and then extend responsibly
                  to other regions where we can operate safely and lawfully.
                </p>

                <p className="text-muted-foreground mt-4">
                  The ecosystem may include separate, region-based non-profit entities that support community programs
                  outside the Platform. Current direction:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>
                    <strong>Pride Lab Foundation Italy</strong> (planned): intended to support EU-based community initiatives,
                    partnerships, and programs aligned with the Platform’s mission.
                  </li>
                  <li>
                    <strong>Pride Lab Foundation Australia</strong> (secondary priority): documentation and planning exist;
                    registration steps may proceed on a later timeline depending on resources and priorities.
                  </li>
                  <li>
                    <strong>USA foundation</strong>: postponed for an неопределённый срок due to the current uncertainty in
                    the EU–US environment and related operational considerations.
                  </li>
                </ul>

                <p className="text-muted-foreground mt-4">
                  <strong>Important:</strong> Pride Social Network is the digital platform. Foundations (when/where created)
                  are separate legal entities used to run real-world programs (events, grants, education initiatives, etc.).
                  They do not change your user relationship with the Platform unless explicitly stated in product notices.
                </p>

                <p className="text-muted-foreground mt-4">
                  References to any external professional networks or service providers (including advisory or audit networks)
                  are informational only and do not imply endorsement, partnership, sponsorship, or affiliation unless we
                  explicitly publish a signed partnership statement.
                </p>
              </section>

              {/* 3 */}
              <section className="mb-10">
                <h2 className="font-display text-2xl font-semibold mb-4">3. Eligibility and Account Registration</h2>
                <p className="text-muted-foreground mb-4">
                  To use Pride Social Network, you must create an account. By registering, you agree that you will:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Provide accurate and complete information where required</li>
                  <li>Maintain the security and confidentiality of your login credentials</li>
                  <li>Be responsible for all activity that occurs under your account</li>
                  <li>Notify us promptly if you suspect unauthorized access or misuse</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  You may not create accounts in a way that misleads others, including through impersonation, deceptive
                  identity claims, or attempts to appear affiliated with organizations or individuals without permission.
                </p>
              </section>

              {/* 4 */}
              <section className="mb-10">
                <h2 className="font-display text-2xl font-semibold mb-4">4. Community Safety and Acceptable Use</h2>
                <p className="text-muted-foreground">
                  Pride Social Network is designed as a community-first space for LGBTQIA+ members, creators, and allies.
                  You agree not to post, share, or engage in content or behavior that includes:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                  <li>Hate speech, discrimination, harassment, threats, or targeted abuse</li>
                  <li>Non-consensual sexual content, exploitation, or content involving minors</li>
                  <li>Content that encourages self-harm or violence</li>
                  <li>Illegal activity or attempts to evade law enforcement</li>
                  <li>Spam, manipulation, coordinated inauthentic behavior, or abusive automation</li>
                  <li>Invasions of privacy (doxxing, sharing private data, non-consensual recording)</li>
                  <li>Infringement of intellectual property rights (copyright/trademarks)</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  We may remove content and/or restrict accounts that violate these Terms or that create risk for users or
                  the Platform, including where required to comply with legal obligations.
                </p>
              </section>

              {/* 5 */}
              <section className="mb-10">
                <h2 className="font-display text-2xl font-semibold mb-4">5. Content, Replies, Mentions, and Interaction</h2>
                <p className="text-muted-foreground">
                  The Platform supports posts, replies, mentions (@tagging), likes, and reposts (“Echo”). You are
                  responsible for the content you publish and for ensuring your interactions remain respectful and lawful.
                </p>
                <p className="text-muted-foreground mt-4">
                  We may use technical systems (including automated signals) to help detect spam, harassment patterns, and
                  abuse. These systems support safety and moderation and may require human review.
                </p>
              </section>

              {/* 6 */}
              <section className="mb-10">
                <h2 className="font-display text-2xl font-semibold mb-4">6. Memberships, Payments, and PRIDE Coins</h2>
                <p className="text-muted-foreground">
                  Pride Social Network may offer paid memberships (monthly subscriptions) that provide platform benefits
                  and help fund ongoing development. Membership pricing, benefits, and availability may change over time,
                  and some features may be marked as “Soon” and released in phases.
                </p>
                <p className="text-muted-foreground mt-4">
                  We may also provide PRIDE Coins (or similar internal units) as part of membership or participation.
                  PRIDE Coins are intended for use inside the Platform. Unless explicitly stated otherwise, PRIDE Coins:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Are not legal tender and are not a substitute for money</li>
                  <li>Have no guaranteed monetary value and are not guaranteed to be redeemable for cash</li>
                  <li>May be adjusted, limited, or removed to prevent abuse or for platform integrity</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Payments may be processed by third-party providers. Your payment is subject to the provider’s terms and
                  policies. We do not store full payment card data on our servers when processed by third parties.
                </p>
                <p className="text-muted-foreground mt-4">
                  Refunds, chargebacks, and disputes are handled according to the rules of the payment provider and
                  applicable consumer laws. If you believe a payment is in error, contact us at{' '}
                  <a href="mailto:info@pridesocial.org" className="text-primary hover:underline">
                    info@pridesocial.org
                  </a>
                  .
                </p>
              </section>

              {/* 7 */}
              <section className="mb-10">
                <h2 className="font-display text-2xl font-semibold mb-4">7. Business Listings and Community Map</h2>
                <p className="text-muted-foreground">
                  Pride Social Network may offer business listings and a community map. If you submit a listing, you agree
                  that the information you provide is accurate, lawful, and does not misrepresent your services, location,
                  or identity.
                </p>
                <p className="text-muted-foreground mt-4">
                  We may review, approve, reject, or remove listings at our discretion to protect users and maintain
                  platform quality. We do not guarantee that listings will be approved or remain visible.
                </p>
                <p className="text-muted-foreground mt-4">
                  Pride Social Network is not responsible for third-party services offered by listed businesses. Any
                  transactions or interactions are solely between users and those third parties.
                </p>
              </section>

              {/* 8 */}
              <section className="mb-10">
                <h2 className="font-display text-2xl font-semibold mb-4">8. Intellectual Property and Your Content</h2>
                <p className="text-muted-foreground">
                  You retain ownership of the content you create. By posting on Pride Social Network, you grant us a
                  non-exclusive, worldwide, royalty-free license to host, store, reproduce, display, and distribute your
                  content solely to operate, improve, and promote the Platform, and to make your content visible according
                  to the Platform’s functionality.
                </p>
                <p className="text-muted-foreground mt-4">
                  You represent and warrant that you have the rights necessary to post the content and that it does not
                  violate any law or third-party rights.
                </p>
              </section>

              {/* 9 */}
              <section className="mb-10">
                <h2 className="font-display text-2xl font-semibold mb-4">9. Privacy and Data Protection</h2>
                <p className="text-muted-foreground">
                  Our handling of personal data is described in our Privacy Policy (where available). You must not collect
                  or harvest personal information from other users without consent, including via scraping or automated
                  collection methods.
                </p>
              </section>

              {/* 10 */}
              <section className="mb-10">
                <h2 className="font-display text-2xl font-semibold mb-4">10. Third-Party Services and Links</h2>
                <p className="text-muted-foreground">
                  The Platform may contain links to third-party websites and services. We do not control third parties and
                  are not responsible for their content, policies, or practices. Your use of third-party services is at
                  your own risk.
                </p>
              </section>

              {/* 11 */}
              <section className="mb-10">
                <h2 className="font-display text-2xl font-semibold mb-4">11. Suspension, Termination, and Enforcement</h2>
                <p className="text-muted-foreground">
                  We may suspend or terminate access if we reasonably believe you have violated these Terms, created risk
                  for others, or engaged in behavior that undermines platform integrity. You may stop using the Platform at
                  any time. Where available, you may delete your account through your account settings.
                </p>
              </section>

              {/* 12 */}
              <section className="mb-10">
                <h2 className="font-display text-2xl font-semibold mb-4">12. Disclaimers and Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  The Platform is provided on an “as is” and “as available” basis. To the maximum extent permitted by law,
                  we disclaim warranties and limit liability for indirect, incidental, special, consequential, or punitive
                  damages arising from your use of the Platform.
                </p>
              </section>

              {/* 13 */}
              <section className="mb-10">
                <h2 className="font-display text-2xl font-semibold mb-4">13. Governing Law and Regional Notes</h2>
                <p className="text-muted-foreground">
                  These Terms apply to users in {countryName}. Depending on your location, mandatory consumer or data
                  protection laws may grant additional rights that cannot be waived.
                </p>
                <p className="text-muted-foreground mt-4">
                  Pride Social Network operates with an EU-first approach and supports a global community. Some features,
                  policies, or availability may differ by region due to legal requirements and safety considerations.
                </p>
              </section>

              {/* 14 */}
              <section className="mb-6">
                <h2 className="font-display text-2xl font-semibold mb-4">14. Contact</h2>
                <p className="text-muted-foreground">
                  For questions about these Terms, please contact{' '}
                  <a href="mailto:info@pridesocial.org" className="text-primary hover:underline">
                    info@pridesocial.org
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

export default TermsPage;

