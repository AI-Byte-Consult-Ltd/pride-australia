import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useJurisdiction } from '@/contexts/JurisdictionContext';

const TermsPage = () => {
  const { jurisdiction, countryName } = useJurisdiction();
  
  const lastUpdated = 'January 8, 2026';

  return (
    <>
      <Helmet>
        <title>Terms of Service | Pride Social Network</title>
        <meta name="description" content="Read the Terms of Service for Pride Social Network. Understand your rights and responsibilities when using our platform." />
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

            <div className="prose prose-neutral dark:prose-invert max-w-none animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing or using Pride Social Network, you agree to be bound by these 
                  Terms of Service and all applicable laws and regulations. If you do not 
                  agree with any of these terms, you are prohibited from using this service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold mb-4">2. User Accounts</h2>
                <p className="text-muted-foreground mb-4">
                  When you create an account, you agree to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold mb-4">3. Community Guidelines</h2>
                <p className="text-muted-foreground mb-4">
                  Pride Social Network is a safe space for the LGBTQ+ community. You agree not to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Post hateful, discriminatory, or harassing content</li>
                  <li>Impersonate others or misrepresent your identity</li>
                  <li>Share illegal content or engage in illegal activities</li>
                  <li>Spam, manipulate, or abuse platform features</li>
                  <li>Violate others' privacy or intellectual property rights</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold mb-4">4. Marketplace Terms</h2>
                <p className="text-muted-foreground">
                  Users who sell on our marketplace agree to provide accurate product 
                  descriptions, fulfill orders promptly, and comply with all applicable 
                  consumer protection laws. PRIDE Lab Foundation takes a commission on 
                  marketplace sales to support platform operations.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold mb-4">5. Intellectual Property</h2>
                <p className="text-muted-foreground">
                  You retain ownership of content you create. By posting, you grant 
                  Pride Social Network a non-exclusive license to use, display, and 
                  distribute your content on the platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold mb-4">6. Termination</h2>
                <p className="text-muted-foreground">
                  We may terminate or suspend your account for violations of these terms 
                  or for any other reason at our discretion. You may also delete your 
                  account at any time through your account settings.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold mb-4">7. Contact</h2>
                <p className="text-muted-foreground">
                  For questions about these Terms, please contact{' '}
                  <a href="mailto:info@pridesocial.org" className="text-primary hover:underline">
                    info@pridesocial.org
                  </a>
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
