import { Helmet } from 'react-helmet-async';
import { Target, CheckCircle, Rocket, Calendar, Globe, Users, Building, Heart } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const GoalsPage = () => {
  const shortTermGoals = [
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Launch Community Platform',
      description: 'Successfully launch Pride Social Network across Australia and the United States, providing a safe digital home for LGBTQ+ individuals.',
      timeline: '2026',
    },
    {
      icon: <Building className="h-6 w-6" />,
      title: 'Establish Legal Foundations',
      description: 'Complete non-profit registration in Australia (ACNC) and United States (501(c)(3)) to ensure transparent, community-focused governance.',
      timeline: '2026',
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: 'Build Active Community',
      description: 'Grow our community to 10,000 active members who engage, support each other, and help shape the platform\'s future.',
      timeline: '2026-2027',
    },
  ];

  const longTermGoals = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Global Expansion',
      description: 'Extend our reach to LGBTQ+ communities in Europe, Asia, and beyond, adapting to local needs while maintaining our core values of safety and inclusion.',
      timeline: '2027-2030',
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: 'Sustainable Funding Model',
      description: 'Develop diverse revenue streams including ethical marketplace fees, community sponsorships, and grants to ensure long-term sustainability without compromising our values.',
      timeline: '2027-2028',
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: 'Industry Leadership',
      description: 'Become the recognized leader in LGBTQ+ digital safety, setting standards for how social platforms should protect and serve marginalized communities.',
      timeline: '2028-2030',
    },
  ];

  const impactMetrics = [
    { label: 'Safe Spaces Created', target: '1,000+', description: 'Community groups and forums' },
    { label: 'Lives Impacted', target: '100,000+', description: 'Community members supported' },
    { label: 'Events Facilitated', target: '500+', description: 'Online and in-person gatherings' },
    { label: 'Countries Reached', target: '20+', description: 'Global Pride community connections' },
  ];

  return (
    <>
      <Helmet>
        <title>Our Goals | PRIDE Lab Foundation</title>
        <meta name="description" content="Explore PRIDE Lab Foundation's strategic goals: building safe digital spaces, achieving global reach, and becoming the trusted leader in LGBTQ+ community platforms." />
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
                Our <span className="gradient-pride-text">Goals</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Strategic objectives that guide PRIDE Lab Foundation's journey toward 
                creating lasting positive change for the LGBTQ+ community worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* Short Term Goals */}
        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Calendar className="h-4 w-4" />
                2026-2027
              </div>
              <h2 className="font-display text-3xl font-bold mb-4">Short-Term Goals</h2>
              <p className="text-lg text-muted-foreground">
                Immediate priorities to establish PRIDE Lab Foundation as a trusted 
                community platform and registered non-profit organization.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {shortTermGoals.map((goal, index) => (
                <div
                  key={goal.title}
                  className="relative p-8 rounded-2xl bg-card border shadow-card transition-all duration-300 hover:shadow-elevated animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute top-4 right-4 text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {goal.timeline}
                  </div>
                  <div className="h-14 w-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    {goal.icon}
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3">{goal.title}</h3>
                  <p className="text-muted-foreground">{goal.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Long Term Goals */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Rocket className="h-4 w-4" />
                2027-2030
              </div>
              <h2 className="font-display text-3xl font-bold mb-4">Long-Term Vision</h2>
              <p className="text-lg text-muted-foreground">
                Ambitious objectives to transform PRIDE Lab Foundation into a global 
                leader in LGBTQ+ digital safety and community empowerment.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {longTermGoals.map((goal, index) => (
                <div
                  key={goal.title}
                  className="relative p-8 rounded-2xl bg-card border shadow-card transition-all duration-300 hover:shadow-elevated animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute top-4 right-4 text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {goal.timeline}
                  </div>
                  <div className="h-14 w-14 rounded-xl gradient-pride text-primary-foreground flex items-center justify-center mb-4">
                    {goal.icon}
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3">{goal.title}</h3>
                  <p className="text-muted-foreground">{goal.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Metrics */}
        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
              <h2 className="font-display text-3xl font-bold mb-4">Measuring Our Impact</h2>
              <p className="text-lg text-muted-foreground">
                Concrete targets that will demonstrate our progress toward 
                creating meaningful change for the LGBTQ+ community.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {impactMetrics.map((metric, index) => (
                <div
                  key={metric.label}
                  className="text-center p-6 rounded-2xl bg-muted/50 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <p className="font-display text-4xl font-bold gradient-pride-text mb-2">
                    {metric.target}
                  </p>
                  <p className="font-semibold mb-1">{metric.label}</p>
                  <p className="text-sm text-muted-foreground">{metric.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl gradient-pride mb-6">
                <CheckCircle className="h-6 w-6 text-primary-foreground" />
              </div>
              <h2 className="font-display text-3xl font-bold mb-4">Join Us on This Journey</h2>
              <p className="text-lg text-muted-foreground mb-8">
                These goals are ambitious, but with community support, they're achievable. 
                Whether you join our platform, volunteer your time, or spread the word, 
                you're helping us build a better future for the LGBTQ+ community.
              </p>
              <p className="text-lg text-muted-foreground">
                Together, we can create the safe, inclusive digital spaces our community deserves.
              </p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default GoalsPage;