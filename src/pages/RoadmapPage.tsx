import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Map, Heart, Building2, CheckCircle, Clock, Rocket, ArrowRight, MessageCircle, Link2, Smile, Share2, Hash, Shield, Award, FileText, Coins, CreditCard, Calendar, Users, Gift, GraduationCap, Globe, Microscope } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const RoadmapPage = () => {
  const socialNetworkImplemented = [
    { icon: <CheckCircle className="h-5 w-5" />, title: 'Email-based user registration' },
    { icon: <CheckCircle className="h-5 w-5" />, title: 'User profiles and username change' },
    { icon: <CheckCircle className="h-5 w-5" />, title: 'Text posts' },
    { icon: <CheckCircle className="h-5 w-5" />, title: 'Likes on posts' },
    { icon: <CheckCircle className="h-5 w-5" />, title: 'Community feed' },
  ];

  const socialNetworkShortTerm = [
    { icon: <MessageCircle className="h-5 w-5" />, title: 'User mentions (@tagging)' },
    { icon: <Link2 className="h-5 w-5" />, title: 'Active links in posts' },
    { icon: <FileText className="h-5 w-5" />, title: 'Post status updates' },
    { icon: <Smile className="h-5 w-5" />, title: 'Community stickers & reactions' },
    { 
      icon: <Share2 className="h-5 w-5" />, 
      title: 'Post sharing feature', 
      subtitle: 'Echo — Echo a post to amplify voices you support' 
    },
  ];

  const socialNetworkMidTerm = [
    { icon: <Hash className="h-5 w-5" />, title: 'Topic-based feeds' },
    { icon: <Shield className="h-5 w-5" />, title: 'Community moderation tools' },
    { icon: <Award className="h-5 w-5" />, title: 'Verified supporter badges' },
    { icon: <FileText className="h-5 w-5" />, title: 'Public roadmap & changelog integration' },
  ];

  const foundationPhase1 = [
    { icon: <Building2 className="h-5 w-5" />, title: 'Legal registration in Australia' },
    { icon: <Coins className="h-5 w-5" />, title: 'Accounting & compliance setup' },
    { icon: <FileText className="h-5 w-5" />, title: 'Transparent cost tracking page' },
    { icon: <CreditCard className="h-5 w-5" />, title: 'Payment infrastructure for donations' },
  ];

  const foundationPhase2 = [
    { icon: <Calendar className="h-5 w-5" />, title: 'Community-led events (online & offline)' },
    { icon: <Users className="h-5 w-5" />, title: 'Sponsorship of LGBTQ+ initiatives' },
    { icon: <Gift className="h-5 w-5" />, title: 'Creator and activist micro-grants' },
    { icon: <GraduationCap className="h-5 w-5" />, title: 'Educational workshops & labs' },
  ];

  const foundationPhase3 = [
    { icon: <Rocket className="h-5 w-5" />, title: 'Technology & creativity labs' },
    { icon: <Globe className="h-5 w-5" />, title: 'International partnerships' },
    { icon: <Award className="h-5 w-5" />, title: 'Scholarships & training programs' },
    { icon: <Microscope className="h-5 w-5" />, title: 'Research & innovation support' },
  ];

  const RoadmapSection = ({ 
    title, 
    icon, 
    items, 
    variant = 'default',
    status = 'upcoming'
  }: { 
    title: string; 
    icon: React.ReactNode; 
    items: { icon: React.ReactNode; title: string; subtitle?: string }[];
    variant?: 'default' | 'pride';
    status?: 'implemented' | 'short-term' | 'mid-term' | 'upcoming';
  }) => {
    const statusLabels = {
      'implemented': { label: 'Already Implemented', color: 'bg-green-500/10 text-green-600' },
      'short-term': { label: 'Next Updates', color: 'bg-blue-500/10 text-blue-600' },
      'mid-term': { label: 'Upcoming', color: 'bg-purple-500/10 text-purple-600' },
      'upcoming': { label: 'Planned', color: 'bg-primary/10 text-primary' },
    };

    return (
      <div className="p-6 rounded-2xl bg-card border shadow-card">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${variant === 'pride' ? 'gradient-pride text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
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
              <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${status === 'implemented' ? 'bg-green-500/10 text-green-600' : 'bg-muted text-muted-foreground'}`}>
                {item.icon}
              </div>
              <div className="pt-1">
                <span className="font-medium text-sm">{item.title}</span>
                {item.subtitle && (
                  <p className="text-xs text-muted-foreground mt-0.5">{item.subtitle}</p>
                )}
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
        <meta name="description" content="Explore the roadmap for Pride Social Network and Pride Lab Foundation — see what's implemented, what's next, and our long-term vision." />
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
                Our journey to build a complete ecosystem for the LGBTQ+ community
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
              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
                Help Us Build the Future
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Every contribution helps us move forward on this roadmap faster. Join our community or support the Foundation to be part of this journey.
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
