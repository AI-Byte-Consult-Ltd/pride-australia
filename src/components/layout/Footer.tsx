import { Link } from "react-router-dom";
import { Heart, ExternalLink } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Operations (display order matters: IT first, then AU)
  const legalInfo = {
    IT: {
      registration: "AI Byte Consult Ltd. (Italian operations) — Tax ID/VAT: pending",
      nonprofit: "Italian non-profit organization (registration in progress)",
    },
    AU: {
      registration: "AI Byte Consult Ltd. (Australia operations) — ABN: pending",
      nonprofit: "Australian non-profit organization (registration in progress)",
    },
  };

  const footerLinks = {
    platform: [
      { name: "Home", href: "/" },
      { name: "Community Map", href: "/community-map" },
      { name: "News", href: "/news" },
      { name: "Events", href: "/events" },
      { name: "Support Us", href: "/support" },
      { name: "Early Supporters", href: "/early-supporters" },
    ],
    foundation: [
      { name: "About", href: "/about" },
      { name: "Mission", href: "/mission" },
      { name: "Goals", href: "/goals" },
      { name: "Values", href: "/values" },
      { name: "Roadmap", href: "/roadmap" },
      { name: "Transparency & Costs", href: "/transparency-and-costs" },
      { name: "Contact", href: "/contact" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR & Data Protection", href: "/gdpr" },
      { name: "Community Guidelines", href: "/guidelines" },
      { name: "Constitution", href: "/constitution" },
    ],
  };

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12 lg:py-16">
        {/* Main */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-pride">
                <Heart className="h-5 w-5 text-primary-foreground" fill="currentColor" />
              </div>
              <span className="font-display text-xl font-bold">Pride Social</span>
            </Link>

            <p className="text-sm font-medium text-foreground mb-2">
              Made in EU 🇪🇺 for the World 🗺️
            </p>

            <p className="text-sm text-muted-foreground mb-4">
              A community-first social network built by and for the PRIDE community.
            </p>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>🇪🇺</span>
              <span>European Union</span>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-display font-semibold mb-4">Platform</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Foundation */}
          <div>
            <h4 className="font-display font-semibold mb-4">Foundation</h4>
            <ul className="space-y-3">
              {footerLinks.foundation.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-border" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            {/* IT first */}
            <p className="text-sm text-muted-foreground">{legalInfo.IT.registration}</p>
            <p className="text-xs text-muted-foreground mt-1">{legalInfo.IT.nonprofit}</p>

            {/* Spacer line */}
            <div className="h-4" />

            {/* AU second */}
            <p className="text-sm text-muted-foreground">{legalInfo.AU.registration}</p>
            <p className="text-xs text-muted-foreground mt-1">{legalInfo.AU.nonprofit}</p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-sm text-muted-foreground">
              © {currentYear} AI Byte Consult Ltd. All rights reserved.
            </p>

            <p className="text-xs text-muted-foreground">PRIDE Social Network v1.1.39</p>

            <a
              href="https://aibyteconsult.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              AI Byte Consult Ltd.
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
