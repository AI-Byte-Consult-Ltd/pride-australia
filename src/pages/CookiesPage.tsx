import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useJurisdiction } from '@/contexts/JurisdictionContext';

const CookiesPage = () => {
  const { jurisdiction, countryName } = useJurisdiction();

  return (
    <>
      <Helmet>
        <title>Cookie Policy | Pride Social Network</title>
        <meta name="description" content="Learn about how Pride Social Network uses cookies and similar technologies to provide a better experience." />
      </Helmet>

      <Layout>
        <div className="py-16 lg:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h1 className="font-display text-4xl font-bold mb-8">Cookie Policy</h1>
              <p className="text-muted-foreground mb-8">
                Last updated: January 2026 • Applicable to {countryName}
              </p>

              <div className="prose prose-lg max-w-none">
                <section className="mb-12">
                  <h2 className="font-display text-2xl font-semibold mb-4">What Are Cookies?</h2>
                  <p className="text-muted-foreground mb-4">
                    Cookies are small text files that are placed on your device when you visit our website. 
                    They help us provide you with a better experience by remembering your preferences, 
                    keeping you logged in, and understanding how you use our platform.
                  </p>
                </section>

                <section className="mb-12">
                  <h2 className="font-display text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
                  
                  <h3 className="font-display text-xl font-medium mb-3 mt-6">Essential Cookies</h3>
                  <p className="text-muted-foreground mb-4">
                    These cookies are necessary for the website to function properly. They enable core 
                    functionality such as security, network management, and account access. You cannot 
                    opt out of these cookies.
                  </p>

                  <h3 className="font-display text-xl font-medium mb-3 mt-6">Functional Cookies</h3>
                  <p className="text-muted-foreground mb-4">
                    These cookies enable personalized features such as remembering your language preference, 
                    jurisdiction selection, and display settings. Disabling these may affect your experience.
                  </p>

                  <h3 className="font-display text-xl font-medium mb-3 mt-6">Analytics Cookies</h3>
                  <p className="text-muted-foreground mb-4">
                    We use analytics cookies to understand how visitors interact with our website. 
                    This helps us improve our platform and provide better services to our community.
                  </p>
                </section>

                <section className="mb-12">
                  <h2 className="font-display text-2xl font-semibold mb-4">Managing Cookies</h2>
                  <p className="text-muted-foreground mb-4">
                    Most web browsers allow you to control cookies through their settings. You can:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                    <li>View what cookies are stored on your device</li>
                    <li>Delete all or specific cookies</li>
                    <li>Block cookies from being set</li>
                    <li>Set preferences for certain websites</li>
                  </ul>
                  <p className="text-muted-foreground">
                    Please note that blocking essential cookies may prevent you from using certain 
                    features of Pride Social Network.
                  </p>
                </section>

                <section className="mb-12">
                  <h2 className="font-display text-2xl font-semibold mb-4">Third-Party Cookies</h2>
                  <p className="text-muted-foreground mb-4">
                    Some cookies are placed by third-party services that appear on our pages, 
                    such as payment processors (Stripe, Revolut) and analytics providers. 
                    These third parties have their own privacy policies governing the use of cookies.
                  </p>
                </section>

                {jurisdiction === 'AU' && (
                  <section className="mb-12">
                    <h2 className="font-display text-2xl font-semibold mb-4">Australian Privacy Principles</h2>
                    <p className="text-muted-foreground mb-4">
                      Our use of cookies complies with the Australian Privacy Principles (APPs) under 
                      the Privacy Act 1988 (Cth). We are transparent about our data collection practices 
                      and respect your privacy choices.
                    </p>
                  </section>
                )}

                {jurisdiction === 'US' && (
                  <section className="mb-12">
                    <h2 className="font-display text-2xl font-semibold mb-4">California Privacy Rights</h2>
                    <p className="text-muted-foreground mb-4">
                      If you are a California resident, you have rights under the California Consumer 
                      Privacy Act (CCPA) regarding cookies and tracking technologies. You may opt out 
                      of the sale of personal information collected through cookies.
                    </p>
                  </section>
                )}

                <section className="mb-12">
                  <h2 className="font-display text-2xl font-semibold mb-4">Contact Us</h2>
                  <p className="text-muted-foreground">
                    If you have questions about our use of cookies, please contact us at{' '}
                    <a href="mailto:info@pridesocial.org" className="text-primary hover:underline">
                      info@pridesocial.org
                    </a>
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CookiesPage;
