import PageSEO from '@/components/PageSEO';
import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const EarlySupportersPage = () => {
  const { t } = useTranslation();
  const supporters = [{ name: 'Annetta Mallon', date: 'January 2026' }];

  return (
    <>
      <Helmet>
        <title>{t('earlySupporters.metaTitle')}</title>
        <meta name="description" content={t('earlySupporters.subtitle')} />
      </Helmet>
      <Layout>
        <section className="py-20 lg:py-28 gradient-hero">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-pride mb-6"><Star className="h-8 w-8 text-primary-foreground" fill="currentColor" /></div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                {t('earlySupporters.title')} <span className="gradient-pride-text">{t('earlySupporters.titleHighlight')}</span> {t('earlySupporters.titleEnd')}
              </h1>
              <p className="text-lg text-muted-foreground">{t('earlySupporters.subtitle')}</p>
            </div>
          </div>
        </section>
        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {supporters.map((supporter, index) => (
                  <div key={supporter.name} className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="absolute -top-3 -right-3"><div className="w-8 h-8 rounded-full gradient-pride flex items-center justify-center shadow-lg"><Star className="h-4 w-4 text-primary-foreground" fill="currentColor" /></div></div>
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full gradient-pride mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-primary-foreground">{supporter.name.charAt(0)}</div>
                      <h3 className="font-display text-lg font-semibold mb-1">{supporter.name}</h3>
                      <p className="text-sm text-muted-foreground">{supporter.date}</p>
                    </div>
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity"><Heart className="h-4 w-4 text-pride-pink" fill="currentColor" /></div>
                  </div>
                ))}
                {[...Array(Math.max(0, 5 - supporters.length))].map((_, i) => (
                  <div key={`empty-${i}`} className="p-6 rounded-2xl border-2 border-dashed border-border/50 flex items-center justify-center min-h-[180px] animate-fade-in" style={{ animationDelay: `${(supporters.length + i) * 0.1}s` }}>
                    <div className="text-center text-muted-foreground/50"><Star className="h-8 w-8 mx-auto mb-2" /><p className="text-sm">{t('earlySupporters.yourNameHere')}</p></div>
                  </div>
                ))}
              </div>
              <div className="mt-16 text-center animate-fade-in">
                <p className="text-muted-foreground mb-6">{t('earlySupporters.ctaText')}</p>
                <Button variant="pride" size="lg" asChild><Link to="/support">{t('common.becomeSupporter')}</Link></Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default EarlySupportersPage;
