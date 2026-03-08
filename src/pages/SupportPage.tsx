import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SupportPackagesSection from '@/components/home/SupportPackagesSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Gift, Trophy, Sparkles, Building2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

type BankDetailsEU = { recipient: string; recipientAddress: string; iban: string; bic: string; intermediaryBic?: string; reference: string; };

const SupportPage = () => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const benefits = [
    { icon: <Gift className="h-5 w-5" />, titleKey: 'support.coinsTitle', descKey: 'support.coinsDesc' },
    { icon: <Trophy className="h-5 w-5" />, titleKey: 'support.statusTitle', descKey: 'support.statusDesc' },
    { icon: <Sparkles className="h-5 w-5" />, titleKey: 'support.wallTitle', descKey: 'support.wallDesc' },
    { icon: <Heart className="h-5 w-5" />, titleKey: 'support.impactTitle', descKey: 'support.impactDesc' },
  ];

  const bankDetailsEU: BankDetailsEU = {
    recipient: 'AI Byte Consult Ltd.',
    recipientAddress: 'Cherno More 3, Bl. No 41a, Fl. 4, Apt. 406, 8230, Nesebar, Bulgaria',
    iban: 'LT60 3250 0579 5416 1122',
    bic: 'REVOLT21',
    intermediaryBic: 'CHASDEFX',
    reference: 'PRIDE-SUPPORT',
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: t('common.copied'), description: t('common.copiedDesc', { label }) });
    } catch {
      toast({ title: t('common.copyFailed'), description: t('common.copyManually'), variant: 'destructive' });
    }
  };

  const bankFields = [
    { label: t('support.recipient'), value: bankDetailsEU.recipient },
    { label: t('support.recipientAddress'), value: bankDetailsEU.recipientAddress },
    { label: t('support.iban'), value: bankDetailsEU.iban, mono: true },
    { label: t('support.bic'), value: bankDetailsEU.bic, mono: true },
    { label: t('support.intermediaryBic'), value: bankDetailsEU.intermediaryBic, mono: true },
    { label: t('support.reference'), value: bankDetailsEU.reference, mono: true },
  ];

  return (
    <>
      <Helmet>
        <title>{t('support.metaTitle')}</title>
        <meta name="description" content={t('support.metaDesc')} />
      </Helmet>
      <Layout>
        <section className="py-20 lg:py-28 gradient-hero">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-pride mb-6"><Heart className="h-8 w-8 text-primary-foreground" fill="currentColor" /></div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                {t('support.heroTitle')} <span className="gradient-pride-text">{t('support.heroHighlight')}</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                {t('support.heroSubtitle')}<br /><span className="text-sm">{t('common.madeInEU')}</span>
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 border-b border-border">
          <div className="container">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((b, i) => (
                <div key={b.titleKey} className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">{b.icon}</div>
                  <div>
                    <h3 className="font-display font-semibold mb-1">{t(b.titleKey)}</h3>
                    <p className="text-sm text-muted-foreground">{t(b.descKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SupportPackagesSection />

        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8 animate-fade-in">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl gradient-pride mb-4"><Building2 className="h-7 w-7 text-primary-foreground" /></div>
                <h2 className="font-display text-3xl font-bold mb-4">{t('support.bankTitle')}</h2>
                <p className="text-muted-foreground">{t('support.bankSubtitle')}</p>
              </div>
              <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <CardHeader><CardTitle className="text-lg">{t('support.bankCardTitle')}</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    {bankFields.map((field) => (
                      <div key={field.label} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 gap-3">
                        <div className="min-w-0">
                          <p className="text-sm text-muted-foreground">{field.label}</p>
                          <p className={`font-medium break-words ${field.mono ? 'font-mono' : ''}`}>{field.value}</p>
                        </div>
                        <Button type="button" variant="ghost" size="icon" aria-label={`Copy ${field.label}`} onClick={() => copyToClipboard(field.value || '', field.label)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t space-y-2 text-sm text-muted-foreground text-center">
                    <p><span className="font-medium text-foreground">{t('support.bankEEANote')}</span> {t('support.bankEEAInstr')}</p>
                    <p><span className="font-medium text-foreground">{t('support.bankOutsideNote')}</span> {t('support.bankOutsideInstr')}</p>
                    <p>{t('support.bankRefNote')}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center animate-fade-in">
              <h2 className="font-display text-3xl font-bold mb-4">{t('support.otherTitle')}</h2>
              <p className="text-muted-foreground mb-8">{t('support.otherSubtitle')}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" size="lg" asChild><Link to="/signup">{t('common.joinFree')}</Link></Button>
                <Button variant="ghost" size="lg" asChild><Link to="/about">{t('common.learnMore')}</Link></Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default SupportPage;
