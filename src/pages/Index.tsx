
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

  /**
   * SEO STRATEGY:
   * - Brand + Function + Geography (EU + Global)
   * - Clear positioning: social network + business listing
   * - Repeated slogan for brand recall
   */
  const title =
    "Pride Social Network — LGBTQIA+ Community & Business Directory | Made in EU, for the World";

  const description =
    "Pride Social Network is a modern LGBTQIA+ social platform created in the European Union for a global community. " +
    "Connect safely, share stories, discover events, support creators, and list your LGBTQIA+-friendly business across Europe and worldwide. " +
    "Made in EU 🇪🇺, for the World 🗺️.";

  // Social preview image
  const ogImage = `${siteUrl}/og/pridesocial-og.png`;

  return (
    <>
      <Helmet>
        {/* ================= PRIMARY SEO ================= */}
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta
          name="keywords"
          content="
          pride social network,
          LGBTQIA+ social network,
          LGBTQ+ community platform,
          LGBTQIA+ community Europe,
          European Union LGBTQIA+,
          EU LGBTQ+ platform,
          LGBTQIA+ social network EU,
          made in EU,
          made in European Union,
          European social network,
          global LGBTQIA+ community,
          queer community Europe,
          gay community Europe,
          lesbian community Europe,
          transgender community Europe,
          inclusive social platform,
          safe LGBTQIA+ space,
          LGBTQIA+ events Europe,
          pride events EU,
          LGBTQIA+ news Europe,
          LGBTQIA+ business directory,
          list your business EU,
          LGBTQIA+ friendly businesses Europe,
          LGBTQIA+ services EU,
          LGBTQIA+ creators platform,
          support LGBTQIA+ community,
          Pride Social Network
          "
        />

        <link rel="canonical" href={siteUrl} />

        {/* ================= QUALITY SIGNALS ================= */}
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="theme-color" content="#7c3aed" />

        {/* ================= OPEN GRAPH ================= */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="Pride Social Network" />
        <meta property="og:locale" content="en_GB" />

        {/* ================= TWITTER ================= */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      <Layout>
        <HeroSection />
        <FeaturesSection />

        {/* Become a supporter — high conversion block */}
        <SupportPackagesSection />

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
