import { Helmet } from 'react-helmet-async';
import { Heart, Shield, Eye, Globe, Users, Sparkles } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const ValuesPage = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Community First',
      description:
        'We build for people, not for engagement metrics. Our priorities are shaped by the needs of LGBTQIA+ members, creators, and allies — and by the long-term health of the community. That means listening early, iterating publicly, and choosing well-being over growth-at-all-costs.',
      color: 'pride-pink',
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Safety & Inclusion',
      description:
        'Safety is not a feature — it is the foundation. We take a clear, zero-tolerance approach to hate, harassment, and targeted abuse, while designing spaces that are welcoming to diverse identities and lived experiences. Inclusion also means accessibility, thoughtful moderation, and continuous improvement as the community evolves.',
      color: 'pride-orange',
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: 'Transparency',
      description:
        'Trust requires clarity. We aim to be open about how we operate, how decisions are made, and what our priorities are — especially as the platform and Foundation grow. When we make changes, we explain why, and we invite feedback to keep the ecosystem accountable to the community it serves.',
      color: 'pride-yellow',
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Global Connection',
      description:
        'Pride is global — but contexts are local. We work to connect people across borders while respecting differences in culture, safety, and legal realities. Our goal is to build an ecosystem that can expand responsibly, supporting communities in Australia first and then broader regions as partnerships and readiness grow.',
      color: 'pride-green',
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Authentic Expression',
      description:
        'We want people to feel safe being real. Pride Social Network is designed to support identity, creativity, and honest self-expression — without fear of ridicule, suppression, or exploitation. We celebrate diverse voices and aim to create healthy spaces where individuals and communities can be seen and respected.',
      color: 'pride-blue',
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: 'Joy & Celebration',
      description:
        'Pride is resistance, but it is also joy. We create room for celebration, humor, creativity, and community wins — because positivity strengthens resilience. Our goal is to build a platform culture that encourages connection, supports creators, and makes space for uplifting moments as well as serious conversations.',
      color: 'pride-purple',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Our Values | PRIDE Lab Foundation</title>
        <meta
          name="description"
          content="Discover the core values that guide PRIDE Lab Foundation: community first, safety, transparency, global connection, authentic expression, and joy."
        />
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
                The principles that guide everything we do across Pride Social Network and PRIDE Lab Foundation.
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
                  <div
                    className={`h-16 w-16 rounded-2xl bg-${value.color}/10 text-${value.color} flex items-center justify-center mb-6`}
                  >
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
              <p className="text-lg text-muted-foreground mb-6">
                These values are not slogans — they are product and governance commitments. They influence how we design
                features, how we approach moderation, how we communicate changes, and how we prioritize safety and
                well-being over short-term growth.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                As the ecosystem evolves, we will keep refining our policies and practices with community input. That
                includes being transparent about what we’re learning, where we are improving, and where we still have
                work to do.
              </p>
              <p className="text-lg text-muted-foreground">
                If you ever feel we’re falling short of these values, we want to hear from you. Reach out to us at{' '}
                <a href="mailto:hello@pridesocial.network" className="text-primary hover:underline">
                  hello@pridesocial.network
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ValuesPage;
