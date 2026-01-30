
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import {
  Map,
  Heart,
  Building2,
  CheckCircle,
  Clock,
  Rocket,
  ArrowRight,
  MessageCircle,
  Link2,
  Share2,
  Hash,
  Shield,
  Award,
  FileText,
  Coins,
  Calendar,
  Users,
  Gift,
  GraduationCap,
  Globe,
  Microscope,
  Bell,
  Image as ImageIcon,
  Video,
  Mic,
  Store,
  BadgeCheck,
  UserPlus,
  Settings,
  Bookmark,
  Edit3,
  Search,
  UserCheck,
  Lock,
  Flag,
  Smartphone,
  AppWindow,
  Download,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const RoadmapPage = () => {
  // Pride Social Network — implemented
  const socialNetworkImplemented = [
    { icon: <CheckCircle className="h-5 w-5" />, title: 'Email-based user registration' },
    { icon: <CheckCircle className="h-5 w-5" />, title: 'User profiles and username change' },
    { icon: <CheckCircle className="h-5 w-5" />, title: 'Text posts' },
    { icon: <CheckCircle className="h-5 w-5" />, title: 'Likes on posts' },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: 'Replies to posts',
      subtitle: 'Members can respond and continue conversations directly under posts',
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: 'Echo (reposts)',
      subtitle: 'Share a post to amplify voices you support (our version of repost/retweet)',
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: 'User mentions (@tagging)',
      subtitle: 'Mention users inside posts and replies to bring them into the conversation',
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: 'Mention alerts',
      subtitle: 'Users can see when they are mentioned to help keep conversations connected',
    },
    { icon: <CheckCircle className="h-5 w-5" />, title: 'Community feed' },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: 'Community Map + business listing submissions',
      subtitle: 'Members can submit LGBTQIA+-friendly businesses/projects for review and publication',
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: 'Documentation updates',
      subtitle: 'Updated About, Mission, Goals, and Values pages to clarify structure and purpose',
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: 'Transparency improvements',
      subtitle: 'Added clearer transparency structure, with visible versions and ongoing updates',
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: 'Support packages (core structure)',
      subtitle: 'Support tiers with benefits and monthly PRIDE Coins positioning (evolving)',
    },
  ];

  // Pride Social Network — short-term
  const socialNetworkShortTerm = [
    {
      icon: <Bell className="h-5 w-5" />,
      title: 'Dashboard notifications',
      subtitle: 'Replies, likes, echoes, mentions — plus notification center & badges',
    },
    {
      icon: <Link2 className="h-5 w-5" />,
      title: 'Active links in posts',
      subtitle: 'Clickable URLs with safe previews and better rendering',
    },
    {
      icon: <Hash className="h-5 w-5" />,
      title: 'Trending hashtags refresh',
      subtitle: 'EU-first discovery, rotating topics, and a cleaner “Trending” widget',
    },
    {
      icon: <UserPlus className="h-5 w-5" />,
      title: 'Referral & affiliate links',
      subtitle: 'Invite new members and earn PRIDE Coins for each verified join (anti-abuse checks included)',
    },
    {
      icon: <Award className="h-5 w-5" />,
      title: 'Supporters wall (homepage + profile badges)',
      subtitle: 'Visible supporter recognition with optional links and verified tiers',
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: 'Contact form & partnership requests',
      subtitle: 'A structured way to reach the team, propose collaborations, and request support',
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: 'Mobile apps planning (iOS & Android)',
      subtitle: 'Define scope, UX patterns, and account/session parity with the web app',
    },
    {
      icon: <Download className="h-5 w-5" />,
      title: 'App distribution setup',
      subtitle: 'Preparation for App Store / Google Play policies, compliance, and release workflow',
    },
  ];

  // Pride Social Network — mid-term
  const socialNetworkMidTerm = [
    {
      icon: <Smartphone className="h-5 w-5" />,
      title: 'Mobile app (iOS)',
      subtitle: 'Native-feeling mobile experience with feed, posting, replies, mentions, notifications',
    },
    {
      icon: <Smartphone className="h-5 w-5" />,
      title: 'Mobile app (Android)',
      subtitle: 'Android-first performance and UX, matching the platform’s core functionality',
    },
    {
      icon: <AppWindow className="h-5 w-5" />,
      title: 'Mobile-first UI improvements',
      subtitle: 'Refine layouts and interactions across the entire platform for smaller screens',
    },
    {
      icon: <UserCheck className="h-5 w-5" />,
      title: 'Verified supporter badges',
      subtitle: 'Clear recognition for PRIDE Basic / Pro / Elite (and legacy tiers if needed)',
    },
    {
      icon: <Bookmark className="h-5 w-5" />,
      title: 'Bookmarks + bookmark folders',
      subtitle: 'Save posts and organize them into collections',
    },
    {
      icon: <Edit3 className="h-5 w-5" />,
      title: 'Edit posts',
      subtitle: 'Fast edits with an “edited” indicator and safe history rules',
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: 'Longer posts + creator format',
      subtitle: 'Long-form posts / articles with better readability and indexing',
    },
    {
      icon: <Search className="h-5 w-5" />,
      title: 'Advanced search',
      subtitle: 'Search posts, users, hashtags, and listings with better filtering',
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: 'Safety & moderation toolkit',
      subtitle: 'Report flows, mute/block, content warnings, and faster review tooling',
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: 'Closed and thematic groups',
      subtitle: 'Invite-only groups, interest-based groups, and community spaces',
    },
    {
      icon: <ImageIcon className="h-5 w-5" />,
      title: 'Image posts',
      subtitle: 'Upload and share images with captions and community context',
    },
    {
      icon: <Video className="h-5 w-5" />,
      title: 'Video posts',
      subtitle: 'Short and long formats, designed for creators and community updates',
    },
    {
      icon: <Mic className="h-5 w-5" />,
      title: 'Audio posts',
      subtitle: 'Voice notes and accessible storytelling formats',
    },
    {
      icon: <Store className="h-5 w-5" />,
      title: 'Marketplace evolution',
      subtitle: 'Creator-friendly rules, clearer policies, and improved discovery',
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: 'Better personalization controls',
      subtitle: 'Themes, feed controls, and “reduce noise” options (without dark patterns)',
    },
  ];

  // Pride Social Network — economy (explicit rules)
  const economyRules = [
    {
      icon: <Coins className="h-5 w-5" />,
      title: 'Earn PRIDE Coins for meaningful participation',
      subtitle: 'Clear rules and rate limits to prevent abuse, reward real engagement',
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: 'Rewards for replies and conversation',
      subtitle: 'Encouraging community-building and thoughtful discussion',
    },
    {
      icon: <Heart className="h-5 w-5" />,
      title: 'Recognition signals for content quality',
      subtitle: 'Likes and community feedback mapped to transparent rewards',
    },
    {
      icon: <UserPlus className="h-5 w-5" />,
      title: 'Referral rewards with verification',
      subtitle: 'Invite members, earn rewards only for verified joins (anti-fraud included)',
    },
  ];

  // AI layer (platform feature direction)
  const aiCompanions = [
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: 'AI education companions',
      subtitle: 'Guided learning experiences, skill-building, and curated educational paths',
    },
    {
      icon: <Heart className="h-5 w-5" />,
      title: 'Trusted conversation companions',
      subtitle: 'Supportive, human-centered interactions designed with care and boundaries',
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: 'AI-assisted safety & moderation',
      subtitle: 'Better detection of harassment patterns and faster support workflows',
    },
  ];

  /**
   * FOUNDATION: updated structure
   * - HQ in EU
   * - Italy foundation: #1
   * - Australia: #2 (secondary priority)
   * - USA: postponed indefinitely
   */
  const foundationOverview = [
    {
      icon: <Globe className="h-5 w-5" />,
      title: 'Headquarters: European Union',
      subtitle: 'Operations and product development are EU-based; global reach remains the goal',
    },
    {
      icon: <Flag className="h-5 w-5" />,
      title: 'Pride Lab Foundation Italy (priority)',
      subtitle: 'Next foundation registration focus to support EU-first initiatives and partnerships',
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: 'Pride Lab Foundation Australia (secondary priority)',
      subtitle: 'Not cancelled — rescheduled to keep focus on platform development and stability',
    },
    {
      icon: <Lock className="h-5 w-5" />,
      title: 'Pride Lab Foundation USA (postponed)',
      subtitle: 'Postponed on an open-ended timeline due to current geopolitical and regulatory uncertainty',
    },
  ];

  // Pride Lab Foundation Italy — Phase 1 (new)
  const foundationItalyPhase1 = [
    {
      icon: <Clock className="h-5 w-5" />,
      title: 'Italy registration preparation',
      subtitle: 'Legal pathway selection, local requirements review, and governance structure',
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: 'Foundation charter + reporting model',
      subtitle: 'Clear rules for transparency, public reporting, and mission-aligned activity',
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: 'EU partnerships framework',
      subtitle: 'Partner onboarding model for events, NGOs, creators, and community programs',
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      title: 'Italy/EU community programs (pilot)',
      subtitle: 'Small initiatives that can scale: events, workshops, and creator support',
    },
  ];

  // Pride Lab Foundation Australia — Phase 1 (moved to second position)
  const foundationAustraliaPhase1 = [
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: 'Documentation prepared',
      subtitle: 'Core documentation is completed and ready for the registration process',
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: 'Sydney virtual office secured',
      subtitle: 'Virtual office lease agreement signed to support formal setup and operations',
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: 'ASIC registration submission',
      subtitle: 'Secondary priority: will be filed when platform capacity and timing align',
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: 'ABN application',
      subtitle: 'After registration submission/approval',
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: 'Compliance pathway (as needed)',
      subtitle: 'Charity and tax-deductible donation steps where applicable',
    },
  ];

  // USA — Postponed block
  const foundationUSPostponed = [
    {
      icon: <Lock className="h-5 w-5" />,
      title: 'US foundation registration postponed',
      subtitle: 'Open-ended timeline. Priority remains EU HQ + platform execution',
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: 'Risk management & continuity',
      subtitle: 'We avoid jurisdictional moves that could distract from stability, safety, and delivery',
    },
  ];

  // Pride Lab Foundation — Phase 2 (shared future, regardless of jurisdiction)
  const foundationPhase2 = [
    {
      icon: <Calendar className="h-5 w-5" />,
      title: 'Community-led events (online & offline)',
      subtitle: 'Meetups, safe spaces, and creator-focused gatherings',
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: 'Sponsorship of LGBTQIA+ initiatives',
      subtitle: 'Supporting local projects and partner organizations through structured programs',
    },
    {
      icon: <Gift className="h-5 w-5" />,
      title: 'Micro-grants',
      subtitle: 'Small grants for creators, activists, and grassroots initiatives',
    },
    {
      icon: <GraduationCap className="h-5 w-5" />,
      title: 'Education grants & learning support',
      subtitle: 'Workshops, labs, and access to educational opportunities',
    },
  ];

  // Pride Lab Foundation — Phase 3
  const foundationPhase3 = [
    {
      icon: <Rocket className="h-5 w-5" />,
      title: 'Technology & creativity labs',
      subtitle: 'Programs at the intersection of AI, creative technology, culture, and social impact',
    },
    {
      icon: <Microscope className="h-5 w-5" />,
      title: 'Research & innovation support',
      subtitle: 'Exploring responsible, human-centered technology for community well-being',
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: 'International partnerships',
      subtitle: 'Cross-border collaboration with creators, NGOs, and community leaders',
    },
    {
      icon: <Award className="h-5 w-5" />,
      title: 'Scholarships & training programs',
      subtitle: 'Long-term investments in education and professional development',
    },
  ];

  const RoadmapSection = ({
    title,
    icon,
    items,
    variant = 'default',
    status = 'upcoming',
  }: {
    title: string;
    icon: React.ReactNode;
    items: { icon: React.ReactNode; title: string; subtitle?: string }[];
    variant?: 'default' | 'pride';
    status?: 'implemented' | 'short-term' | 'mid-term' | 'upcoming';
  }) => {
    const statusLabels = {
      implemented: { label: 'Already Implemented', color: 'bg-green-500/10 text-green-600' },
      'short-term': { label: 'Next Updates', color: 'bg-blue-500/10 text-blue-600' },
      'mid-term': { label: 'Upcoming', color: 'bg-purple-500/10 text-purple-600' },
      upcoming: { label: 'Planned', color: 'bg-primary/10 text-primary' },
    };

    return (
      <div className="p-6 rounded-2xl bg-card border shadow-card">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div
              className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                variant === 'pride'
                  ? 'gradient-pride text-primary-foreground'
                  : 'bg-primary/10 text-primary'
              }`}
            >
              {icon}
            </div>
            <h3 className="font-display text-lg font-semibold">{title}</h3>
          </div>

          <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusLabels[status].color}`}>
            {statusLabels[status].label}
          </span>
        </div>

        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <div
                className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                  status === 'implemented' ? 'bg-green-500/10 text-green-600' : 'bg-muted text-muted-foreground'
                }`}
              >
                {item.icon}
              </div>
              <div className="pt-1">
                <span className="font-medium text-sm">{item.title}</span>
                {item.subtitle && <p className="text-xs text-muted-foreground mt-0.5">{item.subtitle}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Roadmap | Pride Social Network & Pride Lab Foundation</title>
        <meta
          name="description"
          content="Explore the roadmap for Pride Social Network and Pride Lab Foundation — what’s implemented, what’s next, and how our EU HQ and Italy-first foundation plan supports the ecosystem."
        />
      </Helmet>

      <Layout>
        {/* Hero */}
        <section className="py-20 lg:py-28 gradient-hero">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-pride mb-6">
                <Map className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="gradient-pride-text">Roadmap</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Our journey to build a complete ecosystem for the LGBTQIA+ community
              </p>
            </div>
          </div>
        </section>

        {/* Two Column Roadmap */}
        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Pride Social Network Column */}
              <div className="space-y-8">
                <div className="flex items-center gap-4 mb-8 animate-fade-in">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Heart className="h-7 w-7 text-primary" fill="currentColor" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold">Pride Social Network</h2>
                    <p className="text-muted-foreground">Digital platform development</p>
                  </div>
                </div>

                <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <RoadmapSection
                    title="Already Implemented"
                    icon={<CheckCircle className="h-5 w-5" />}
                    items={socialNetworkImplemented}
                    status="implemented"
                  />

                  <RoadmapSection
                    title="Next Updates (Short-Term)"
                    icon={<Clock className="h-5 w-5" />}
                    items={socialNetworkShortTerm}
                    status="short-term"
                  />

                  <RoadmapSection
                    title="Upcoming (Mid-Term)"
                    icon={<Rocket className="h-5 w-5" />}
                    items={socialNetworkMidTerm}
                    status="mid-term"
                  />

                  <RoadmapSection
                    title="PRIDE Coins Economy (Rules & Improvements)"
                    icon={<Coins className="h-5 w-5" />}
                    items={economyRules}
                    status="mid-term"
                  />

                  <RoadmapSection
                    title="AI Companions (Long-Term Direction)"
                    icon={<Sparkles className="h-5 w-5" />}
                    items={aiCompanions}
                    status="upcoming"
                  />
                </div>
              </div>

              {/* Pride Lab Foundation Column */}
              <div className="space-y-8">
                <div className="flex items-center gap-4 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <div className="h-14 w-14 rounded-xl gradient-pride flex items-center justify-center">
                    <Building2 className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold">Pride Lab Foundation</h2>
                    <p className="text-muted-foreground">Jurisdictions, programs, and real-world initiatives</p>
                  </div>
                </div>

                <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  {/* New: HQ + jurisdiction status */}
                  <RoadmapSection
                    title="Structure & Jurisdictions (Current Status)"
                    icon={<Globe className="h-5 w-5" />}
                    items={foundationOverview}
                    variant="pride"
                    status="implemented"
                  />

                  {/* 1) Italy FIRST */}
                  <RoadmapSection
                    title="Italy (Priority): Registration & Setup"
                    icon={<Building2 className="h-5 w-5" />}
                    items={foundationItalyPhase1}
                    variant="pride"
                    status="short-term"
                  />

                  {/* 2) Australia SECOND */}
                  <RoadmapSection
                    title="Australia (Secondary): Registration & Setup"
                    icon={<Clock className="h-5 w-5" />}
                    items={foundationAustraliaPhase1}
                    variant="pride"
                    status="mid-term"
                  />

                  {/* USA postponed */}
                  <RoadmapSection
                    title="USA: Postponed (Open-Ended)"
                    icon={<Lock className="h-5 w-5" />}
                    items={foundationUSPostponed}
                    variant="pride"
                    status="upcoming"
                  />

                  <RoadmapSection
                    title="Phase 2: Community Activation"
                    icon={<Users className="h-5 w-5" />}
                    items={foundationPhase2}
                    variant="pride"
                    status="mid-term"
                  />

                  <RoadmapSection
                    title="Phase 3: Long-Term Programs"
                    icon={<Globe className="h-5 w-5" />}
                    items={foundationPhase3}
                    variant="pride"
                    status="upcoming"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">Help Us Build the Future</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Every contribution helps us move forward on this roadmap faster. Join our community or support the
                ecosystem to be part of this journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="pride" size="lg" asChild>
                  <Link to="/support">
                    Support PRIDE
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

export default RoadmapPage;
