import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SupportPackagesSection from '@/components/home/SupportPackagesSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Gift, Trophy, Sparkles, Building2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Benefit = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

type BankDetailsEU = {
  recipient: string;
  recipientAddress: string;
  iban: string;
  bic: string;
  intermediaryBic?: string;
  reference: string;
};

const SupportPage = () => {
  const { toast } = useToast();

  const benefits: Benefit[] = [
    {
      icon: <Gift className="h-5 w-5" />,
      title: 'PRIDE Coins',
      description:
        'Receive PRIDE Coins every month with your membership — used for future premium features and community perks.',
    },
    {
      icon: <Trophy className="h-5 w-5" />,
      title: 'Supporter Status',
      description:
        'Show your supporter badge and status — help us grow and build a stronger community across Europe and worldwide.',
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: 'Early Supporter Wall',
      description:
        'Get your name listed on the Early Supporters wall and be part of the founding story of Pride Social Network.',
    },
    {
      icon: <Heart className="h-5 w-5" />,
      title: 'Real Impact',
      description:
        'Your membership directly funds development, moderation, infrastructure, and new features rolling out after June 1, 2026.',
    },
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
      toast({
        title: 'Copied!',
        description: `${label} copied to clipboard.`,
      });
    } catch {
      toast({
        title: 'Copy failed',
        description: 'Please copy manually.',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Support Pride Social Network | Monthly Membership</title>
        <meta
          name="description"
          content="Support Pride Social Network with a monthly membership. Get supporter perks now, receive PRIDE Coins monthly, and help fund new features rolling out after June 1, 2026."
        />
      </Helmet>

      <Layout>
        {/* Hero */}
        <section className="py-20 lg:py-28 gradient-hero">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-pride mb-6">
                <Heart className="h-8 w-8 text-primary-foreground" fill="currentColor" />
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Support <span className="gradient-pride-text">Pride Social Network</span>
              </h1>

              <p className="text-lg text-muted-foreground">
                Your monthly membership helps us build and maintain a modern, safe, and inclusive social network created
                in Europe for a global community.
                <br />
                <span className="text-sm">Made in EU 🇪🇺 for the World 🗺️</span>
              </p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 border-b border-border">
          <div className="container">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages */}
        <SupportPackagesSection />

        {/* Bank Transfer Section (EU Revolut) */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8 animate-fade-in">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl gradient-pride mb-4">
                  <Building2 className="h-7 w-7 text-primary-foreground" />
                </div>

                <h2 className="font-display text-3xl font-bold mb-4">Support via Bank Transfer (EUR)</h2>

                <p className="text-muted-foreground">
                  Prefer a direct transfer? Use our EUR Revolut bank details for supporters in Europe (and worldwide).
                </p>
              </div>

              <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <CardHeader>
                  <CardTitle className="text-lg">EU / EUR Bank Details (Revolut)</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    {/* Recipient */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 gap-3">
                      <div className="min-w-0">
                        <p className="text-sm text-muted-foreground">Recipient</p>
                        <p className="font-medium break-words">{bankDetailsEU.recipient}</p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Copy recipient"
                        onClick={() => copyToClipboard(bankDetailsEU.recipient, 'Recipient')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Recipient address */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 gap-3">
                      <div className="min-w-0">
                        <p className="text-sm text-muted-foreground">Recipient address</p>
                        <p className="font-medium break-words">{bankDetailsEU.recipientAddress}</p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Copy recipient address"
                        onClick={() => copyToClipboard(bankDetailsEU.recipientAddress, 'Recipient address')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* IBAN */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 gap-3">
                      <div className="min-w-0">
                        <p className="text-sm text-muted-foreground">IBAN</p>
                        <p className="font-medium font-mono break-words">{bankDetailsEU.iban}</p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Copy IBAN"
                        onClick={() => copyToClipboard(bankDetailsEU.iban, 'IBAN')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* BIC */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 gap-3">
                      <div className="min-w-0">
                        <p className="text-sm text-muted-foreground">BIC</p>
                        <p className="font-medium font-mono break-words">{bankDetailsEU.bic}</p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Copy BIC"
                        onClick={() => copyToClipboard(bankDetailsEU.bic, 'BIC')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Intermediary BIC (outside EEA) */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 gap-3">
                      <div className="min-w-0">
                        <p className="text-sm text-muted-foreground">Intermediary BIC (outside EEA)</p>
                        <p className="font-medium font-mono break-words">{bankDetailsEU.intermediaryBic}</p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Copy intermediary BIC"
                        onClick={() => copyToClipboard(bankDetailsEU.intermediaryBic || '', 'Intermediary BIC')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Reference */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 gap-3">
                      <div className="min-w-0">
                        <p className="text-sm text-muted-foreground">Reference</p>
                        <p className="font-medium font-mono break-words">{bankDetailsEU.reference}</p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Copy reference"
                        onClick={() => copyToClipboard(bankDetailsEU.reference, 'Reference')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4 border-t space-y-2 text-sm text-muted-foreground text-center">
                    <p>
                      <span className="font-medium text-foreground">Transfer from a bank in the EEA:</span> use IBAN + BIC.
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Transfer from outside the EEA:</span> use IBAN + BIC
                      and add the intermediary BIC if your bank requests it.
                    </p>
                    <p>
                      Please include the reference so we can track your support and attribute it to your account.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Additional Ways */}
        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center animate-fade-in">
              <h2 className="font-display text-3xl font-bold mb-4">Other Ways to Help</h2>
              <p className="text-muted-foreground mb-8">
                Not ready to pay? You can still support us by joining the network, inviting friends, and being an active
                community member.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" size="lg" asChild>
                  <Link to="/signup">Join Free</Link>
                </Button>
                <Button variant="ghost" size="lg" asChild>
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default SupportPage;

