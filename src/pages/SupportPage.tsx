import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SupportPackagesSection from '@/components/home/SupportPackagesSection';
import { Button } from '@/components/ui/button';
import { Heart, Gift, Trophy, Sparkles } from 'lucide-react';

const SupportPage = () => {
  const benefits = [
    {
      icon: <Gift className="h-5 w-5" />,
      title: 'Pride Coins',
      description: 'Earn Pride Coins to use in our marketplace and unlock special features.',
    },
    {
      icon: <Trophy className="h-5 w-5" />,
      title: 'Supporter Badge',
      description: 'Display a special badge on your profile showing your support.',
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: 'Exclusive Stickers',
      description: 'Get access to exclusive digital stickers for your posts.',
    },
    {
      icon: <Heart className="h-5 w-5" />,
      title: 'Community Impact',
      description: 'Your support directly funds platform development and community programs.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Support Pride Foundation | Pride Social Network</title>
        <meta name="description" content="Support Pride Foundation and help build a better social network for the Pride community. Choose a supporter package and make an impact." />
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
                Support <span className="gradient-pride-text">Pride Foundation</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Your contribution helps us build and maintain a safe, inclusive 
                social network for the Pride community. Every supporter makes a difference.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 border-b border-border">
          <div className="container">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={benefit.title}
                  className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages */}
        <SupportPackagesSection />

        {/* Additional Ways */}
        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center animate-fade-in">
              <h2 className="font-display text-3xl font-bold mb-4">
                Other Ways to Help
              </h2>
              <p className="text-muted-foreground mb-8">
                Not ready to make a financial contribution? You can still support us 
                by joining the network, inviting friends, and being an active community member.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" size="lg" asChild>
                  <Link to="/signup">Join Free</Link>
                </Button>
                <Button variant="ghost" size="lg" asChild>
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default SupportPage;
