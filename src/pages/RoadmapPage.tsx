
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
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
  Smile,
  Share2,
  Hash,
  Shield,
  Award,
  FileText,
  Coins,
  CreditCard,
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
  Newspaper,
  BadgeCheck,
  UserPlus,
  Settings,
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
    { icon: <CheckCircle className="h-5 w-5" />, title: 'Community feed' },
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
      title: 'Expanded support options',
      subtitle: 'Added an Australian bank account option for supporters who prefer a direct transfer',
    },
  ];

  // Pride Social Network — short-term
  const socialNetworkShortTerm = [
    { icon: <MessageCircle className="h-5 w-5" />, title: 'User mentions (@tagging)' },
    { icon: <Link2 className="h-5 w-5" />, title: 'Active links in posts' },
    {
      icon: <FileText className="h-5 w-5" />,
      title: 'Post status updates in Dashboard',
      subtitle: 'Three supporter statuses: Early Supporter, Founding Member, VIP Supporter',
    },
    {
      icon: <Bell className="h-5 w-5" />,
      title: 'Dashboard notifications',
      subtitle: 'Get notified when someone replies, likes, mentions you, or posts in your groups',
    },
    {
      icon: <Newspaper className="h-5 w-5" />,
      title: 'Country updates and news panels',
      subtitle: 'Australia-first, with the ability to add other countries as we expand',
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: 'Contact form & partnership requests',
      subtitle: 'A structured way to reach the team, propose collaborations, and request support',
    },
    {
      icon: <UserPlus className="h-5 w-5" />,
      title: 'Referral & affiliate links',
      subtitle: 'Invite new members and earn PRIDE Units for each verified join',
    },
    {
      icon: <Award className="h-5 w-5" />,
      title: 'Supporters wall on the homepage',
      subtitle: 'A dedicated section with supporter names, images, and optional links',
    },
  ];

  // Pride Social Network — mid-term
  const socialNetworkMidTerm = [
    { icon: <Hash className="h-5 w-5" />, title: 'Topic-based feeds and discovery' },
    { icon: <Shield className="h-5 w-5" />, title: 'Community moderation tools' },
    {
      icon: <BadgeCheck className="h-5 w-5" />,
      title: 'Verified supporter badges',
      subtitle: 'Clear recognition for Early Supporter, Founding Member, and VIP Supporter',
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: 'Closed and thematic groups',
      subtitle: 'Join invite-only groups, interest-based groups, and create your own communities',
    },
    {
      icon: <Share2 className="h-5 w-5" />,
      title: 'Post sharing feature',
      subtitle: 'Echo — share a post to amplify voices you support',
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
      subtitle: 'Voice notes, short updates, and accessible formats for community storytelling',
    },
    {
      icon: <Store className="h-5 w-5" />,
      title: 'Merchandise on Pride Social Network',
      subtitle: 'Official merchandise section to support sustainability of the ecosystem',
    },
    {
      icon: <Coins className="h-5 w-5" />,
      title: 'PRIDE Units economy improvements',
      subtitle: 'Clear earning rules, better balancing, and more ways to use Units inside the platform',
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: 'Marketplace improvements',
      subtitle: 'Removing listing fees and refining rules to support creators and small sellers',
    },
  ];

  // Pride Social Network — economy (explicit rules)
  const economyRules = [
    {
      icon: <Coins className="h-5 w-5" />,
      title: 'Earn 3 PRIDE Units for each post',
      subtitle: 'Encouraging consistent, meaningful participation',
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: 'Earn 2 PRIDE Units for each reply',
      subtitle: 'Supporting conversation and community-building',
    },
    {
      icon: <Heart className="h-5 w-5" />,
      title: 'Earn 1 PRIDE Unit for each like received',
      subtitle: 'Simple recognition for content that resonates',
    },
    {
      icon: <UserPlus className="h-5 w-5" />,
      title: 'Earn 100 PRIDE Units for each invited member',
      subtitle: 'Referral reward for verified joins (anti-abuse checks included)',
    },
  ];

  // Pride Lab Foundation — Phase 1
  const foundationPhase1 = [
    {
      icon: <Building2 className="h-5 w-5" />,
      title: 'Legal registration in Australia',
      subtitle: 'Establishing a compliant foundation structure to support community initiatives',
    },
    {
      icon: <Coins className="h-5 w-5" />,
      title: 'Accounting & compliance setup',
      subtitle: 'Ensuring responsible operations, reporting, and long-term sustainability',
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: 'Transparent cost tracking page',
      subtitle: 'Clear visibility on costs, priorities, and what community support enables',
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      title: 'Payment infrastructure for donations',
      subtitle: 'Multiple support options, including bank transfer and card-based contributions',
    },
  ];

  // Pride Lab Foundation — Phase 2
  const foundationPhase2 = [
    {
      icon: <Calendar className="h-5 w-5" />,
      title: 'Community-led events (online & offline)',
      subtitle: 'Meetups, community sessions, safe spaces, and creator-focused gatherings',
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
      icon: <Gift className="h-5 w-5" />,
      title: 'Medium and large grants',
      subtitle: 'Expanded funding for higher-impact initiatives as the Foundation scales',
    },
    {
      icon: <GraduationCap className="h-5 w-5" />,
      title: 'Education grants & learning support',
      subtitle: 'Training support, workshops, labs, and access to educational opportunities',
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
    {
      icon: <Building2 className="h-5 w-5" />,
      title: 'Expansion to new regions',
      subtitle: 'Establishing additional foundations where it makes sense (USA first, then other regions)',
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
          content="Explore the roadmap for Pride Social Network and Pride Lab Foundation — see what's implemented, what's next, and our long-term vision."
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
                    title="PRIDE Units Economy (Rules & Improvements)"
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
                    <p className="text-muted-foreground">Non-profit organization development</p>
                  </div>
                </div>

                <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <RoadmapSection
                    title="Phase 1: Registration & Setup"
                    icon={<Building2 className="h-5 w-5" />}
                    items={foundationPhase1}
                    variant="pride"
                    status="short-term"
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
                Foundation to be part of this journey.
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
