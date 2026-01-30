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
  Shield,
  Smartphone,
  Building2,
  BadgeCheck,
  Bell,
  Hash,
  Image as ImageIcon,
  Video,
  Mic,
  Store,
  Map as MapIcon,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const GoalsPage = () => {
  const siteUrl = 'https://pridesocial.org';

  // “Big network” style: goals framed like a scaled platform.
  const platformGoals = [
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Build a safe, high-trust LGBTQIA+ public square — at global scale',
      description:
        'Design for dignity, safety, and belonging first: consistent enforcement, predictable rules, and a culture that rewards constructive participation — not outrage.',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Deliver world-class safety, anti-abuse, and moderation infrastructure',
      description:
        'Invest in prevention (rate limits, integrity controls), detection (signals, pattern analysis), and response (tools, workflows, appeals) that scale to millions of daily interactions.',
    },
    {
      icon: <Hash className="h-6 w-6" />,
      title: 'Create discovery that serves people, not manipulation',
      description:
        'Build topic-based feeds, healthy recommendations, and community discovery with transparency and user controls — reducing harmful amplification loops.',
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: 'Ship core social features to “global platform” maturity',
      description:
        'Enhance posts, replies, mentions, Echo (reposts), link support, notifications, groups, and media formats with reliability and performance standards expected from top-tier networks.',
    },
  ];

  const productGoals = [
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: 'Launch Pride Social Network mobile apps: iOS & Android',
      description:
        'Native-quality experience, push notifications, safer onboarding, and fast posting — designed for creators and community members who live on mobile.',
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: 'Build a modern notifications and engagement layer',
      description:
        'Real-time alerts for replies, mentions, likes, Echo activity, and group updates — with granular settings and safety filters.',
    },
    {
      icon: <ImageIcon className="h-6 w-6" />,
      title: 'Support rich media: image, video, and audio posts',
      description:
        'Enable community storytelling with safe media handling, clear policies, and tooling that supports creators without compromising safety.',
    },
    {
      icon: <MapIcon className="h-6 w-6" />,
      title: 'Connect people locally with the Community Map',
      description:
        'Help members find verified-friendly spaces and services, while maintaining privacy protections and quality standards for listings.',
    },
    {
      icon: <Store className="h-6 w-6" />,
      title: 'Develop a creator-friendly marketplace and merch layer',
      description:
        'Refine marketplace rules, reduce friction, and enable sustainable ecosystem support through ethical commerce and official merchandise.',
    },
    {
      icon: <BadgeCheck className="h-6 w-6" />,
      title: 'Introduce clear supporter identity and recognition',
      description:
        'Verified supporter badges and statuses (Early Supporter, Founding Member, VIP Supporter) with transparent criteria and visible impact.',
    },
  ];

  const educationInnovationGoals = [
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: 'Make learning and skill-building a core community capability',
      description:
        'Create accessible educational paths and community-driven learning formats that support creators, activists, and emerging leaders.',
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: 'Use AI responsibly to support people (not replace them)',
      description:
        'Develop supportive companions for guidance and education, plus AI-assisted safety signals — with clear boundaries, transparency, and human oversight.',
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: 'Strengthen creator empowerment and community self-sustainability',
      description:
        'Give creators a stable place to grow: better visibility controls, predictable rules, and structured support pathways through the ecosystem.',
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Scale internationally while respecting local realities',
      description:
        'Expand responsibly with region-aware policy, safety operations, and legal compliance — without weakening core protections.',
    },
  ];

  const transparencyGoals = [
    {
      icon: <Eye className="h-6 w-6" />,
      title: 'Operate with clarity: decisions, priorities, versions, and updates',
      description:
        'Keep governance and product direction readable to the community: public updates, change notes, and clear rationale for major decisions.',
    },
    {
      icon: <Coins className="h-6 w-6" />,
      title: 'Maintain visible cost tracking and support impact',
      description:
        'Show what community support enables (hosting, tools, development, legal steps) and keep cost breakdowns understandable and current.',
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: 'Build an integrity-first participation economy',
      description:
        'Evolve PRIDE Coins / PRIDE Units rules to reward healthy participation, protect against abuse, and keep incentives aligned with community well-being.',
    },
  ];

  const foundationGoals = [
    {
      icon: <Building2 className="h-6 w-6" />,
      title: 'Primary: register Pride Lab Foundation Italy (EU HQ initiative)',
      description:
        'Italy is the first priority for the Foundation track — to support EU-based programs, partnerships, and community initiatives aligned with Pride Social Network.',
      status: 'Primary',
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: 'Secondary: proceed with Pride Lab Foundation Australia when ready',
      description:
        'Australia remains on the roadmap, but moved to a secondary timeline based on resources and current operational priorities.',
      status: 'Secondary',
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: 'United States foundation: postponed (indefinite timeline)',
      description:
        'Due to the current EU–US environment and operational uncertainty, the U.S. foundation registration is postponed until conditions are clearer.',
      status: 'Postponed',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Core Goals | Pride Social Network & Pride Lab Foundation</title>
        <meta
          name="description"
          content="Explore the core goals of Pride Social Network and Pride Lab Foundation — EU-first, made in EU for the world, with a roadmap built for global scale."
        />
        <link rel="canonical" href={`${siteUrl}/goals`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Core Goals | Pride Social Network & Pride Lab Foundation" />
        <meta
          property="og:description"
          content="EU-first goals, global platform roadmap, mobile apps, safety, creator support, transparency, and Foundation priorities (Italy first)."
        />
        <meta property="og:url" content={`${siteUrl}/goals`} />
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
                EU-first by design. Global by mission. <span className="font-medium">Made in EU for the world</span> 🇪🇺🌍
              </p>
            </div>
          </div>
        </section>

        {/* Context */}
        <section className="py-16 border-b border-border">
          <div className="container">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <div className="bg-card border rounded-2xl p-8 lg:p-10 shadow-card">
                <h2 className="font-display text-2xl lg:text-3xl font-bold mb-4">
                  How we set priorities in 2026
                </h2>

                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Pride Social Network is operated by a European company and is built with an <strong>EU-first</strong>{' '}
                    approach to safety, privacy, and platform governance. Our headquarters and primary operating focus are
                    in the <strong>European Union</strong>.
                  </p>

                  <p>
                    On the Foundation track, our priorities have been updated:
                    <strong> Italy is first</strong>, <strong>Australia is secondary</strong>, and the{' '}
                    <strong>United States is postponed on an indefinite timeline</strong> due to the current environment.
                  </p>

                  <p>
                    These goals are written as if the platform is operating at global scale — because that is the bar we
                    hold ourselves to: reliability, safety, and product quality suitable for hundreds of millions of
                    users.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Goals */}
        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <Globe className="h-4 w-4" />
                  Platform at Global Scale
                </div>
                <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">Platform Goals</h2>
                <p className="text-lg text-muted-foreground">
                  The engineering, safety, and product standards expected from a top-tier social network.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {platformGoals.map((goal, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-6 rounded-2xl bg-card border shadow-card animate-fade-in"
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      {goal.icon}
                    </div>
                    <div className="pt-1">
                      <p className="font-medium text-lg leading-relaxed">{goal.title}</p>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{goal.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Product & Roadmap Goals */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <CheckCircle className="h-4 w-4" />
                  Roadmap & Product Expansion
                </div>
                <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">Product Goals</h2>
                <p className="text-lg text-muted-foreground">
                  Key roadmap deliverables — including mobile apps — implemented with platform-grade reliability.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {productGoals.map((goal, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-6 rounded-2xl bg-card border shadow-card animate-fade-in"
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    <div className="h-12 w-12 rounded-xl gradient-pride text-primary-foreground flex items-center justify-center shrink-0">
                      {goal.icon}
                    </div>
                    <div className="pt-1">
                      <p className="font-medium text-lg leading-relaxed">{goal.title}</p>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{goal.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-8 rounded-2xl bg-card border shadow-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h3 className="font-display text-xl font-semibold mb-3">Media formats roadmap note</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Image <ImageIcon className="inline h-4 w-4 mx-1" />, video <Video className="inline h-4 w-4 mx-1" /> and
                  audio <Mic className="inline h-4 w-4 mx-1" /> capabilities are planned with safety and consent
                  protections first — so creators can share, and communities can thrive without compromising well-being.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Education & Innovation */}
        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <GraduationCap className="h-4 w-4" />
                  Education & Innovation
                </div>
                <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">Education & Innovation Goals</h2>
                <p className="text-lg text-muted-foreground">
                  Responsible innovation that expands access to skills, support, and opportunity.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {educationInnovationGoals.map((goal, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-6 rounded-2xl bg-card border shadow-card animate-fade-in"
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      {goal.icon}
                    </div>
                    <div className="pt-1">
                      <p className="font-medium text-lg leading-relaxed">{goal.title}</p>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{goal.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 bg-muted/30 border rounded-2xl p-8 lg:p-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h3 className="font-display text-xl font-semibold mb-3">EU-first principle</h3>
                <p className="text-muted-foreground leading-relaxed">
                  “Made in EU for the world” means we start with EU-grade safety, transparency, and privacy expectations —
                  and scale globally without weakening those foundations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Transparency */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <Eye className="h-4 w-4" />
                  Transparency & Trust
                </div>
                <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">Transparency Goals</h2>
                <p className="text-lg text-muted-foreground">
                  Trust is infrastructure. We treat transparency as a product and governance requirement.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {transparencyGoals.map((goal, index) => (
                  <div
                    key={index}
                    className="text-center p-8 rounded-2xl bg-card border shadow-card animate-fade-in"
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    <div className="h-14 w-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                      {goal.icon}
                    </div>
                    <p className="font-medium text-lg leading-relaxed">{goal.title}</p>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{goal.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Foundation Priorities */}
        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <Building2 className="h-4 w-4" />
                  Foundation Priorities
                </div>
                <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">Pride Lab Foundation Goals</h2>
                <p className="text-lg text-muted-foreground">
                  Real-world programs and partnerships — aligned with an EU-first operating model.
                </p>
              </div>

              <div className="space-y-5">
                {foundationGoals.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-6 rounded-2xl bg-card border shadow-card animate-fade-in"
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    <div className="h-12 w-12 rounded-xl gradient-pride text-primary-foreground flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-1 pt-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <p className="font-medium text-lg leading-relaxed">{item.title}</p>
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${
                            item.status === 'Primary'
                              ? 'bg-green-500/10 text-green-600'
                              : item.status === 'Secondary'
                              ? 'bg-blue-500/10 text-blue-600'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-8 rounded-2xl bg-muted/30 border animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h3 className="font-display text-xl font-semibold mb-3">Why this sequencing matters</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The platform can grow globally as a digital product, but real-world programs require stable legal and
                  operational footing. Italy-first aligns the Foundation work with the EU headquarters and the platform’s
                  EU-first governance model — while keeping Australia on the roadmap and pausing the U.S. track until the
                  environment is clearer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">See the Execution Plan</h2>
              <p className="text-lg text-muted-foreground mb-8">
                These goals map directly to our roadmap: platform features, mobile apps, safety systems, transparency, and
                Foundation priorities.
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
