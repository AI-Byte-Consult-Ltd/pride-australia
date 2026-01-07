import { useState } from 'react';
import { Sparkles, Crown, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SupportPackage {
  id: string;
  name: string;
  description: string;
  prideCoins: number | 'custom';
  price: number | 'custom';
  icon: React.ReactNode;
  featured?: boolean;
  stripeLink: string;
  revolutLink: string;
}

const packages: SupportPackage[] = [
  {
    id: 'early-supporter',
    name: 'Early Supporter',
    description: 'Be among the first to support our community platform and help us grow.',
    prideCoins: 100,
    price: 25,
    icon: <Star className="h-6 w-6" />,
    stripeLink: '#stripe-early',
    revolutLink: '#revolut-early',
  },
  {
    id: 'founding-member',
    name: 'Founding Member',
    description: 'Join as a founding member and shape the future of Pride Social Network.',
    prideCoins: 500,
    price: 100,
    icon: <Sparkles className="h-6 w-6" />,
    featured: true,
    stripeLink: '#stripe-founding',
    revolutLink: '#revolut-founding',
  },
  {
    id: 'vip-supporter',
    name: 'VIP Supporter',
    description: 'Choose your own contribution amount and receive Pride Coins based on your generosity.',
    prideCoins: 'custom',
    price: 'custom',
    icon: <Crown className="h-6 w-6" />,
    stripeLink: '#stripe-vip',
    revolutLink: '#revolut-vip',
  },
];

const SupportPackagesSection = () => {
  const [customAmount, setCustomAmount] = useState<number>(100);

  const handleSupport = (packageItem: SupportPackage, provider: 'stripe' | 'revolut') => {
    const link = provider === 'stripe' ? packageItem.stripeLink : packageItem.revolutLink;
    // For VIP, append custom amount to link
    const finalLink = packageItem.id === 'vip-supporter' ? `${link}?amount=${customAmount}` : link;
    window.open(finalLink, '_blank');
  };

  const calculateVIPCoins = (amount: number) => {
    // 10,000 coins per dollar (1M coins at $100 minimum)
    return Math.floor(amount * 10000);
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
            Choose a package and receive Pride Coins as a thank you.
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
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mx-auto mb-4 ${
                  pkg.featured 
                    ? 'gradient-pride text-primary-foreground' 
                    : pkg.id === 'vip-supporter'
                    ? 'bg-pride-purple/10 text-pride-purple'
                    : 'bg-primary/10 text-primary'
                }`}>
                  {pkg.icon}
                </div>
                <CardTitle className="text-xl">{pkg.name}</CardTitle>
                <CardDescription className="mt-2">{pkg.description}</CardDescription>
              </CardHeader>

              <CardContent className="text-center flex-1">
                {pkg.price === 'custom' ? (
                  <div className="py-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="custom-amount" className="text-sm text-muted-foreground">
                        Choose your amount
                      </Label>
                      <div className="relative max-w-[160px] mx-auto">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
                        <Input
                          id="custom-amount"
                          type="number"
                          min={100}
                          value={customAmount}
                          onChange={(e) => setCustomAmount(Math.max(100, parseInt(e.target.value) || 100))}
                          className="pl-8 text-center text-xl font-bold"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">Minimum $100</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-2">
                        <Heart className="h-5 w-5 text-pride-pink" />
                        <span className="text-2xl font-display font-bold gradient-pride-text">
                          {calculateVIPCoins(customAmount).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Pride Coins</p>
                    </div>
                  </div>
                ) : (
                  <div className="py-4">
                    <div className="mb-2">
                      <span className="text-3xl font-display font-bold">${pkg.price}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-2xl font-display font-bold gradient-pride-text">
                        {(pkg.prideCoins as number).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Pride Coins Bonus</p>
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex flex-col gap-3">
                <Button 
                  variant={pkg.featured ? 'pride' : 'default'}
                  size="lg"
                  className="w-full"
                  onClick={() => handleSupport(pkg, 'stripe')}
                >
                  Pay with Stripe
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => handleSupport(pkg, 'revolut')}
                >
                  Pay with Revolut
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
