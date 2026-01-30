import { Sparkles, Crown, Star, CreditCard, Wallet, Coins, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { SUPPORT_LINKS } from '@/config/supportLinks';

type Provider = 'stripe' | 'revolut' | 'paypal' | 'coinbase';

interface SupportPackage {
  id: 'basic' | 'pro' | 'elite';
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
  featured?: boolean;
  benefits: string[];
  coinsPerMonth: number;
}

const EUR_SYMBOL = '€';

// NOTE: Monthly subscription tiers (not donations)
const packages: SupportPackage[] = [
  {
    id: 'basic',
    name: 'PRIDE Basic',
    description: 'A simple monthly membership to support Pride Social Network and unlock quality-of-life features.',
    price: 2.5,
    icon: <Star className="h-6 w-6" />,
    coinsPerMonth: 250,
    benefits: [
      'Small reply boost',
      'Bookmark folders',
      'Highlights tab',
      'Edit posts',
      'Create longer posts',
      'Customize your experience',
      'Member badge on your profile',
    ],
  },
  {
    id: 'pro',
    name: 'PRIDE Pro',
    description: 'For creators and active community members: more reach, better tools, and deeper insights.',
    price: 8.5,
    icon: <Sparkles className="h-6 w-6" />,
    featured: true,
    coinsPerMonth: 900,
    benefits: [
      'Everything in PRIDE Basic, plus:',
      'Verified checkmark',
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
    description: 'Fully-loaded plan for power users, partners, and businesses — maximum visibility and advanced tools.',
    price: 42,
    icon: <Crown className="h-6 w-6" />,
    coinsPerMonth: 5000,
    benefits: [
      'Everything in PRIDE Pro, plus:',
      'Fully ad-free',
      'Super NICS AI (NEW)',
      'Handle Marketplace (NEW)',
      'Highest reply boost',
      'PRIDE Radar Advanced Search',
      'Priority support channel',
    ],
  },
];

const SupportPackagesSection = () => {
  const handleSubscribe = (pkg: SupportPackage, provider: Provider) => {
    // SUPPORT_LINKS must contain subscription (recurring) checkout links per tier/provider
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
            Subscribe & Unlock PRIDE Benefits
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pride Social Network is built in Europe for a global community.
            Subscribe monthly to support the platform and receive{' '}
            <span className="gradient-pride-text font-semibold">PRIDE Coins</span> every month.
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
                    <span className="text-sm text-muted-foreground">
                      – {pkg.coinsPerMonth} / month
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mt-1">Included with subscription</p>
                </div>

                {/* Benefits List */}
                <div className="mt-6 text-left space-y-2">
                  {pkg.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>

              {/* Subscription buttons */}
              <CardFooter className="flex flex-col gap-3">
                {/* 1) Stripe (recommended for recurring) */}
                <Button
                  variant={pkg.featured ? 'pride' : 'default'}
                  size="lg"
                  className="w-full gap-2"
                  onClick={() => handleSubscribe(pkg, 'stripe')}
                >
                  <CreditCard className="h-4 w-4" />
                  Subscribe with Stripe
                </Button>

                {/* 2) Revolut (if you support recurring there) */}
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full gap-2"
                  onClick={() => handleSubscribe(pkg, 'revolut')}
                >
                  <CreditCard className="h-4 w-4" />
                  Subscribe with Card (Revolut)
                </Button>

                {/* Optional payment rails (keep if you still want them) */}
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
