import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Mail, MessageCircle, MapPin } from 'lucide-react';
import { useJurisdiction, type Jurisdiction } from '@/contexts/JurisdictionContext';
import { useTranslation } from 'react-i18next';

const JURISDICTION_META: Record<Jurisdiction, { label: string; emoji: string }> = {
  eu: { label: 'European Union', emoji: '🇪🇺' },
  australia: { label: 'Australia', emoji: '🇦🇺' },
  world: { label: 'World', emoji: '🌍' },
};

const EU_HQ_ADDRESS = 'Pride Social Network (EU HQ)\nVia del Corso 123\n00186 Rome (RM)\nItaly';

const ContactPage = () => {
  const { jurisdiction, countryName } = useJurisdiction();
  const { t } = useTranslation();
  const meta = JURISDICTION_META[jurisdiction];

  return (
    <>
      <Helmet>
        <title>{t('contact.metaTitle')}</title>
        <meta name="description" content={t('contact.metaDesc')} />
        <link rel="canonical" href="https://pridesocial.org/contact" />
      </Helmet>
      <Layout>
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
              <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">{t('contact.title')}</h1>
              <p className="text-lg text-muted-foreground">{t('contact.subtitle')}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card variant="elevated" className="text-center animate-fade-in">
                <CardHeader>
                  <div className="h-14 w-14 rounded-xl bg-pride-pink/10 text-pride-pink flex items-center justify-center mx-auto mb-4"><Mail className="h-7 w-7" /></div>
                  <CardTitle>{t('contact.emailTitle')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{t('contact.emailDesc')}</p>
                  <a href="mailto:info@pridesocial.org" className="text-primary hover:underline font-medium">info@pridesocial.org</a>
                </CardContent>
              </Card>
              <Card variant="elevated" className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <CardHeader>
                  <div className="h-14 w-14 rounded-xl bg-pride-blue/10 text-pride-blue flex items-center justify-center mx-auto mb-4"><MessageCircle className="h-7 w-7" /></div>
                  <CardTitle>{t('contact.communityTitle')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{t('contact.communityDesc')}</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button variant="outline" size="sm" asChild><Link to="/signup">{t('contact.joinNow')}</Link></Button>
                    <Button variant="ghost" size="sm" asChild><Link to="/dashboard">{t('contact.openDashboard')}</Link></Button>
                  </div>
                </CardContent>
              </Card>
              <Card variant="elevated" className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <CardHeader>
                  <div className="h-14 w-14 rounded-xl bg-pride-green/10 text-pride-green flex items-center justify-center mx-auto mb-4"><MapPin className="h-7 w-7" /></div>
                  <CardTitle>{meta.emoji} {countryName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2 text-sm">{t('contact.addressTitle')}</p>
                  <p className="text-muted-foreground text-sm whitespace-pre-line">{EU_HQ_ADDRESS}</p>
                  <p className="text-xs text-muted-foreground mt-4">{t('contact.viewingSite')} <span className="font-medium">{meta.label}</span></p>
                </CardContent>
              </Card>
            </div>
            <div className="max-w-3xl mx-auto mt-12 text-center text-sm text-muted-foreground animate-fade-in">
              {t('contact.legalNote')}{' '}
              <a href="mailto:info@pridesocial.org" className="text-primary hover:underline">info@pridesocial.org</a>{' '}
              {t('contact.legalNoteEnd')}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ContactPage;
