import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Mail, MessageCircle, MapPin } from 'lucide-react';
import { useJurisdiction } from '@/contexts/JurisdictionContext';

const ContactPage = () => {
  const { jurisdiction, countryName, countryEmoji } = useJurisdiction();

  const contactInfo = {
    AU: {
      address: 'PRIDE Lab Foundation Australia Ltd.\nLevel 10, 123 Pride Street\nSydney, NSW 2000\nAustralia',
    },
    US: {
      address: 'PRIDE Lab Foundation USA Inc.\n100 Rainbow Avenue, Suite 500\nSan Francisco, CA 94102\nUnited States',
    },
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Pride Social Network</title>
        <meta name="description" content="Get in touch with PRIDE Lab Foundation. We're here to help with any questions about Pride Social Network." />
      </Helmet>

      <Layout>
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
              <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
                Get in Touch
              </h1>
              <p className="text-lg text-muted-foreground">
                Have questions? We'd love to hear from you. Send us a message 
                and we'll respond as soon as possible.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card variant="elevated" className="text-center animate-fade-in">
                <CardHeader>
                  <div className="h-14 w-14 rounded-xl bg-pride-pink/10 text-pride-pink flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-7 w-7" />
                  </div>
                  <CardTitle>Email Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    For general inquiries and support
                  </p>
                  <a 
                    href="mailto:info@pridesocial.org" 
                    className="text-primary hover:underline font-medium"
                  >
                    info@pridesocial.org
                  </a>
                </CardContent>
              </Card>

              <Card variant="elevated" className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <CardHeader>
                  <div className="h-14 w-14 rounded-xl bg-pride-blue/10 text-pride-blue flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-7 w-7" />
                  </div>
                  <CardTitle>Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Join our community discussions
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/signup">Join Now</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card variant="elevated" className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <CardHeader>
                  <div className="h-14 w-14 rounded-xl bg-pride-green/10 text-pride-green flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-7 w-7" />
                  </div>
                  <CardTitle>{countryEmoji} {countryName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm whitespace-pre-line">
                    {contactInfo[jurisdiction].address}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ContactPage;
