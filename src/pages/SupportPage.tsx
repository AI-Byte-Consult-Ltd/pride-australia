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

type BankDetails = {
  accountName: string;
  bsb: string;
  accountNumber: string;
  swiftBic: string;
  bank: string;
  reference: string;
};

const SupportPage = () => {
  const { toast } = useToast();

  const benefits: Benefit[] = [
    {
      icon: <Gift className="h-5 w-5" />,
      title: 'PRIDE Units',
      description:
        'Earn PRIDE Units — our internal platform units — to use in our marketplace and unlock special features.',
    },
    {
      icon: <Trophy className="h-5 w-5" />,
      title: 'Supporter Badge',
      description: 'Display a special badge on your profile showing your support.',
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: 'Exclusive Stickers',
      description: 'Get access to exclusive digital stickers for your posts.',
    },
    {
      icon: <Heart className="h-5 w-5" />,
      title: 'Community Impact',
      description: 'Your support directly funds platform development and community programs.',
    },
  ];

  const bankDetails: BankDetails = {
    accountName: 'ALEKSANDR Tochilov',
    bsb: '774-001',
    accountNumber: '226558266',
    swiftBic: 'TRWIAUS1XXX',
    bank: 'Wise Australia Pty Ltd, Suite 1, Level 11, 66 Goulburn Street, Sydney, NSW, 2000, Australia',
    reference: 'PRIDE-DONATION',
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
        <title>Support PRIDE Lab Foundation | Pride Social Network</title>
        <meta
          name="description"
          content="Support PRIDE Lab Foundation and help build a better social network for the Pride community. Choose a supporter package and make an impact."
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
                Support <span className="gradient-pride-text">PRIDE Lab Foundation</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Your contribution helps us build and maintain a safe, inclusive social network for the Pride community.
                Every supporter makes a difference.
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

        {/* Bank Transfer Section */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8 animate-fade-in">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl gradient-pride mb-4">
                  <Building2 className="h-7 w-7 text-primary-foreground" />
                </div>
                <h2 className="font-display text-3xl font-bold mb-4">Donate via Bank Transfer</h2>
                <p className="text-muted-foreground">
                  For Australian supporters who prefer to donate directly via bank transfer.
                </p>
              </div>

              <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <CardHeader>
                  <CardTitle className="text-lg">Australian Bank Account Details</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    {/* Account Name */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 gap-3">
                      <div className="min-w-0">
                        <p className="text-sm text-muted-foreground">Account Name</p>
                        <p className="font-medium break-words">{bankDetails.accountName}</p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Copy account name"
                        onClick={() => copyToClipboard(bankDetails.accountName, 'Account name')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* BSB */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 gap-3">
                      <div className="min-w-0">
                        <p className="text-sm text-muted-foreground">BSB</p>
                        <p className="font-medium font-mono break-words">{bankDetails.bsb}</p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Copy BSB"
                        onClick={() => copyToClipboard(bankDetails.bsb, 'BSB')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Account Number */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 gap-3">
                      <div className="min-w-0">
                        <p className="text-sm text-muted-foreground">Account Number</p>
                        <p className="font-medium font-mono break-words">{bankDetails.accountNumber}</p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Copy account number"
                        onClick={() => copyToClipboard(bankDetails.accountNumber, 'Account number')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* SWIFT / BIC */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 gap-3">
                      <div className="min-w-0">
                        <p className="text-sm text-muted-foreground">SWIFT / BIC</p>
                        <p className="font-medium font-mono break-words">{bankDetails.swiftBic}</p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Copy SWIFT/BIC"
                        onClick={() => copyToClipboard(bankDetails.swiftBic, 'SWIFT/BIC')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Bank */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 gap-3">
                      <div className="min-w-0">
                        <p className="text-sm text-muted-foreground">Bank</p>
                        <p className="font-medium break-words">{bankDetails.bank}</p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Copy bank details"
                        onClick={() => copyToClipboard(bankDetails.bank, 'Bank details')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Reference */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 gap-3">
                      <div className="min-w-0">
                        <p className="text-sm text-muted-foreground">Reference</p>
                        <p className="font-medium font-mono break-words">{bankDetails.reference}</p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Copy reference"
                        onClick={() => copyToClipboard(bankDetails.reference, 'Reference')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground text-center pt-4 border-t">
                    Please use the reference when making your transfer so we can track your donation.
                  </p>
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
                Not ready to make a financial contribution? You can still support us by joining the network, inviting
                friends, and being an active community member.
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
