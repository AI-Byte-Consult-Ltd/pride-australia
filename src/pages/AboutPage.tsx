import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Heart, Target, Eye, Users, Globe, Shield } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useJurisdiction } from '@/contexts/JurisdictionContext';

const AboutPage = () => {
  const { jurisdiction, countryName, countryEmoji } = useJurisdiction();

  const foundationInfo = {
    AU: {
      name: 'PRIDE Lab Foundation Australia Ltd.',
      registration: 'ABN: soon',
      regulator: 'Australian Charities and Not-for-profits Commission (ACNC)',
    },
    US: {
      name: 'PRIDE Lab Foundation USA Inc.',
      registration: 'EIN: soon',
      regulator: 'Internal Revenue Service (501(c)(3))',
    },
  };

  const values = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: 'Community First',
      description: 'Every decision we make centers on what benefits our community most.',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Safety & Inclusion',
      description: 'A zero-tolerance policy for hate, creating a space where everyone belongs.',
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: 'Transparency',
      description: 'Open about our operations, finances, and decision-making processes.',
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Global Connection',
      description: 'Connecting Pride communities across borders while respecting local contexts.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>About PRIDE Lab Foundation | Pride Social Network</title>
        <meta name="description" content="Learn about PRIDE Lab Foundation, a non-profit organization operating Pride Social Network in Australia and the United States." />
      </Helmet>

      <Layout>
        {/* Hero */}
        <section className="py-20 lg:py-28 gradient-hero">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                {countryEmoji} Operating in {countryName}
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                About <span className="gradient-pride-text">PRIDE Lab Foundation</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                A non-profit organization dedicated to building technology that 
                empowers, connects, and celebrates the Pride community.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section id="mission" className="py-20 lg:py-28">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-xl gradient-pride flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h2 className="font-display text-3xl font-bold">Our Mission</h2>
                </div>
                <p className="text-lg text-muted-foreground mb-6">
                  PRIDE Lab Foundation exists to create safe, inclusive digital spaces 
                  where the LGBTQ+ community can connect, express themselves, and 
                  thrive without fear of discrimination or harassment.
                </p>
                <p className="text-lg text-muted-foreground">
                  We believe technology should bring people together, celebrate 
                  diversity, and amplify marginalized voices. That's why we built 
                  Pride Social Network – a platform by the community, for the community.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <div 
                    key={value.title}
                    className="p-6 rounded-2xl bg-muted/50 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                      {value.icon}
                    </div>
                    <h3 className="font-display font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Transparency */}
        <section id="transparency" className="py-20 lg:py-28 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                Transparency & Trust
              </h2>
              <p className="text-lg text-muted-foreground">
                As a non-profit, we're committed to full transparency about how we operate.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="bg-card rounded-2xl border shadow-card p-8 animate-fade-in">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-14 w-14 rounded-xl gradient-pride flex items-center justify-center">
                    <Users className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold">
                      {foundationInfo[jurisdiction].name}
                    </h3>
                    <p className="text-muted-foreground">
                      {foundationInfo[jurisdiction].registration}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Registered with:</strong>{' '}
                    {foundationInfo[jurisdiction].regulator}
                  </p>
                  <p>
                    <strong className="text-foreground">Non-Profit Status:</strong>{' '}
                    PRIDE Lab Foundation is a registered charity and non-profit organization. 
                    All revenue goes directly toward platform development and community programs.
                  </p>
                  <p>
                    <strong className="text-foreground">Governance:</strong>{' '}
                    Overseen by a diverse board of directors with representatives 
                    from the LGBTQ+ community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center animate-fade-in">
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                Join Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Whether you join as a member or support us financially, 
                you're helping build something meaningful for the Pride community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="pride" size="lg" asChild>
                  <Link to="/signup">Join Pride Social</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/support">Become a Supporter</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default AboutPage;
