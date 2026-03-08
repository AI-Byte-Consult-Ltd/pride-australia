import PageSEO from '@/components/PageSEO';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Heart, Shield, Users, MessageCircle, Flag, Ban } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const GuidelinesPage = () => {
  const { t } = useTranslation();

  const guidelines = [
    { icon: <Heart className="h-6 w-6" />, titleKey: 'guidelines.kindTitle', descKey: 'guidelines.kindDesc', color: 'pride-pink' },
    { icon: <Shield className="h-6 w-6" />, titleKey: 'guidelines.safeTitle', descKey: 'guidelines.safeDesc', color: 'pride-blue' },
    { icon: <Users className="h-6 w-6" />, titleKey: 'guidelines.inclusionTitle', descKey: 'guidelines.inclusionDesc', color: 'pride-purple' },
    { icon: <MessageCircle className="h-6 w-6" />, titleKey: 'guidelines.constructiveTitle', descKey: 'guidelines.constructiveDesc', color: 'pride-green' },
    { icon: <Flag className="h-6 w-6" />, titleKey: 'guidelines.reportTitle', descKey: 'guidelines.reportDesc', color: 'pride-orange' },
    { icon: <Ban className="h-6 w-6" />, titleKey: 'guidelines.zeroTitle', descKey: 'guidelines.zeroDesc', color: 'pride-red' },
  ];

  return (
    <>
      <PageSEO title={t('guidelines.metaTitle')} description={t('guidelines.metaDesc')} path="/guidelines" />
      <Layout>
        <section className="py-16 lg:py-24 gradient-hero">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">{t('guidelines.title')}</h1>
              <p className="text-lg text-muted-foreground">{t('guidelines.subtitle')}</p>
            </div>
          </div>
        </section>
        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {guidelines.map((item, index) => (
                <Card key={item.titleKey} variant="elevated" className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader>
                    <div className={`h-12 w-12 rounded-xl bg-${item.color}/10 text-${item.color} flex items-center justify-center mb-4`}>{item.icon}</div>
                    <CardTitle>{t(item.titleKey)}</CardTitle>
                  </CardHeader>
                  <CardContent><p className="text-muted-foreground">{t(item.descKey)}</p></CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-3xl font-bold mb-8 text-center">{t('guidelines.detailedTitle')}</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="font-display text-xl font-semibold mb-3">{t('guidelines.prohibitedTitle')}</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Hate speech targeting race, ethnicity, gender, sexual orientation, disability, or religion</li>
                    <li>Harassment, bullying, or threats of violence</li>
                    <li>Sexually explicit content involving minors (zero tolerance)</li>
                    <li>Spam, scams, or misleading content</li>
                    <li>Impersonation of other users or public figures</li>
                    <li>Illegal content including drug sales and copyright infringement</li>
                    <li>Doxxing or sharing private information without consent</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-3">{t('guidelines.marketplaceTitle')}</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Only list products you have the right to sell</li>
                    <li>Provide accurate descriptions and images</li>
                    <li>Honor your commitments to buyers</li>
                    <li>Do not sell prohibited items (weapons, drugs, stolen goods)</li>
                    <li>Report suspicious listings or transactions</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-3">{t('guidelines.enforcementTitle')}</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Content removal</li>
                    <li>Temporary account suspension</li>
                    <li>Permanent account ban</li>
                    <li>Reporting to law enforcement for illegal activity</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-3">{t('guidelines.appealsTitle')}</h3>
                  <p className="text-muted-foreground">
                    If you believe your content was removed or your account was actioned in error, you may appeal by contacting{' '}
                    <a href="mailto:info@pridesocial.org" className="text-primary hover:underline">info@pridesocial.org</a>. Appeals are reviewed within 7 business days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default GuidelinesPage;
