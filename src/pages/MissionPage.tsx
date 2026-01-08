import { Helmet } from 'react-helmet-async';
import { Target, Compass, Heart, Users, Globe, Shield } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const MissionPage = () => {
  const missionPoints = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: 'Community Empowerment',
      description: 'Building technology that empowers the LGBTQ+ community to connect, express, and thrive authentically.',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Safe Digital Spaces',
      description: 'Creating moderated, inclusive online environments free from discrimination and harassment.',
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Global Connection',
      description: 'Connecting Pride communities across Australia, the United States, and beyond.',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Amplifying Voices',
      description: 'Providing a platform where marginalized voices can be heard and celebrated.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Our Mission | PRIDE Lab Foundation</title>
        <meta name="description" content="Learn about PRIDE Lab Foundation's mission to create safe, inclusive digital spaces for the LGBTQ+ community worldwide." />
      </Helmet>

      <Layout>
        {/* Hero */}
        <section className="py-20 lg:py-28 gradient-hero">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-pride mb-6">
                <Target className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Our <span className="gradient-pride-text">Mission</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                PRIDE Lab Foundation exists to create safe, inclusive digital spaces 
                where the LGBTQ+ community can connect, express themselves, and 
                thrive without fear of discrimination or harassment.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-xl gradient-pride flex items-center justify-center">
                  <Compass className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
              <h2 className="font-display text-3xl font-bold mb-6">What We Stand For</h2>
              <p className="text-lg text-muted-foreground">
                We believe technology should bring people together, celebrate 
                diversity, and amplify marginalized voices. That's why we built 
                Pride Social Network – a platform by the community, for the community.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {missionPoints.map((point, index) => (
                <div
                  key={point.title}
                  className="p-8 rounded-2xl bg-muted/50 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="h-14 w-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    {point.icon}
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">{point.title}</h3>
                  <p className="text-muted-foreground">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h2 className="font-display text-3xl font-bold mb-6">Our Impact</h2>
              <p className="text-lg text-muted-foreground mb-8">
                As a non-profit organization, every decision we make centers on 
                community benefit. We're committed to transparency, accountability, 
                and putting the needs of the LGBTQ+ community first.
              </p>
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <p className="font-display text-4xl font-bold gradient-pride-text">2</p>
                  <p className="text-muted-foreground">Countries</p>
                </div>
                <div>
                  <p className="font-display text-4xl font-bold gradient-pride-text">100%</p>
                  <p className="text-muted-foreground">Non-Profit</p>
                </div>
                <div>
                  <p className="font-display text-4xl font-bold gradient-pride-text">∞</p>
                  <p className="text-muted-foreground">Pride</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default MissionPage;
