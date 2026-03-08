import { Link } from "react-router-dom";
import { Heart, ExternalLink } from "lucide-react";
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  const footerLinks = {
    platform: [
      { nameKey: 'footer.home', href: '/' },
      { nameKey: 'footer.communityMap', href: '/community-map' },
      { nameKey: 'footer.news', href: '/news' },
      { nameKey: 'footer.events', href: '/events' },
      { nameKey: 'footer.supportUs', href: '/support' },
      { nameKey: 'footer.earlySupporters', href: '/early-supporters' },
    ],
    foundation: [
      { nameKey: 'footer.about', href: '/about' },
      { nameKey: 'footer.mission', href: '/mission' },
      { nameKey: 'footer.goals', href: '/goals' },
      { nameKey: 'footer.values', href: '/values' },
      { nameKey: 'footer.roadmap', href: '/roadmap' },
      { nameKey: 'footer.transparencyCosts', href: '/transparency-and-costs' },
      { nameKey: 'footer.contact', href: '/contact' },
    ],
    legal: [
      { nameKey: 'footer.privacyPolicy', href: '/privacy' },
      { nameKey: 'footer.termsOfService', href: '/terms' },
      { nameKey: 'footer.cookiePolicy', href: '/cookies' },
      { nameKey: 'footer.gdpr', href: '/gdpr' },
      { nameKey: 'footer.guidelines', href: '/guidelines' },
      { nameKey: 'footer.constitution', href: '/constitution' },
    ],
  };

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-pride">
                <Heart className="h-5 w-5 text-primary-foreground" fill="currentColor" />
              </div>
              <span className="font-display text-xl font-bold">Pride Social</span>
            </Link>
            <p className="text-sm font-medium text-foreground mb-2">{t('common.madeInEU')}</p>
            <p className="text-sm text-muted-foreground mb-4">{t('footer.tagline')}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>🇪🇺</span>
              <span>{t('footer.europeanUnion')}</span>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">{t('footer.platform')}</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t(link.nameKey)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">{t('footer.foundation')}</h4>
            <ul className="space-y-3">
              {footerLinks.foundation.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t(link.nameKey)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t(link.nameKey)}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="my-8 border-t border-border" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">{t('footer.itRegistration')}</p>
            <p className="text-xs text-muted-foreground mt-1">{t('footer.itNonprofit')}</p>
            <div className="h-4" />
            <p className="text-sm text-muted-foreground">{t('footer.auRegistration')}</p>
            <p className="text-xs text-muted-foreground mt-1">{t('footer.auNonprofit')}</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-sm text-muted-foreground">© {currentYear} AI Byte Consult Ltd. {t('footer.allRightsReserved')}</p>
            <p className="text-xs text-muted-foreground">PRIDE Social Network v1.1.39</p>
            <a href="https://aibyteconsult.com" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              AI Byte Consult Ltd.<ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
