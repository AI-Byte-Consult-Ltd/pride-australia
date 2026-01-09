import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Heart, Shield, Users, MessageCircle, Flag, Ban } from 'lucide-react';

const GuidelinesPage = () => {
  const guidelines = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: 'Be Kind & Respectful',
      description: 'Treat everyone with dignity and respect. We celebrate diversity and welcome people of all backgrounds, identities, and experiences.',
      color: 'pride-pink',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Keep It Safe',
      description: 'Do not share personal information about others without consent. Protect your own privacy and the privacy of community members.',
      color: 'pride-blue',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Foster Inclusion',
      description: 'Create a welcoming environment for all. Avoid language or behavior that excludes, marginalizes, or discriminates against others.',
      color: 'pride-purple',
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: 'Engage Constructively',
      description: 'Disagreements are natural, but always communicate respectfully. Focus on ideas rather than attacking individuals.',
      color: 'pride-green',
    },
    {
      icon: <Flag className="h-6 w-6" />,
      title: 'Report Concerns',
      description: 'If you see content that violates our guidelines, report it. Help us maintain a safe space for everyone.',
      color: 'pride-orange',
    },
    {
      icon: <Ban className="h-6 w-6" />,
      title: 'Zero Tolerance',
      description: 'Hate speech, harassment, bullying, threats, and illegal content will result in immediate account suspension.',
      color: 'pride-red',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Community Guidelines | Pride Social Network</title>
        <meta name="description" content="Our community guidelines ensure Pride Social Network remains a safe, inclusive, and joyful space for everyone." />
      </Helmet>

      <Layout>
        {/* Hero */}
        <section className="py-16 lg:py-24 gradient-hero">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
                Community Guidelines
              </h1>
              <p className="text-lg text-muted-foreground">
                These guidelines help ensure Pride Social Network remains a safe, inclusive, 
                and joyful space for our entire community.
              </p>
            </div>
          </div>
        </section>

        {/* Guidelines Grid */}
        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {guidelines.map((item, index) => (
                <Card key={item.title} variant="elevated" className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader>
                    <div className={`h-12 w-12 rounded-xl bg-${item.color}/10 text-${item.color} flex items-center justify-center mb-4`}>
                      {item.icon}
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Guidelines */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-3xl font-bold mb-8 text-center">Detailed Guidelines</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="font-display text-xl font-semibold mb-3">Prohibited Content</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Hate speech targeting race, ethnicity, gender, sexual orientation, disability, or religion</li>
                    <li>Harassment, bullying, or threats of violence</li>
                    <li>Sexually explicit content involving minors (zero tolerance)</li>
                    <li>Spam, scams, or misleading content</li>
                    <li>Impersonation of other users or public figures</li>
                    <li>Illegal content including drug sales and copyright infringement</li>
                    <li>Doxxing or sharing private information without consent</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-display text-xl font-semibold mb-3">Marketplace Guidelines</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Only list products you have the right to sell</li>
                    <li>Provide accurate descriptions and images</li>
                    <li>Honor your commitments to buyers</li>
                    <li>Do not sell prohibited items (weapons, drugs, stolen goods)</li>
                    <li>Report suspicious listings or transactions</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-display text-xl font-semibold mb-3">Enforcement</h3>
                  <p className="text-muted-foreground mb-4">
                    Violations of these guidelines may result in:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Content removal</li>
                    <li>Temporary account suspension</li>
                    <li>Permanent account ban</li>
                    <li>Reporting to law enforcement for illegal activity</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-display text-xl font-semibold mb-3">Appeals</h3>
                  <p className="text-muted-foreground">
                    If you believe your content was removed or your account was actioned in error, 
                    you may appeal by contacting{' '}
                    <a href="mailto:info@pridesocial.org" className="text-primary hover:underline">
                      info@pridesocial.org
                    </a>
                    . Appeals are reviewed within 7 business days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default GuidelinesPage;
