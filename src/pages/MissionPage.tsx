
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Target,
  Heart,
  Shield,
  Users,
  Globe,
  MessageCircle,
  Sparkles,
  Building2,
  Calendar,
  GraduationCap,
  Lightbulb,
  ArrowRight,
  MapPin,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const MissionPage = () => {
  const socialNetworkValues = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Safety is designed-in (not added later)',
      subtitle: 'Clear rules, anti-abuse protection, and community-first moderation principles.',
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: 'Voices are heard without fear',
      subtitle: 'Healthy conversations, replies that feel human, and tools that support community.',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Community comes before algorithms',
      subtitle: 'We optimize for long-term wellbeing, not engagement-at-all-costs.',
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: 'Technology supports people, not replaces them',
      subtitle: 'We build tools that help people connect, learn, and grow — with boundaries and care.',
    },
  ];

  const foundationsRoadmap = [
    {
      icon: <Building2 className="h-6 w-6" />,
      title: 'Pride Lab Foundation Italy (planned)',
      description:
        'EU-based foundation to support community programs, partnerships, and responsible impact initiatives aligned with Pride Social Network.',
      badge: 'EU priority',
      badgeColor: 'bg-green-500/10 text-green-600',
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: 'Pride Lab Foundation Australia (near-term)',
      description:
        'Registration and operations are planned for the foreseeable future as resources allow. Australia remains important — now positioned as a secondary track to EU execution.',
      badge: 'Near-term',
      badgeColor: 'bg-blue-500/10 text-blue-600',
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: 'United States (postponed)',
      description:
        'Foundation work in the United States is postponed for an indefinite period due to the current operating environment and broader uncertainty.',
      badge: 'Postponed',
      badgeColor: 'bg-muted text-muted-foreground',
    },
  ];

  const foundationFocus = [
    {
      icon: <Calendar className="h-6 w-6" />,
      title: 'Community events and safe spaces',
      description: 'Creating opportunities for connection, celebration, and peer support.',
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: 'Education and skills-based programs',
      description: 'Workshops, mentoring, labs, and learning opportunities for growth and resilience.',
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: 'Support for creators and local initiatives',
      description: 'Structured support and visibility for grassroots projects and community builders.',
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: 'Responsible technology for social good',
      description: 'Innovation with transparency, ethics, and practical safeguards.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Our Mission | Pride Social Network</title>
        <meta
          name="description"
          content="Learn the mission of Pride Social Network: an EU-first LGBTQIA+ social platform built for safety, belonging, and real community impact — Made in EU for the World."
        />
        <link rel="canonical" href="https://pridesocial.org/mission" />
      </Helmet>

      <Layout>
        {/* Hero */}
        <section className="py-20 lg:py-28 gradient-hero">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-pride mb-6">
                <Target className="h-8 w-8 text-primary-foreground" />
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Our <span className="gradient-pride-text">Mission</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Pride Social Network is an LGBTQIA+ social platform built with an EU-first approach and a global purpose.
                <br />
                <span className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-muted/60 border text-sm">
                  <span className="font-medium">Made in EU</span> <span className="text-base">🇪🇺</span>
                  <span className="text-muted-foreground">for the World</span> <span className="text-base">🗺️</span>
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Mission narrative + EU HQ */}
        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Left: Core mission */}
                <div className="animate-fade-in">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Heart className="h-7 w-7 text-primary" fill="currentColor" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-primary">Mission of</span>
                      <h2 className="font-display text-2xl lg:text-3xl font-bold">Pride Social Network</h2>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Our mission is to build a safer, more human-centered social network for LGBTQIA+ people, creators,
                      and allies — a place where belonging matters, identity is respected, and community is not treated as
                      a product.
                    </p>

                    <p className="text-muted-foreground leading-relaxed">
                      Pride Social Network is built and operated with headquarters in the European Union. This “EU-first”
                      approach means we prioritize strong privacy and safety principles, transparent product decisions,
                      and responsible expansion — while remaining open to a worldwide community.
                    </p>

                    <div className="p-6 rounded-xl bg-muted/50 border">
                      <h3 className="font-display font-semibold mb-4">We’re building a platform where:</h3>
                      <ul className="space-y-4">
                        {socialNetworkValues.map((value, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                              {value.icon}
                            </div>
                            <div>
                              <span className="font-medium block">{value.title}</span>
                              {value.subtitle && (
                                <span className="text-sm text-muted-foreground">{value.subtitle}</span>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      Over time, we will introduce supportive technology (including responsible AI features) to improve
                      learning, discovery, and safety workflows. The goal is simple: help people connect meaningfully and
                      reduce harm — with clear boundaries and transparency.
                    </p>
                  </div>
                </div>

                {/* Right: HQ + roadmap context */}
                <div className="animate-fade-in" style={{ animationDelay: '0.15s' }}>
                  <div className="bg-card border rounded-2xl p-8 shadow-card">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl gradient-pride flex items-center justify-center shrink-0">
                        <Globe className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-semibold mb-2">EU-first, Worldwide by design</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          We’re building an ecosystem that can expand responsibly across regions. The platform is open to
                          a global audience, while foundations (where created) support real-world programs locally.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-4">
                      <div className="p-4 rounded-xl bg-muted/40 border">
                        <div className="flex items-center gap-3 mb-2">
                          <MapPin className="h-5 w-5 text-primary" />
                          <span className="font-medium">Headquarters</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          European Union (EU-first policies and product decisions)
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-muted/40 border">
                        <div className="flex items-center gap-3 mb-2">
                          <Users className="h-5 w-5 text-primary" />
                          <span className="font-medium">Community reach</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Worldwide access — with region-aware safeguards and compliance where required.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t">
                      <p className="text-sm text-muted-foreground">
                        Want to see what’s already implemented and what’s next? Explore our roadmap.
                      </p>
                      <div className="mt-4">
                        <Button variant="outline" size="lg" asChild className="w-full">
                          <Link to="/roadmap" className="justify-center">
                            View Roadmap
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Foundations roadmap (Italy, AU, US postponed) */}
              <div className="mt-12 animate-fade-in" style={{ animationDelay: '0.25s' }}>
                <div className="text-center mb-10">
                  <h2 className="font-display text-3xl lg:text-4xl font-bold mb-3">Real-world impact layer</h2>
                  <p className="text-lg text-muted-foreground">
                    Foundations (when established) enable community programs beyond the platform.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {foundationsRoadmap.map((item, index) => (
                    <div
                      key={index}
                      className="p-7 rounded-2xl bg-card border shadow-card transition-all duration-300 hover:shadow-elevated"
                    >
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                          {item.icon}
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 max-w-4xl mx-auto p-6 rounded-2xl bg-muted/40 border">
                  <p className="text-muted-foreground leading-relaxed">
                    Pride Social Network is the digital platform. Foundations are separate legal entities (where created)
                    intended to support real-world programs such as events, education, and structured community support.
                    They do not change your relationship with the platform unless explicitly stated in product notices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Foundation Focus (what it funds / does) */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-pride mb-6">
                  <Building2 className="h-8 w-8 text-primary-foreground" />
                </div>
                <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">What foundations enable</h2>
                <p className="text-lg text-muted-foreground">
                  Structured programs that strengthen safety, dignity, and opportunity beyond the screen.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {foundationFocus.map((item, index) => (
                  <div
                    key={index}
                    className="p-7 rounded-2xl bg-card border shadow-card animate-fade-in"
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl gradient-pride flex items-center justify-center shrink-0">
                        <span className="text-primary-foreground">{item.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '0.25s' }}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="pride" size="lg" asChild>
                    <Link to="/signup">
                      Join Pride Social
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/support">Support the Platform</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Unified vision */}
        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-pride mb-6">
                <Sparkles className="h-8 w-8 text-primary-foreground" />
              </div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6">One ecosystem, one purpose</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Pride Social Network connects people with a safer digital experience. Foundations (where created) enable
                real-world programs that strengthen community resilience. Together, we aim to build an ecosystem where
                LGBTQIA+ people can connect, learn, create, and thrive — locally and worldwide.
              </p>
              <Button variant="outline" size="lg" asChild>
                <Link to="/about">
                  Learn how it’s connected
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default MissionPage;
