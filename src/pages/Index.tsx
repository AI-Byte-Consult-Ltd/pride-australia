import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import TeamSection from '@/components/home/TeamSection';
import EventsSection from '@/components/home/EventsSection';
import NewsSection from '@/components/home/NewsSection';
import MarketplaceSection from '@/components/home/MarketplaceSection';
import SupportPackagesSection from '@/components/home/SupportPackagesSection';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Pride Social Network | A Joyful Community for Pride</title>
        <meta 
          name="description" 
          content="Join Pride Social Network, a non-profit social platform built by and for the Pride community. Connect, share, and celebrate together." 
        />
        <meta name="keywords" content="pride, lgbtq, social network, community, non-profit, marketplace" />
        <link rel="canonical" href="https://pridesocial.network" />
      </Helmet>
      
      <Layout>
        <HeroSection />
        <FeaturesSection />
        <TeamSection />
        <EventsSection />
        <NewsSection />
        <MarketplaceSection />
        <SupportPackagesSection />
        <CTASection />
      </Layout>
    </>
  );
};

export default Index;
