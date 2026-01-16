
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
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const MissionPage = () => {
  const socialNetworkValues = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Every identity is respected',
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: 'Voices are heard without fear',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Community comes before algorithms',
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: 'Technology supports people, not replaces them',
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
      title: 'Educational and skills-based programs',
      description: 'Empowering people through knowledge, mentoring, and professional development.',
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: 'Support for creators, activists, and local initiatives',
      description: 'Amplifying voices and enabling grassroots projects through structured support.',
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: 'Responsible use of technology',
      description: 'Expanding access and opportunity with ethics, transparency, and care.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Our Mission | Pride Social Network & Pride Lab Foundation</title>
        <meta
          name="description"
          content="Discover the missions of Pride Social Network and Pride Lab Foundation — empowering LGBTQIA+ communities through connection, visibility, education, and innovation."
        />
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
              <p className="text-xl text-muted-foreground">
                Two complementary missions, one shared purpose: empowering the LGBTQIA+ community
              </p>
            </div>
          </div>
        </section>

        {/* Missions */}
        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Pride Social Network Mission */}
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
                      Pride Social Network exists to give LGBTQIA+ people a safer, more human-centered digital space to
                      connect, express themselves, and participate in building a community — not just consuming content.
                      We begin in Australia with core functionality already live, and we’re building toward a platform
                      that can responsibly expand worldwide.
                    </p>

                    <p className="text-muted-foreground leading-relaxed">
                      We believe that modern social media often fails the communities that need it most. It can reward
                      outrage, amplify harassment, and prioritize engagement over well-being. Our mission is to build an
                      alternative: a platform designed around trust, identity, and constructive participation — with
                      transparent development and community feedback guiding our decisions.
                    </p>

                    <div className="p-6 rounded-xl bg-muted/50 border">
                      <h3 className="font-display font-semibold mb-4">We aim to create a social platform where:</h3>
                      <ul className="space-y-4">
                        {socialNetworkValues.map((value, index) => (
                          <li key={index} className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                              {value.icon}
                            </div>
                            <span className="font-medium">{value.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      Our technology is built by a European team developing its own AI systems from the ground up. Over
                      time, this will enable supportive digital companions inside the platform — designed for guidance,
                      learning, and meaningful conversation. The goal is not to replace human relationships, but to
                      strengthen access to support, information, and community resources when people need them.
                    </p>

                    <p className="text-muted-foreground leading-relaxed">
                      Pride Social Network is built with intention: safer interaction patterns, thoughtful product design,
                      and continuous improvement based on real community needs — not short-term metrics.
                    </p>
                  </div>
                </div>

                {/* Pride Lab Foundation Mission */}
                <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-14 w-14 rounded-xl gradient-pride flex items-center justify-center">
                      <Building2 className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-primary">Mission of</span>
                      <h2 className="font-display text-2xl lg:text-3xl font-bold">Pride Lab Foundation</h2>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Pride Lab Foundation is being registered in Australia by the European company behind Pride Social
                      Network. Its mission is to support Pride communities through real-world initiatives, education, and
                      long-term ecosystem development — starting in Australia and expanding to other regions as the
                      community and partnerships grow.
                    </p>

                    <p className="text-muted-foreground leading-relaxed">
                      The Foundation is designed to be the community and impact layer of the ecosystem. Where the social
                      platform builds digital connection, the Foundation helps enable practical support: programs,
                      initiatives, collaborations, and structured opportunities that strengthen safety, dignity, and
                      well-being beyond the screen.
                    </p>

                    <div className="p-6 rounded-xl bg-muted/50 border">
                      <h3 className="font-display font-semibold mb-4">
                        Starting in Australia, the Foundation focuses on:
                      </h3>
                      <ul className="space-y-4">
                        {foundationFocus.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-lg gradient-pride text-primary-foreground flex items-center justify-center shrink-0 mt-0.5">
                              {item.icon}
                            </div>
                            <div>
                              <span className="font-medium block">{item.title}</span>
                              <span className="text-sm text-muted-foreground">{item.description}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      As the ecosystem expands, our long-term intent is to establish additional foundations where it makes
                      sense — including the United States — and potentially in Europe later, depending on legal
                      frameworks, partnerships, and community readiness.
                    </p>

                    <p className="text-muted-foreground leading-relaxed">
                      Our mission is not only to support Pride — but to build systems that help Pride sustain itself:
                      strengthening communities, empowering creators and organizers, and enabling long-term positive
                      impact through responsible innovation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Unified Vision */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-pride mb-6">
                <Globe className="h-8 w-8 text-primary-foreground" />
              </div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6">One Unified Vision</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Together, Pride Social Network and Pride Lab Foundation form a complete ecosystem — combining digital
                connection with real-world impact. One side builds a safer social space; the other helps strengthen
                communities through programs, education, and long-term support. The shared purpose is clear: empower
                LGBTQIA+ people to connect, learn, create, and thrive — locally and globally.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="pride" size="lg" asChild>
                  <Link to="/goals">
                    View Our Goals
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/roadmap">See the Roadmap</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default MissionPage;
