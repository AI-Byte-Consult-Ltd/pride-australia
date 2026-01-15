import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Heart, Building2, Globe, Users, ArrowRight, Sparkles, Target, Network } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About | Pride Social Network & Pride Lab Foundation</title>
        <meta name="description" content="Learn how Pride Social Network and Pride Lab Foundation are connected — one ecosystem, one mission, transparent structure." />
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
                One ecosystem, one mission, transparent structure
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
                        An independent LGBTQ+ social platform created to give individuals a safe, open, and meaningful space for connection, self-expression, and community growth.
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    The platform is owned and developed by a European technology company, which is also the founder and primary sponsor of Pride Lab Foundation, a nonprofit organization currently in the process of registration in Australia.
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
                <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
                  The Foundation Connection
                </h2>
                <p className="text-lg text-muted-foreground">
                  Pride Lab Foundation exists as the ideological, community, and social extension of Pride Social Network.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-card border rounded-2xl p-8 shadow-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-semibold">While the Social Network focuses on:</h3>
                  </div>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span>Digital connection and communication</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span>Safe online spaces for self-expression</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span>Community-first platform experience</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-card border rounded-2xl p-8 shadow-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-xl gradient-pride flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-display text-xl font-semibold">The Foundation focuses on:</h3>
                  </div>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span>Real-world impact and community events</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span>Education and skills-based programs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span>Sponsorships and long-term community support</span>
                    </li>
                  </ul>
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
                <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                    <Heart className="h-8 w-8 text-primary" fill="currentColor" />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-2">Pride Social Network</h3>
                  <p className="text-lg text-muted-foreground">Digital home for the community</p>
                </div>

                <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-pride mb-4">
                    <Building2 className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-2">Pride Lab Foundation</h3>
                  <p className="text-lg text-muted-foreground">Real-world action, education, and support</p>
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
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                Join Our Ecosystem
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Whether you connect through our social platform or support the Foundation's real-world initiatives, 
                you're part of something meaningful for the LGBTQ+ community.
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
