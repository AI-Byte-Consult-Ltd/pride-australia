import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Mail, MessageCircle, MapPin } from 'lucide-react';
import { useJurisdiction, type Jurisdiction } from '@/contexts/JurisdictionContext';

const JURISDICTION_META: Record<Jurisdiction, { label: string; emoji: string }> = {
  eu: { label: 'European Union', emoji: '🇪🇺' },
  australia: { label: 'Australia', emoji: '🇦🇺' },
  world: { label: 'World', emoji: '🌍' },
};

// Central Italy address placeholder (you asked: “любой адрес в Италии, центральный”)
const EU_HQ_ADDRESS =
  'Pride Social Network (EU HQ)\nVia del Corso 123\n00186 Rome (RM)\nItaly';

const ContactPage = () => {
  // Updated context shape: { jurisdiction, countryName, setJurisdiction }
  // No countryEmoji exists anymore.
  const { jurisdiction, countryName } = useJurisdiction();

  const meta = JURISDICTION_META[jurisdiction];

  return (
    <>
      <Helmet>
        <title>Contact Us | Pride Social Network</title>
        <meta
          name="description"
          content="Get in touch with Pride Social Network. Contact us for support, partnerships, and general inquiries."
        />
        <link rel="canonical" href="https://pridesocial.org/contact" />
      </Helmet>

      <Layout>
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
              <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Get in Touch</h1>
              <p className="text-lg text-muted-foreground">
                Have questions about <span className="font-medium">Pride Social Network</span>? We’re here for support,
                partnerships, and community inquiries.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* Email */}
              <Card variant="elevated" className="text-center animate-fade-in">
                <CardHeader>
                  <div className="h-14 w-14 rounded-xl bg-pride-pink/10 text-pride-pink flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-7 w-7" />
                  </div>
                  <CardTitle>Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">General inquiries and support</p>
                  <a href="mailto:info@pridesocial.org" className="text-primary hover:underline font-medium">
                    info@pridesocial.org
                  </a>
                </CardContent>
              </Card>

              {/* Community */}
              <Card variant="elevated" className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <CardHeader>
                  <div className="h-14 w-14 rounded-xl bg-pride-blue/10 text-pride-blue flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-7 w-7" />
                  </div>
                  <CardTitle>Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Join the conversation inside the platform</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/signup">Join Now</Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/dashboard">Open Dashboard</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Region + Address */}
              <Card variant="elevated" className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <CardHeader>
                  <div className="h-14 w-14 rounded-xl bg-pride-green/10 text-pride-green flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-7 w-7" />
                  </div>
                  <CardTitle>
                    {meta.emoji} {countryName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2 text-sm">Primary correspondence address (EU HQ)</p>
                  <p className="text-muted-foreground text-sm whitespace-pre-line">{EU_HQ_ADDRESS}</p>

                  {/* Small, explicit note so we don't imply a local office everywhere */}
                  <p className="text-xs text-muted-foreground mt-4">
                    You’re viewing the site in: <span className="font-medium">{meta.label}</span>
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Small footer note */}
            <div className="max-w-3xl mx-auto mt-12 text-center text-sm text-muted-foreground animate-fade-in">
              For legal or privacy requests, email{' '}
              <a href="mailto:info@pridesocial.org" className="text-primary hover:underline">
                info@pridesocial.org
              </a>{' '}
              and include “Legal” or “Privacy” in the subject line.
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ContactPage;
