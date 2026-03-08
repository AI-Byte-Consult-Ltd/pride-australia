import { Link } from 'react-router-dom';
import { Heart, Building2, Globe, ArrowRight, Sparkles, Target, Network } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import PageSEO from '@/components/PageSEO';

const AboutPage = () => {
  const { t } = useTranslation();

  const psnFocus = t('about.psnFocus', { returnObjects: true }) as string[];
  const foundationFocus = t('about.foundationFocus', { returnObjects: true }) as string[];

  return (
    <>
      <PageSEO title={t('about.metaTitle')} description={t('about.metaDesc')} path="/about" />

      <Layout>
        <section className="py-20 lg:py-28 gradient-hero">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-pride mb-6">
                <Network className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                {t('about.heroTitle1')} <span className="gradient-pride-text">{t('about.heroHighlight1')}</span> {t('about.heroTitle2')}{' '}
                <span className="gradient-pride-text">{t('about.heroHighlight2')}</span> {t('about.heroTitle3')}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t('about.heroSubtitle')}</p>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <div className="bg-card border rounded-2xl p-8 lg:p-12 shadow-card animate-fade-in">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="h-14 w-14 rounded-xl gradient-pride flex items-center justify-center shrink-0">
                      <Heart className="h-7 w-7 text-primary-foreground" fill="currentColor" />
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-bold mb-2">{t('about.psnTitle')}</h2>
                      <p className="text-muted-foreground text-lg">{t('about.psnDesc')}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{t('about.psnPara1')}</p>
                  <p className="text-muted-foreground leading-relaxed mt-4">{t('about.psnPara2')}</p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    <span className="font-medium text-foreground">{t('about.psnPara3Update')}</span> {t('about.psnPara3')}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">{t('about.psnPara4')}</p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    <span className="font-medium text-foreground">{t('common.madeInEU')}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">{t('about.foundationTitle')}</h2>
                <p className="text-lg text-muted-foreground">{t('about.foundationSubtitle')}</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-card border rounded-2xl p-8 shadow-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center"><Globe className="h-6 w-6 text-primary" /></div>
                    <h3 className="font-display text-xl font-semibold">{t('about.psnFocusTitle')}</h3>
                  </div>
                  <ul className="space-y-3 text-muted-foreground">
                    {Array.isArray(psnFocus) && psnFocus.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Sparkles className="h-5 w-5 text-primary mt-0.5 shrink-0" /><span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-card border rounded-2xl p-8 shadow-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-xl gradient-pride flex items-center justify-center"><Building2 className="h-6 w-6 text-primary-foreground" /></div>
                    <h3 className="font-display text-xl font-semibold">{t('about.foundationFocusTitle')}</h3>
                  </div>
                  <ul className="space-y-3 text-muted-foreground">
                    {Array.isArray(foundationFocus) && foundationFocus.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Sparkles className="h-5 w-5 text-primary mt-0.5 shrink-0" /><span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-card border rounded-2xl p-8 shadow-card mt-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"><Target className="h-6 w-6 text-primary" /></div>
                  <div>
                    <h3 className="font-display text-xl font-semibold mb-2">{t('about.italyTitle')}</h3>
                    <p className="text-muted-foreground leading-relaxed">{t('about.italyPara1')}</p>
                    <p className="text-muted-foreground leading-relaxed mt-3">
                      <span className="font-medium text-foreground">{t('about.italyPara2Label')}</span> {t('about.italyPara2')}
                    </p>
                    <p className="text-muted-foreground leading-relaxed mt-3">{t('about.italyPara3')}</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border rounded-2xl p-8 shadow-card mt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl gradient-pride flex items-center justify-center shrink-0"><Globe className="h-6 w-6 text-primary-foreground" /></div>
                  <div>
                    <h3 className="font-display text-xl font-semibold mb-2">{t('about.jurisdictionsTitle')}</h3>
                    <p className="text-muted-foreground leading-relaxed">{t('about.jurisdictionsPara1')}</p>
                    <p className="text-muted-foreground leading-relaxed mt-3">{t('about.jurisdictionsPara2')}</p>
                    <p className="text-muted-foreground leading-relaxed mt-3">{t('about.jurisdictionsPara3')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">{t('about.simpleTermsTitle')}</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4"><Heart className="h-8 w-8 text-primary" fill="currentColor" /></div>
                  <h3 className="font-display text-2xl font-bold mb-2">Pride Social Network</h3>
                  <p className="text-lg text-muted-foreground">{t('about.psnSimple')}</p>
                </div>
                <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-pride mb-4"><Building2 className="h-8 w-8 text-primary-foreground" /></div>
                  <h3 className="font-display text-2xl font-bold mb-2">Pride Lab Foundation</h3>
                  <p className="text-lg text-muted-foreground">{t('about.foundationSimple')}</p>
                </div>
              </div>
              <div className="text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-muted border">
                  <Target className="h-5 w-5 text-primary" />
                  <span className="font-display font-semibold">{t('about.ecosystemBadge')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">{t('about.joinTitle')}</h2>
              <p className="text-lg text-muted-foreground mb-8">{t('about.joinSubtitle')}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="pride" size="lg" asChild>
                  <Link to="/signup">{t('common.joinPrideSocial')}<ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/mission">{t('common.learnAboutMission')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default AboutPage;
