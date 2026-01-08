import { Helmet } from 'react-helmet-async';
import { Heart, Shield, Eye, Globe, Users, Sparkles } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const ValuesPage = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Community First',
      description: 'Every decision we make centers on what benefits our community most. We exist to serve the LGBTQ+ community, not shareholders or advertisers.',
      color: 'pride-pink',
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Safety & Inclusion',
      description: 'A zero-tolerance policy for hate, creating a space where everyone belongs. We actively moderate to ensure our platform remains safe and welcoming.',
      color: 'pride-orange',
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: 'Transparency',
      description: 'Open about our operations, finances, and decision-making processes. As a non-profit, we believe in full accountability to our community.',
      color: 'pride-yellow',
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Global Connection',
      description: 'Connecting Pride communities across borders while respecting local contexts. We celebrate both our shared identity and our beautiful diversity.',
      color: 'pride-green',
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Authentic Expression',
      description: 'Everyone should be free to express their true selves. We celebrate all identities and create space for authentic self-expression.',
      color: 'pride-blue',
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: 'Joy & Celebration',
      description: 'Pride is about joy, love, and celebration. We infuse our platform with positivity and create spaces for community celebration.',
      color: 'pride-purple',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Our Values | PRIDE Lab Foundation</title>
        <meta name="description" content="Discover the core values that guide PRIDE Lab Foundation: community first, safety, transparency, global connection, authentic expression, and joy." />
      </Helmet>

      <Layout>
        {/* Hero */}
        <section className="py-20 lg:py-28 gradient-hero">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-pride mb-6">
                <Heart className="h-8 w-8 text-primary-foreground" fill="currentColor" />
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Our <span className="gradient-pride-text">Values</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                The principles that guide everything we do at PRIDE Lab Foundation.
              </p>
            </div>
          </div>
        </section>

        {/* Values Grid */}
        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="p-8 rounded-2xl bg-card border shadow-card transition-all duration-300 hover:shadow-elevated animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`h-16 w-16 rounded-2xl bg-${value.color}/10 text-${value.color} flex items-center justify-center mb-6`}>
                    {value.icon}
                  </div>
                  <h3 className="font-display text-2xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Living Our Values */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h2 className="font-display text-3xl font-bold mb-6">Living Our Values</h2>
              <p className="text-lg text-muted-foreground mb-8">
                These aren't just words on a page – they're commitments we make every day. 
                From how we build our platform to how we interact with our community, 
                these values guide every decision we make.
              </p>
              <p className="text-lg text-muted-foreground">
                If you ever feel we're falling short of these values, we want to hear from you. 
                Reach out to us at <a href="mailto:hello@pridesocial.network" className="text-primary hover:underline">hello@pridesocial.network</a>.
              </p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ValuesPage;
