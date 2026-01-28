import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import TeamSection from "@/components/home/TeamSection";
import EventsSection from "@/components/home/EventsSection";
import NewsSection from "@/components/home/NewsSection";
import CommunityMapSection from "@/components/home/CommunityMapSection";
import SupportPackagesSection from "@/components/home/SupportPackagesSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  const siteUrl = "https://pridesocial.org";

  // Updated: remove Marketplace positioning, add "List your business", shift focus to EU + global
  const title = "Pride Social Network | LGBTQIA+ Community, List Your Business & Support";
  const description =
    "Pride Social Network is a community-first LGBTQIA+ social platform built by and for the Pride community. Connect safely, share updates, discover events, support creators, and list your business for the European Union and the world — powered by AI Byte Consult Ltd.";

  // NOTE: If you have a real social preview image, replace this URL.
  const ogImage = `${siteUrl}/og/pridesocial-og.png`;

  return (
    <>
      <Helmet>
        {/* Primary SEO */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="pride social network, lgbtqia social network, LGBTQIA+ community, queer community, gay community, lesbian community, transgender community, safe social app, inclusive community, pride events, LGBTQIA+ events, list your business, LGBTQIA+ business directory, LGBTQIA+ friendly businesses, LGBTQIA+ services, LGBTQIA+ creators, supporter badge, early supporter, founding member, VIP supporter, European Union LGBTQIA+, EU LGBTQIA+, global LGBTQIA+ community, Pride Social"
        />
        <link rel="canonical" href={siteUrl} />

        {/* Basic quality signals */}
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <meta name="theme-color" content="#7c3aed" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="Pride Social Network" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      <Layout>
        <HeroSection />
        <FeaturesSection />

        {/* Moved up: Become a supporter right after "Why Pride Social Network" (Features) */}
        <SupportPackagesSection />

        {/* Then team */}
        <TeamSection />

        <EventsSection />
        <NewsSection />
        <CommunityMapSection />
        <CTASection />
      </Layout>
    </>
  );
};

export default Index;
