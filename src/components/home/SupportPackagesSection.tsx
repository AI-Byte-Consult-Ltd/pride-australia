
import { Sparkles, Crown, Star, CreditCard, Wallet, Coins, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { SUPPORT_LINKS } from '@/config/supportLinks';
import { useTranslation } from 'react-i18next';

type Provider = 'stripe' | 'revolut' | 'paypal' | 'coinbase';

interface SupportPackage {
  id: 'basic' | 'pro' | 'elite';
  nameKey: string;
  descKey: string;
  price: number;
  icon: React.ReactNode;
  featured?: boolean;
  coinsPerMonth: number;
  benefitsNowKey: string;
  benefitsSoonKey: string;
}

const EUR_SYMBOL = '€';

const packages: SupportPackage[] = [
  {
    id: 'basic',
    nameKey: 'supportPackages.basicName',
    descKey: 'supportPackages.basicDesc',
    price: 2.5,
    icon: <Star className="h-6 w-6" />,
    coinsPerMonth: 250,
    benefitsNowKey: 'supportPackages.basicBenefits',
    benefitsSoonKey: 'supportPackages.basicSoon',
  },
  {
    id: 'pro',
    nameKey: 'supportPackages.proName',
    descKey: 'supportPackages.proDesc',
    price: 8.5,
    icon: <Sparkles className="h-6 w-6" />,
    featured: true,
    coinsPerMonth: 900,
    benefitsNowKey: 'supportPackages.proBenefits',
    benefitsSoonKey: 'supportPackages.proSoon',
  },
  {
    id: 'elite',
    nameKey: 'supportPackages.eliteName',
    descKey: 'supportPackages.eliteDesc',
    price: 42,
    icon: <Crown className="h-6 w-6" />,
    coinsPerMonth: 5000,
    benefitsNowKey: 'supportPackages.eliteBenefits',
    benefitsSoonKey: 'supportPackages.eliteSoon',
  },
];

const SupportPackagesSection = () => {
  const { t } = useTranslation();

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
        <div className="text-center mb-16 animate-fade-in">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            {t('supportPackages.badge')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{t('supportPackages.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('supportPackages.subtitle')}{' '}
            <span className="font-medium text-foreground">{t('supportPackages.featureDate')}</span>.
            <br />
            <span className="text-sm">{t('common.madeInEU')}</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, index) => {
            const benefitsNow = t(pkg.benefitsNowKey, { returnObjects: true }) as string[];
            const benefitsSoon = t(pkg.benefitsSoonKey, { returnObjects: true }) as string[];

            return (
              <Card key={pkg.id} variant={pkg.featured ? 'featured' : 'elevated'} className="relative animate-fade-in flex flex-col" style={{ animationDelay: `${index * 0.1}s` }}>
                {pkg.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-block px-4 py-1 rounded-full gradient-pride text-primary-foreground text-sm font-medium shadow-soft">
                      {t('supportPackages.mostPopular')}
                    </span>
                  </div>
                )}

                <CardHeader className="text-center pt-8">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mx-auto mb-4 ${pkg.featured ? 'gradient-pride text-primary-foreground' : pkg.id === 'elite' ? 'bg-pride-purple/10 text-pride-purple' : 'bg-primary/10 text-primary'}`}>
                    {pkg.icon}
                  </div>
                  <CardTitle className="text-xl">{t(pkg.nameKey)}</CardTitle>
                  <CardDescription className="mt-2">{t(pkg.descKey)}</CardDescription>
                </CardHeader>

                <CardContent className="text-center flex-1">
                  <div className="py-4">
                    <div className="mb-2">
                      <span className="text-3xl font-display font-bold">{EUR_SYMBOL}{pkg.price.toFixed(pkg.price % 1 === 0 ? 0 : 2)}</span>
                      <span className="text-sm text-muted-foreground"> {t('supportPackages.perMonth')}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-lg font-display font-bold gradient-pride-text">{t('supportPackages.prideCoins')}</span>
                      <span className="text-sm text-muted-foreground">{t('supportPackages.coinsPerMonth', { count: pkg.coinsPerMonth })}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{t('supportPackages.includedWithSub')}</p>
                  </div>

                  <div className="mt-6 text-left space-y-6">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <h4 className="text-sm font-semibold text-foreground">{t('supportPackages.availableNow')}</h4>
                        <Badge variant="secondary" className="text-xs">{t('supportPackages.live')}</Badge>
                      </div>
                      <div className="space-y-2">
                        {Array.isArray(benefitsNow) && benefitsNow.map((benefit, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <h4 className="text-sm font-semibold text-foreground">{t('supportPackages.roadmap')}</h4>
                        <Badge variant="outline" className="text-xs">{t('supportPackages.fromDate')}</Badge>
                      </div>
                      <div className="space-y-2">
                        {Array.isArray(benefitsSoon) && benefitsSoon.map((benefit, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-muted-foreground/60 shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{benefit} <span className="text-muted-foreground/70">{t('supportPackages.soon')}</span></span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-3">
                  <Button variant={pkg.featured ? 'pride' : 'default'} size="lg" className="w-full gap-2" onClick={() => handleSubscribe(pkg, 'stripe')}>
                    <CreditCard className="h-4 w-4" />{t('supportPackages.subscribeStripe')}
                  </Button>
                  <Button variant="outline" size="lg" className="w-full gap-2" onClick={() => handleSubscribe(pkg, 'revolut')}>
                    <CreditCard className="h-4 w-4" />{t('supportPackages.subscribeRevolut')}
                  </Button>
                  <Button variant="outline" size="lg" className="w-full gap-2" onClick={() => handleSubscribe(pkg, 'paypal')}>
                    <Wallet className="h-4 w-4" />{t('supportPackages.subscribePaypal')}
                  </Button>
                  <Button variant="outline" size="lg" className="w-full gap-2" onClick={() => handleSubscribe(pkg, 'coinbase')}>
                    <Coins className="h-4 w-4" />{t('supportPackages.subscribeCrypto')}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SupportPackagesSection;
