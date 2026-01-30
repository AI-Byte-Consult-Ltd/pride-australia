import { Helmet } from 'react-helmet-async';
import { Heart, Shield, Eye, Globe, Users, Sparkles, Building2, MapPin, Flag } from 'lucide-react';
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
      title: 'Transparency by Design',
      description:
        'Trust requires clarity. We aim to be open about how we operate, how decisions are made, and what our priorities are — especially as the platform and Foundation work in parallel. When we make changes, we explain why, publish updates when possible, and invite feedback to keep the ecosystem accountable to the community it serves.',
      color: 'pride-yellow',
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: 'EU Headquarters, Responsible Governance',
      description:
        'Our operational headquarters are in the European Union. That means our governance approach is aligned with EU standards for privacy, accountability, and responsible platform development. We design systems that can scale globally while staying grounded in strong governance principles.',
      color: 'pride-green',
    },
    {
      icon: <Flag className="h-8 w-8" />,
      title: 'Italy as the Foundation Anchor',
      description:
        'Pride Lab Foundation Italy is planned as a key real-world anchor for the ecosystem. It supports community programs, partnerships, and long-term initiatives — while Pride Social Network delivers the digital layer where the community connects, creates, and grows.',
      color: 'pride-blue',
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Made in EU, for the World',
      description:
        'Pride is global — but contexts are local. We build an EU-based platform that can responsibly serve a worldwide community. Expansion is approached carefully: we prioritize safety, legal realities, and community readiness, rather than rushing into new jurisdictions without the right foundations.',
      color: 'pride-purple',
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Authentic Expression',
      description:
        'We want people to feel safe being real. Pride Social Network is designed to support identity, creativity, and honest self-expression — without fear of ridicule, suppression, or exploitation. We celebrate diverse voices and aim to create healthy spaces where individuals and communities can be seen and respected.',
      color: 'pride-pink',
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: 'Local Community, Real-World Support',
      description:
        'Digital communities work best when they connect to real life. The platform and the Foundation are designed to reinforce each other: the network helps people discover events, groups, and LGBTQIA+-friendly places, while the Foundation supports programs, partnerships, and community activation over time.',
      color: 'pride-orange',
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: 'Joy, Culture & Celebration',
      description:
        'Pride is resistance, but it is also joy. We create room for celebration, humor, creativity, and community wins — because positivity strengthens resilience. Our goal is to build a platform culture that supports creators, encourages connection, and makes space for uplifting moments as well as serious conversations.',
      color: 'pride-yellow',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Our Values | Pride Social Network & Pride Lab Foundation</title>
        <meta
          name="description"
          content="Discover the values guiding Pride Social Network and Pride Lab Foundation: community first, safety, transparency, EU-based governance, Italy foundation initiatives, global expansion, authentic expression, and joy."
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
                The principles that guide everything we do across Pride Social Network and Pride Lab Foundation — with EU
                headquarters and an Italy-first foundation direction.
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

              <p className="text-lg text-muted-foreground mb-6">
                These values are not slogans — they are product, policy, and governance commitments. They influence how we
                design features, how we approach moderation, how we communicate changes, and how we prioritize safety and
                well-being over short-term growth.
              </p>

              <p className="text-lg text-muted-foreground mb-6">
                Pride Social Network is the digital layer of the ecosystem. Pride Lab Foundation (with an Italy-first
                direction) is designed to support real-world programs, partnerships, and community activation. Together,
                they create a long-term structure that can scale responsibly.
              </p>

              <p className="text-lg text-muted-foreground mb-8">
                As the ecosystem evolves, we will keep refining our policies and practices with community input. That
                includes being transparent about what we’re learning, where we are improving, and where we still have
                work to do.
              </p>

              <p className="text-lg text-muted-foreground">
                If you ever feel we’re falling short of these values, we want to hear from you. Reach out to us at{' '}
                <a href="mailto:info@pridesocial.org" className="text-primary hover:underline">
                  info@pridesocial.org
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
