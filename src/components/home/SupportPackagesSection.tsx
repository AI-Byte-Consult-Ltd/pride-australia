import { useState } from 'react';
import { Sparkles, Crown, Star, Heart, CreditCard, RefreshCcw, Wallet, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SUPPORT_LINKS } from '@/config/supportLinks';

type Provider = 'stripe' | 'revolut' | 'paypal' | 'coinbase';

interface SupportPackage {
  id: 'early' | 'founding' | 'vip';
  name: string;
  description: string;
  prideCoins: number | 'custom';
  price: number | 'custom';
  icon: React.ReactNode;
  featured?: boolean;
}

const AUD_SYMBOL = 'A$';
const VIP_MIN = 199;

// Updated coin bonuses
const EARLY_BONUS = 2_000_000;
const FOUNDING_BONUS = 5_000_000;
const VIP_BONUS_FROM = 20_000_000;

const packages: SupportPackage[] = [
  {
    id: 'early',
    name: 'Early Supporter',
    description: 'Be among the first to support our community platform and help us grow.',
    prideCoins: EARLY_BONUS,
    price: 19,
    icon: <Star className="h-6 w-6" />,
  },
  {
    id: 'founding',
    name: 'Founding Member',
    description: 'Join as a founding member and shape the future of Pride Social Network.',
    prideCoins: FOUNDING_BONUS,
    price: 49,
    icon: <Sparkles className="h-6 w-6" />,
    featured: true,
  },
  {
    id: 'vip',
    name: 'VIP Supporter',
    description: 'Choose your own contribution amount and receive Pride Coins based on your generosity.',
    prideCoins: 'custom',
    price: 'custom',
    icon: <Crown className="h-6 w-6" />,
  },
];

const SupportPackagesSection = () => {
  const [customAmount, setCustomAmount] = useState<number>(VIP_MIN);

  const buildFinalLink = (baseUrl: string, pkgId: SupportPackage['id']) => {
    // VIP: append amount param (ignored if provider doesn't support it)
    if (pkgId !== 'vip') return baseUrl;

    const amount = Math.max(VIP_MIN, customAmount);
    const joiner = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${joiner}amount=${encodeURIComponent(String(amount))}`;
  };

  const handleDonate = (pkg: SupportPackage, provider: Provider) => {
    const baseUrl = SUPPORT_LINKS[pkg.id][provider];
    const finalUrl = buildFinalLink(baseUrl, pkg.id);
    window.open(finalUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            Support Our Mission
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Become a Supporter
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your support helps us build a safe, inclusive platform for the Pride community.
            Choose a package and receive PRIDE Coins as a thank you.
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
                      : pkg.id === 'vip'
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
                {pkg.id === 'vip' ? (
                  <div className="py-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="custom-amount" className="text-sm text-muted-foreground">
                        Choose your amount (AUD)
                      </Label>
                      <div className="relative max-w-[190px] mx-auto">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                          {AUD_SYMBOL}
                        </span>
                        <Input
                          id="custom-amount"
                          type="number"
                          min={VIP_MIN}
                          value={customAmount}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || VIP_MIN;
                            setCustomAmount(Math.max(VIP_MIN, val));
                          }}
                          className="pl-10 text-center text-xl font-bold"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Minimum {AUD_SYMBOL}{VIP_MIN}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-center gap-2">
                        <Heart className="h-5 w-5 text-pride-pink" />
                        <span className="text-2xl font-display font-bold gradient-pride-text">
                          {VIP_BONUS_FROM.toLocaleString()}+
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">PRIDE Coins Bonus (from)</p>
                    </div>
                  </div>
                ) : (
                  <div className="py-4">
                    <div className="mb-2">
                      <span className="text-3xl font-display font-bold">
                        {AUD_SYMBOL}{pkg.price}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-2xl font-display font-bold gradient-pride-text">
                        {(pkg.prideCoins as number).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">PRIDE Coins Bonus</p>
                  </div>
                )}
              </CardContent>

              {/* 4 donation buttons - stacked */}
              <CardFooter className="flex flex-col gap-3">
                <Button
                  variant={pkg.featured ? 'pride' : 'default'}
                  size="lg"
                  className="w-full gap-2"
                  onClick={() => handleDonate(pkg, 'stripe')}
                >
                  <CreditCard className="h-4 w-4" />
                  Donate with Stripe
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full gap-2"
                  onClick={() => handleDonate(pkg, 'revolut')}
                >
                  <RefreshCcw className="h-4 w-4" />
                  Donate with Revolut
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full gap-2"
                  onClick={() => handleDonate(pkg, 'paypal')}
                >
                  <Wallet className="h-4 w-4" />
                  Donate with PayPal
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full gap-2"
                  onClick={() => handleDonate(pkg, 'coinbase')}
                >
                  <Coins className="h-4 w-4" />
                  Donate with Crypto
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
