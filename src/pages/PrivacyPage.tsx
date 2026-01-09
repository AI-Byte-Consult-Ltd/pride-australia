import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useJurisdiction } from '@/contexts/JurisdictionContext';

const PrivacyPage = () => {
  const { jurisdiction, countryName } = useJurisdiction();
  
  const lastUpdated = 'January 1, 2026';

  return (
    <>
      <Helmet>
        <title>Privacy Policy | Pride Social Network</title>
        <meta name="description" content="Read the Privacy Policy for Pride Social Network. Learn how we collect, use, and protect your personal information." />
      </Helmet>

      <Layout>
        <article className="py-16 lg:py-24">
          <div className="container max-w-3xl">
            <header className="mb-12 animate-fade-in">
              <p className="text-sm text-muted-foreground mb-2">Last updated: {lastUpdated}</p>
              <h1 className="font-display text-4xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-lg text-muted-foreground">
                This policy applies to Pride Social Network users in {countryName}.
              </p>
            </header>

            <div className="prose prose-neutral dark:prose-invert max-w-none animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold mb-4">1. Information We Collect</h2>
                <p className="text-muted-foreground mb-4">
                  We collect information you provide directly to us, including:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Account information (name, email, password)</li>
                  <li>Profile information (bio, avatar, preferences)</li>
                  <li>Content you create (posts, comments, messages)</li>
                  <li>Transaction information (purchases, sales)</li>
                  <li>Communications with us</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
                <p className="text-muted-foreground mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Respond to your comments, questions, and requests</li>
                  <li>Protect the safety and security of our users</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold mb-4">3. Information Sharing</h2>
                <p className="text-muted-foreground">
                  We do not sell your personal information. We may share information 
                  with third parties only in limited circumstances: with your consent, 
                  to comply with legal obligations, to protect rights and safety, 
                  or with service providers who assist our operations.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold mb-4">4. Data Security</h2>
                <p className="text-muted-foreground">
                  We implement appropriate technical and organizational measures to 
                  protect your personal information against unauthorized access, 
                  alteration, disclosure, or destruction.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold mb-4">5. Your Rights</h2>
                <p className="text-muted-foreground mb-4">
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Access and receive a copy of your data</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to or restrict processing</li>
                  <li>Data portability</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold mb-4">6. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have questions about this Privacy Policy or our practices, 
                  please contact us at{' '}
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

export default PrivacyPage;
