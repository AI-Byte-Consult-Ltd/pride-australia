import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Target,
  Users,
  Globe,
  Heart,
  GraduationCap,
  Lightbulb,
  Eye,
  Coins,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const GoalsPage = () => {
  const socialCommunityGoals = [
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Build a respectful, inclusive LGBTQ+ digital community',
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: 'Support local and international LGBTQ+ initiatives',
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Create bridges between online communities and offline action',
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: 'Encourage participation, creativity, and collaboration',
    },
  ];

  const educationalGoals = [
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: 'Provide access to modern digital and creative skills',
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: 'Introduce technology as a tool for empowerment, not control',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Support learning in media, digital identity, and community leadership',
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: 'Experiment with new formats of community-driven education',
    },
  ];

  const transparencyGoals = [
    {
      icon: <Eye className="h-6 w-6" />,
      title: 'Be open about costs, decisions, and priorities',
    },
    {
      icon: <Coins className="h-6 w-6" />,
      title: 'Allow supporters to see exactly where funds are used',
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: 'Enable direct participation in sustaining the ecosystem',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Core Goals | Pride Social Network & Pride Lab Foundation</title>
        <meta
          name="description"
          content="Explore the shared vision and core goals of Pride Social Network and Pride Lab Foundation — social, educational, and transparency goals for the LGBTQ+ community."
        />
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
                Core <span className="gradient-pride-text">Goals</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                A shared vision driving both Pride Social Network and Pride Lab Foundation
              </p>
            </div>
          </div>
        </section>

        {/* Context / The Pain We Address */}
        <section className="py-16 border-b border-border">
          <div className="container">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <div className="bg-card border rounded-2xl p-8 lg:p-10 shadow-card">
                <h2 className="font-display text-2xl lg:text-3xl font-bold mb-4">
                  The challenges we are here to solve
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    LGBTQIA+ communities often rely on mainstream social platforms that were not designed for safety,
                    belonging, or long-term well-being. Harassment, targeted abuse, and toxic engagement patterns can make
                    people feel unsafe or invisible. At the same time, community initiatives and creators often struggle
                    to find sustainable support, visibility, and trusted infrastructure for real-world impact.
                  </p>
                  <p>
                    Pride Social Network and Pride Lab Foundation were created as one ecosystem to address both sides of
                    this problem: building a safer digital home for connection and creativity, and strengthening
                    community capacity through education, programs, and long-term support in the real world.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social & Community Goals */}
        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <Users className="h-4 w-4" />
                  Social & Community
                </div>
                <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">Social & Community Goals</h2>
                <p className="text-lg text-muted-foreground">
                  Building a safer, more meaningful space for connection — and linking digital life to real-world action.
                </p>
              </div>

              <div className="bg-muted/30 border rounded-2xl p-8 lg:p-10 mb-8 animate-fade-in" style={{ animationDelay: '0.05s' }}>
                <h3 className="font-display text-xl font-semibold mb-3">What this solves for the community</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Many LGBTQIA+ people and creators experience instability across mainstream platforms: content can be
                  deprioritized or removed without clarity, harassment can be inconsistent to address, and community
                  spaces often become driven by outrage and attention-based algorithms. Our goal is to design a platform
                  where community well-being and trust are core product requirements — not an afterthought.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {socialCommunityGoals.map((goal, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-6 rounded-2xl bg-card border shadow-card animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      {goal.icon}
                    </div>
                    <p className="font-medium text-lg leading-relaxed pt-2">{goal.title}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 bg-card border rounded-2xl p-8 shadow-card animate-fade-in" style={{ animationDelay: '0.25s' }}>
                <h3 className="font-display text-xl font-semibold mb-3">How we approach it</h3>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    Pride Social Network is built to prioritize safety, identity, and participation. We aim to reduce the
                    incentive for toxic engagement and create a culture where creators, activists, and everyday members
                    can share work and build connections without fear.
                  </p>
                  <p>
                    Pride Lab Foundation complements this by supporting real-world community initiatives and building
                    partnerships that strengthen LGBTQIA+ communities beyond the digital platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Educational & Innovation Goals */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <GraduationCap className="h-4 w-4" />
                  Education & Innovation
                </div>
                <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">Educational & Innovation Goals</h2>
                <p className="text-lg text-muted-foreground">
                  Making skills, learning, and responsible innovation accessible — especially for creators and emerging
                  community leaders.
                </p>
              </div>

              <div className="bg-card border rounded-2xl p-8 lg:p-10 mb-8 shadow-card animate-fade-in" style={{ animationDelay: '0.05s' }}>
                <h3 className="font-display text-xl font-semibold mb-3">What this solves for the community</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Many people face barriers to education, digital skills, and professional opportunity — and these
                  barriers can be higher for LGBTQIA+ individuals depending on local conditions, safety, and access to
                  support networks. We want to make learning more community-driven and practical, and to explore how
                  technology (including AI) can support people with guidance, training, and access to resources.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {educationalGoals.map((goal, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-6 rounded-2xl bg-card border shadow-card animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="h-12 w-12 rounded-xl gradient-pride text-primary-foreground flex items-center justify-center shrink-0">
                      {goal.icon}
                    </div>
                    <p className="font-medium text-lg leading-relaxed pt-2">{goal.title}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 bg-card border rounded-2xl p-8 shadow-card animate-fade-in" style={{ animationDelay: '0.25s' }}>
                <h3 className="font-display text-xl font-semibold mb-3">How we approach it</h3>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    Pride Social Network is a place to share creative work, learn from each other, and participate in new
                    community-led formats. Over time, our AI research will help us introduce supportive digital
                    companions for learning, guidance, and meaningful conversation — designed to support people, not
                    replace them.
                  </p>
                  <p>
                    Pride Lab Foundation is designed to help structure real programs and partnerships, starting in
                    Australia, and expanding internationally as the ecosystem grows.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Transparency & Trust Goals */}
        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <Eye className="h-4 w-4" />
                  Transparency & Trust
                </div>
                <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">Transparency & Trust Goals</h2>
                <p className="text-lg text-muted-foreground">
                  Building trust through openness — and making community support visible, measurable, and accountable.
                </p>
              </div>

              <div className="bg-muted/30 border rounded-2xl p-8 lg:p-10 mb-8 animate-fade-in" style={{ animationDelay: '0.05s' }}>
                <h3 className="font-display text-xl font-semibold mb-3">What this solves for the community</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Communities are often asked to “support” projects without clarity: where funds go, what decisions are
                  being made, and what the priorities are. We believe trust requires transparency — especially in an
                  ecosystem built for community well-being.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {transparencyGoals.map((goal, index) => (
                  <div
                    key={index}
                    className="text-center p-8 rounded-2xl bg-muted/50 border animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="h-14 w-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                      {goal.icon}
                    </div>
                    <p className="font-medium text-lg leading-relaxed">{goal.title}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 bg-card border rounded-2xl p-8 shadow-card animate-fade-in" style={{ animationDelay: '0.25s' }}>
                <h3 className="font-display text-xl font-semibold mb-3">How we approach it</h3>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    We aim to communicate priorities clearly, publish meaningful updates, and provide transparency around
                    development costs and operational steps — especially during the Foundation registration and early
                    platform build.
                  </p>
                  <p>
                    Supporters and community members should be able to understand what their support enables, how the
                    ecosystem is sustained, and how decisions are made as the community grows.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">See How We're Getting There</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our roadmap shows the concrete steps we’re taking to achieve these goals across both Pride Social Network
                and Pride Lab Foundation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="pride" size="lg" asChild>
                  <Link to="/roadmap">
                    View Roadmap
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/transparency-and-costs">Transparency & Costs</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default GoalsPage;
