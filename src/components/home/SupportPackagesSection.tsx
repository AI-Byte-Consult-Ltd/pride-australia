
import { Sparkles, Crown, Star, CreditCard, Wallet, Coins, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { SUPPORT_LINKS } from '@/config/supportLinks';

type Provider = 'stripe' | 'revolut' | 'paypal' | 'coinbase';

interface SupportPackage {
  id: 'basic' | 'pro' | 'elite';
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
  featured?: boolean;
  coinsPerMonth: number;
  benefitsNow: string[];
  benefitsSoon: string[];
}

const EUR_SYMBOL = '€';
const ROADMAP_DATE_LABEL = 'From June 1, 2026';

const packages: SupportPackage[] = [
  {
    id: 'basic',
    name: 'PRIDE Basic',
    description:
      'A simple monthly membership to support Pride Social Network. Get supporter perks now, and unlock more features soon.',
    price: 2.5,
    icon: <Star className="h-6 w-6" />,
    coinsPerMonth: 250,
    benefitsNow: [
      'Early Supporter badge on your profile',
      'Your name listed on the "Early Supporters" wall',
      'Supporter status shown in your Dashboard',
      'PRIDE Coins credited monthly',
      'Priority access to new features during Alpha',
    ],
    benefitsSoon: [
      'Small reply boost',
      'Bookmark folders',
      'Highlights tab',
      'Edit posts',
      'Create longer posts',
      'Customize your experience with themes',
    ],
  },
  {
    id: 'pro',
    name: 'PRIDE Pro',
    description:
      'For creators and active community members. More recognition now, plus advanced tools rolling out after June 1, 2026.',
    price: 8.5,
    icon: <Sparkles className="h-6 w-6" />,
    featured: true,
    coinsPerMonth: 900,
    benefitsNow: [
      'Everything in PRIDE Basic',
      'Founding Member verification badge',
      'Special recognition as a Founding Member',
      'Access to supporter-only updates / announcements',
      'PRIDE Coins credited monthly',
      'Priority access to Alpha features',
    ],
    benefitsSoon: [
      'Verified checkmark (public)',
      'Advanced analytics',
      'Less ads in your feeds',
      'Boosted replies',
      'Write Articles',
      'Creator Subscriptions',
      'Get paid to post (when enabled)',
      'Enhanced AI features access (as available)',
    ],
  },
  {
    id: 'elite',
    name: 'PRIDE Elite',
    description:
      'The highest tier for power users, partners, and businesses. Maximum recognition now, with premium features rolling out after June 1, 2026.',
    price: 42,
    icon: <Crown className="h-6 w-6" />,
    coinsPerMonth: 5000,
    benefitsNow: [
      'Everything in PRIDE Pro',
      'VIP Supporter verification badge',
      'VIP supporter recognition on the Supporters page',
      'Priority feedback channel with the team',
      'Early invitations to online/offline events (as available)',
      'PRIDE Coins credited monthly',
    ],
    benefitsSoon: [
      'Fully ad-free',
      'Super NICS AI (NEW)',
      'Handle Marketplace / advanced business tools (NEW)',
      'Highest reply boost',
      'PRIDE Radar Advanced Search',
      'Priority support channel',
    ],
  },
];

const SupportPackagesSection = () => {
  const handleSubscribe = (pkg: SupportPackage, provider: Provider) => {
    const baseUrl = (SUPPORT_LINKS as any)[pkg.id]?.[provider];
    if (!baseUrl) {
      console.warn(`Missing subscription link for ${pkg.id} via ${provider}`);
      return;
    }
    window.open(baseUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            Monthly Membership
          </span>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Subscribe & Support Pride Social Network
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            This is a monthly membership that funds the development of Pride Social Network.
            You’ll get supporter perks now, and many premium features will roll out after{' '}
            <span className="font-medium text-foreground">June 1, 2026</span>.
            <br />
            <span className="text-sm">Made in EU 🇪🇺, for the World 🗺️</span>
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <Card
              key={pkg.id}
              variant={pkg.featured ? 'featured' : 'elevated'}
              className="relative animate-fade-in flex flex-col"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {pkg.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-block px-4 py-1 rounded-full gradient-pride text-primary-foreground text-sm font-medium shadow-soft">
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader className="text-center pt-8">
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mx-auto mb-4 ${
                    pkg.featured
                      ? 'gradient-pride text-primary-foreground'
                      : pkg.id === 'elite'
                        ? 'bg-pride-purple/10 text-pride-purple'
                        : 'bg-primary/10 text-primary'
                  }`}
                >
                  {pkg.icon}
                </div>

                <CardTitle className="text-xl">{pkg.name}</CardTitle>
                <CardDescription className="mt-2">{pkg.description}</CardDescription>
              </CardHeader>

              <CardContent className="text-center flex-1">
                {/* Price */}
                <div className="py-4">
                  <div className="mb-2">
                    <span className="text-3xl font-display font-bold">
                      {EUR_SYMBOL}
                      {pkg.price.toFixed(pkg.price % 1 === 0 ? 0 : 2)}
                    </span>
                    <span className="text-sm text-muted-foreground"> / month</span>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg font-display font-bold gradient-pride-text">
                      PRIDE Coins
                    </span>
                    <span className="text-sm text-muted-foreground">– {pkg.coinsPerMonth} / month</span>
                  </div>

                  <p className="text-sm text-muted-foreground mt-1">Included with subscription</p>
                </div>

                {/* Benefits */}
                <div className="mt-6 text-left space-y-6">
                  {/* Available Now */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <h4 className="text-sm font-semibold text-foreground">Available now</h4>
                      <Badge variant="secondary" className="text-xs">
                        Live
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      {pkg.benefitsNow.map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Roadmap */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <h4 className="text-sm font-semibold text-foreground">Roadmap</h4>
                      <Badge variant="outline" className="text-xs">
                        {ROADMAP_DATE_LABEL}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      {pkg.benefitsSoon.map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-muted-foreground/60 shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">
                            {benefit} <span className="text-muted-foreground/70">(soon)</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>

              {/* Subscription buttons */}
              <CardFooter className="flex flex-col gap-3">
                <Button
                  variant={pkg.featured ? 'pride' : 'default'}
                  size="lg"
                  className="w-full gap-2"
                  onClick={() => handleSubscribe(pkg, 'stripe')}
                >
                  <CreditCard className="h-4 w-4" />
                  Subscribe with Stripe
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full gap-2"
                  onClick={() => handleSubscribe(pkg, 'revolut')}
                >
                  <CreditCard className="h-4 w-4" />
                  Subscribe with Card (Revolut)
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full gap-2"
                  onClick={() => handleSubscribe(pkg, 'paypal')}
                >
                  <Wallet className="h-4 w-4" />
                  Subscribe with PayPal
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full gap-2"
                  onClick={() => handleSubscribe(pkg, 'coinbase')}
                >
                  <Coins className="h-4 w-4" />
                  Subscribe with Crypto
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportPackagesSection;
