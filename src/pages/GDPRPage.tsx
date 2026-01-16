import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";

const GDPRPage = () => {
  const siteUrl = "https://pridesocial.org";
  const title = "GDPR & Data Protection | PRIDE Social Network";
  const description =
    "Learn about your data protection rights under GDPR (EU) and the Australian Privacy Act. PRIDE Social Network is committed to protecting your privacy.";
  const lastUpdated = "January 14, 2026";

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
              <h1 className="font-display text-4xl font-bold mb-4">GDPR & Data Protection</h1>
              <p className="text-lg text-muted-foreground">
                This page explains your rights under the EU General Data Protection Regulation (GDPR) 
                and the Australian Privacy Act 1988.
              </p>
            </header>

            <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              
              {/* Introduction */}
              <section>
                <h2 className="font-display text-2xl font-semibold mb-4">Our Commitment to Data Protection</h2>
                <p className="text-muted-foreground">
                  PRIDE Social Network, operated by Pride Lab Foundation Australia, is committed to protecting 
                  your personal data and respecting your privacy rights. We comply with the EU General Data 
                  Protection Regulation (GDPR) for users in the European Economic Area (EEA) and the UK, 
                  as well as the Australian Privacy Act 1988 and the Australian Privacy Principles (APPs) 
                  for all users.
                </p>
              </section>

              {/* Data Controller */}
              <section>
                <h2 className="font-display text-2xl font-semibold mb-4">Data Controller</h2>
                <p className="text-muted-foreground mb-4">
                  Pride Lab Foundation Australia is the data controller responsible for your personal data. 
                  For any data protection inquiries, you can contact us at:
                </p>
                <div className="p-4 rounded-lg border bg-card">
                  <p className="font-medium">Pride Lab Foundation Australia</p>
                  <p className="text-muted-foreground">Email: info@pridesocial.org</p>
                  <p className="text-muted-foreground">Website: pridesocial.org</p>
                </div>
              </section>

              {/* Lawful Basis for Processing (GDPR) */}
              <section>
                <h2 className="font-display text-2xl font-semibold mb-4">Lawful Basis for Processing (GDPR)</h2>
                <p className="text-muted-foreground mb-4">
                  Under the GDPR, we process your personal data based on the following legal grounds:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-3">
                  <li>
                    <strong>Contract:</strong> Processing necessary for the performance of our service agreement 
                    with you (e.g., providing your account, enabling platform features).
                  </li>
                  <li>
                    <strong>Consent:</strong> Where you have given explicit consent for specific processing 
                    activities (e.g., marketing communications, optional cookies).
                  </li>
                  <li>
                    <strong>Legitimate Interests:</strong> Processing necessary for our legitimate interests, 
                    provided these do not override your fundamental rights (e.g., fraud prevention, security, 
                    service improvement).
                  </li>
                  <li>
                    <strong>Legal Obligation:</strong> Processing required to comply with applicable laws 
                    (e.g., tax records, law enforcement requests).
                  </li>
                </ul>
              </section>

              {/* Your Rights Under GDPR */}
              <section>
                <h2 className="font-display text-2xl font-semibold mb-4">Your Rights Under GDPR (EU/UK Users)</h2>
                <p className="text-muted-foreground mb-4">
                  If you are located in the European Economic Area or the United Kingdom, you have the following rights:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-3">
                  <li>
                    <strong>Right to Access:</strong> You can request a copy of the personal data we hold about you.
                  </li>
                  <li>
                    <strong>Right to Rectification:</strong> You can request correction of inaccurate or incomplete data.
                  </li>
                  <li>
                    <strong>Right to Erasure ("Right to be Forgotten"):</strong> You can request deletion of your 
                    personal data under certain circumstances.
                  </li>
                  <li>
                    <strong>Right to Restrict Processing:</strong> You can request that we limit how we use your data.
                  </li>
                  <li>
                    <strong>Right to Data Portability:</strong> You can request your data in a structured, 
                    commonly used, machine-readable format.
                  </li>
                  <li>
                    <strong>Right to Object:</strong> You can object to processing based on legitimate interests 
                    or for direct marketing purposes.
                  </li>
                  <li>
                    <strong>Rights Related to Automated Decision-Making:</strong> You have rights concerning 
                    automated decisions that significantly affect you.
                  </li>
                  <li>
                    <strong>Right to Withdraw Consent:</strong> Where processing is based on consent, you can 
                    withdraw it at any time.
                  </li>
                </ul>
              </section>

              {/* Your Rights Under Australian Privacy Act */}
              <section>
                <h2 className="font-display text-2xl font-semibold mb-4">Your Rights Under Australian Privacy Act</h2>
                <p className="text-muted-foreground mb-4">
                  Under the Australian Privacy Act 1988 and the Australian Privacy Principles (APPs), you have the right to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-3">
                  <li>
                    <strong>Access Your Information:</strong> Request access to the personal information we hold about you.
                  </li>
                  <li>
                    <strong>Correct Your Information:</strong> Request correction of any inaccurate, out-of-date, 
                    incomplete, irrelevant, or misleading information.
                  </li>
                  <li>
                    <strong>Anonymity/Pseudonymity:</strong> Where lawful and practical, you may choose not to 
                    identify yourself or use a pseudonym.
                  </li>
                  <li>
                    <strong>Complain:</strong> Lodge a complaint with us or the Office of the Australian Information 
                    Commissioner (OAIC) if you believe your privacy has been breached.
                  </li>
                  <li>
                    <strong>Opt-Out of Marketing:</strong> Unsubscribe from direct marketing communications at any time.
                  </li>
                </ul>
              </section>

              {/* Data We Collect */}
              <section>
                <h2 className="font-display text-2xl font-semibold mb-4">Data We Collect</h2>
                <p className="text-muted-foreground mb-4">
                  We collect and process the following categories of personal data:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Identity Data:</strong> Name, username, date of birth</li>
                  <li><strong>Contact Data:</strong> Email address</li>
                  <li><strong>Profile Data:</strong> Bio, avatar, preferences, interests</li>
                  <li><strong>Content Data:</strong> Posts, comments, messages you create</li>
                  <li><strong>Technical Data:</strong> IP address, browser type, device information</li>
                  <li><strong>Usage Data:</strong> Information about how you use our platform</li>
                  <li><strong>Transaction Data:</strong> Details of purchases or sales on our marketplace</li>
                </ul>
              </section>

              {/* International Data Transfers */}
              <section>
                <h2 className="font-display text-2xl font-semibold mb-4">International Data Transfers</h2>
                <p className="text-muted-foreground mb-4">
                  As Pride Lab Foundation is based in Australia, your data may be transferred to and processed 
                  in Australia. For EU/UK users, we ensure appropriate safeguards are in place for such transfers, including:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
                  <li>Adequacy decisions where applicable</li>
                  <li>Your explicit consent for specific transfers</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Australia is recognized by the European Commission as providing adequate protection for personal data.
                </p>
              </section>

              {/* Data Retention */}
              <section>
                <h2 className="font-display text-2xl font-semibold mb-4">Data Retention</h2>
                <p className="text-muted-foreground">
                  We retain your personal data only for as long as necessary to fulfill the purposes for which 
                  it was collected, including to satisfy legal, accounting, or reporting requirements. When 
                  determining retention periods, we consider the amount, nature, and sensitivity of the data, 
                  potential risk from unauthorized use, and applicable legal requirements.
                </p>
              </section>

              {/* Data Security */}
              <section>
                <h2 className="font-display text-2xl font-semibold mb-4">Data Security</h2>
                <p className="text-muted-foreground">
                  We implement appropriate technical and organizational measures to protect your personal data 
                  against unauthorized access, alteration, disclosure, or destruction. This includes encryption, 
                  access controls, regular security assessments, and staff training.
                </p>
              </section>

              {/* Cookies */}
              <section>
                <h2 className="font-display text-2xl font-semibold mb-4">Cookies and Tracking</h2>
                <p className="text-muted-foreground">
                  We use cookies and similar technologies to enhance your experience. For detailed information 
                  about the cookies we use and how to manage your preferences, please see our{" "}
                  <Link to="/cookies" className="text-primary hover:underline">Cookie Policy</Link>.
                </p>
              </section>

              {/* Exercising Your Rights */}
              <section>
                <h2 className="font-display text-2xl font-semibold mb-4">How to Exercise Your Rights</h2>
                <p className="text-muted-foreground mb-4">
                  To exercise any of your data protection rights, you can:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Email us at <a href="mailto:info@pridesocial.org" className="text-primary hover:underline">info@pridesocial.org</a></li>
                  <li>Use the privacy settings in your account dashboard</li>
                  <li>Contact us through our <Link to="/contact" className="text-primary hover:underline">Contact page</Link></li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  We will respond to your request within 30 days (or one month for GDPR requests). 
                  We may need to verify your identity before processing your request.
                </p>
              </section>

              {/* Complaints */}
              <section>
                <h2 className="font-display text-2xl font-semibold mb-4">Complaints</h2>
                <p className="text-muted-foreground mb-4">
                  If you are not satisfied with how we handle your data or your rights request, you have the 
                  right to lodge a complaint with:
                </p>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border bg-card">
                    <p className="font-medium">For EU/UK Users</p>
                    <p className="text-muted-foreground text-sm">
                      Your local Data Protection Authority (DPA). A list of EU DPAs can be found at{" "}
                      <a 
                        href="https://edpb.europa.eu/about-edpb/about-edpb/members_en" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        edpb.europa.eu
                      </a>
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border bg-card">
                    <p className="font-medium">For Australian Users</p>
                    <p className="text-muted-foreground text-sm">
                      Office of the Australian Information Commissioner (OAIC)<br />
                      Website:{" "}
                      <a 
                        href="https://www.oaic.gov.au" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        www.oaic.gov.au
                      </a>
                    </p>
                  </div>
                </div>
              </section>

              {/* Updates */}
              <section>
                <h2 className="font-display text-2xl font-semibold mb-4">Updates to This Policy</h2>
                <p className="text-muted-foreground">
                  We may update this policy from time to time. We will notify you of any significant changes 
                  by posting a notice on our platform or sending you an email. We encourage you to review 
                  this page periodically for the latest information on our data protection practices.
                </p>
              </section>

              {/* Related Policies */}
              <section>
                <h2 className="font-display text-2xl font-semibold mb-4">Related Policies</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link></li>
                  <li><Link to="/cookies" className="text-primary hover:underline">Cookie Policy</Link></li>
                  <li><Link to="/terms" className="text-primary hover:underline">Terms of Service</Link></li>
                </ul>
              </section>

            </div>
          </div>
        </article>
      </Layout>
    </>
  );
};

export default GDPRPage;
