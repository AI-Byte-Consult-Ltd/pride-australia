import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Heart, Building2, Globe, ArrowRight, Sparkles, Target, Network } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About | Pride Social Network & Pride Lab Foundation</title>
        <meta
          name="description"
          content="Learn how Pride Social Network and Pride Lab Foundation are connected — one ecosystem, transparent structure, EU-based headquarters, and an Italy-first foundation roadmap."
        />
      </Helmet>

      <Layout>
        {/* Hero */}
        <section className="py-20 lg:py-28 gradient-hero">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-pride mb-6">
                <Network className="h-8 w-8 text-primary-foreground" />
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                How <span className="gradient-pride-text">Pride Social Network</span> and{' '}
                <span className="gradient-pride-text">Pride Lab Foundation</span> Are Connected
              </h1>

              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                One ecosystem, one mission, transparent structure — built in the European Union, designed for a global
                community.
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <div className="bg-card border rounded-2xl p-8 lg:p-12 shadow-card animate-fade-in">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="h-14 w-14 rounded-xl gradient-pride flex items-center justify-center shrink-0">
                      <Heart className="h-7 w-7 text-primary-foreground" fill="currentColor" />
                    </div>

                    <div>
                      <h2 className="font-display text-2xl font-bold mb-2">Pride Social Network</h2>
                      <p className="text-muted-foreground text-lg">
                        Pride Social Network is a community-first LGBTQIA+ social platform built to support authentic
                        connection, safe self-expression, and real conversations — without “engagement at any cost”.
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    The platform is owned and developed by a European technology company. Our operational headquarters is
                    in the European Union, and product development is executed from Europe with a global audience in mind.
                  </p>

                  <p className="text-muted-foreground leading-relaxed mt-4">
                    We previously explored an international foundation structure across multiple jurisdictions. However,
                    our priorities have changed: in the current phase, the Social Network is the primary focus, while
                    foundation registrations are approached in a measured, jurisdiction-by-jurisdiction sequence.
                  </p>

                  <p className="text-muted-foreground leading-relaxed mt-4">
                    <span className="font-medium text-foreground">Important update:</span> the registration of the
                    foundation in Australia has been moved to a secondary priority. This is not a cancellation — it’s a
                    strategic rescheduling to keep the team focused on platform stability, security, moderation, and
                    growth.
                  </p>

                  <p className="text-muted-foreground leading-relaxed mt-4">
                    In parallel, due to the current uncertainty in Europe–US relations and broader regulatory
                    unpredictability, we have decided to pause any US foundation registration on an open-ended timeline.
                    The ecosystem’s legal and operational center of gravity remains within the European Union.
                  </p>

                  <p className="text-muted-foreground leading-relaxed mt-4">
                    <span className="font-medium text-foreground">Made in EU 🇪🇺, for the World 🗺️</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Foundation Connection */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">The Foundation Connection</h2>
                <p className="text-lg text-muted-foreground">
                  One ecosystem with two roles: a digital platform that people use daily, and a foundation structure that
                  can support real-world initiatives over time.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* PSN */}
                <div
                  className="bg-card border rounded-2xl p-8 shadow-card animate-fade-in"
                  style={{ animationDelay: '0.1s' }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-semibold">Pride Social Network focuses on:</h3>
                  </div>

                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span>Community-first feed, posts, replies, and meaningful discussion</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span>Safety: moderation workflows, reporting, and anti-harassment protections</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span>EU-led product and compliance mindset (privacy, transparency, responsible growth)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span>Tools for creators and community projects (progressively enabled as features ship)</span>
                    </li>
                  </ul>
                </div>

                {/* Foundation */}
                <div
                  className="bg-card border rounded-2xl p-8 shadow-card animate-fade-in"
                  style={{ animationDelay: '0.2s' }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-xl gradient-pride flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-display text-xl font-semibold">Pride Lab Foundation focuses on:</h3>
                  </div>

                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span>Building an accountable structure for long-term community programs and partnerships</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span>Supporting initiatives beyond the screen (education, inclusion, wellbeing, local projects)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span>Creating a transparent framework for funding allocation and public reporting</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span>Developing jurisdiction-specific foundations where it makes sense and where we can operate responsibly</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Italy update */}
              <div
                className="bg-card border rounded-2xl p-8 shadow-card mt-8 animate-fade-in"
                style={{ animationDelay: '0.3s' }}
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Target className="h-6 w-6 text-primary" />
                  </div>

                  <div>
                    <h3 className="font-display text-xl font-semibold mb-2">Italy roadmap: foundation registration</h3>

                    <p className="text-muted-foreground leading-relaxed">
                      Our next foundation milestone is Italy. We plan to register a Pride Lab Foundation entity in Italy
                      to support European-first community initiatives and to provide a stable, locally grounded
                      structure for partnerships and programs.
                    </p>

                    <p className="text-muted-foreground leading-relaxed mt-3">
                      <span className="font-medium text-foreground">How it connects to Pride Social Network:</span> Pride
                      Social Network is the product layer — the platform where people connect, share, and build
                      community. The Italian Pride Lab Foundation is intended to become the real-world counterpart that
                      can support projects originating from the community: educational initiatives, events, local
                      collaborations, and long-term programs that require a dedicated foundation vehicle.
                    </p>

                    <p className="text-muted-foreground leading-relaxed mt-3">
                      This approach keeps roles clear: the platform team focuses on engineering, safety, and user
                      experience; the foundation can focus on governance, mission-aligned initiatives, and transparent
                      allocation of resources. When the foundation is operational, we can also formalize community-driven
                      initiatives that start inside the network and continue outside of it.
                    </p>
                  </div>
                </div>
              </div>

              {/* Jurisdiction decisions */}
              <div
                className="bg-card border rounded-2xl p-8 shadow-card mt-8 animate-fade-in"
                style={{ animationDelay: '0.4s' }}
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl gradient-pride flex items-center justify-center shrink-0">
                    <Globe className="h-6 w-6 text-primary-foreground" />
                  </div>

                  <div>
                    <h3 className="font-display text-xl font-semibold mb-2">Jurisdictions: what changed and why</h3>

                    <p className="text-muted-foreground leading-relaxed">
                      The ecosystem is now structured with EU headquarters as the operational base. Australia foundation
                      registration is a secondary priority and will be revisited when it best supports our roadmap and
                      operational capacity.
                    </p>

                    <p className="text-muted-foreground leading-relaxed mt-3">
                      US foundation registration has been cancelled for an undefined period due to the current
                      geopolitical and regulatory uncertainty. This is a risk management decision designed to protect the
                      project’s continuity and ensure we build on stable legal ground.
                    </p>

                    <p className="text-muted-foreground leading-relaxed mt-3">
                      Our guiding principle is simple: we expand legal structures only when it strengthens the community,
                      improves transparency, and supports long-term sustainability — without distracting from building a
                      safe, reliable social platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* In Simple Terms */}
        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">In Simple Terms</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div
                  className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border animate-fade-in"
                  style={{ animationDelay: '0.1s' }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                    <Heart className="h-8 w-8 text-primary" fill="currentColor" />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-2">Pride Social Network</h3>
                  <p className="text-lg text-muted-foreground">The digital home for the community</p>
                </div>

                <div
                  className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border animate-fade-in"
                  style={{ animationDelay: '0.2s' }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-pride mb-4">
                    <Building2 className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-2">Pride Lab Foundation</h3>
                  <p className="text-lg text-muted-foreground">A framework for real-world initiatives and partnerships</p>
                </div>
              </div>

              <div className="text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-muted border">
                  <Target className="h-5 w-5 text-primary" />
                  <span className="font-display font-semibold">One ecosystem, one mission, transparent structure</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Join Our Ecosystem</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join the platform, support the roadmap, and help shape a safer, community-first social network built from
                Europe for the world.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="pride" size="lg" asChild>
                  <Link to="/signup">
                    Join Pride Social
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button variant="outline" size="lg" asChild>
                  <Link to="/mission">Learn About Our Mission</Link>
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
