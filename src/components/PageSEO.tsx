import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://pridesocial.org';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og/pridesocial-og.jpg`;

interface PageSEOProps {
  title: string;
  description: string;
  path: string;
  /** Override the default OG image */
  ogImage?: string;
  /** Set to true to add noindex */
  noIndex?: boolean;
  /** Additional children inside Helmet */
  children?: React.ReactNode;
}

/**
 * Reusable SEO head component — canonical, OG, Twitter in one place.
 */
const PageSEO = ({ title, description, path, ogImage = DEFAULT_OG_IMAGE, noIndex, children }: PageSEOProps) => {
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {noIndex && <meta name="robots" content="noindex, follow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Pride Social Network" />
      <meta property="og:locale" content="en_GB" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {children}
    </Helmet>
  );
};

export default PageSEO;
export { SITE_URL, DEFAULT_OG_IMAGE };
