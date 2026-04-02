import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import heroImage from '@/assets/hero-pride.jpg';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden gradient-hero">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-pride-pink/5 blur-3xl animate-pulse-soft" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-pride-blue/5 blur-3xl animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container relative py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left order-2 lg:order-1 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              {t('hero.badge')}
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t('hero.title1')}{' '}
              <span className="gradient-pride-text">{t('hero.titleHighlight')}</span>{' '}
              {t('hero.title2')}
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="pride" size="xl" asChild>
                <Link to="/signup">{t('hero.joinNetwork')}</Link>
              </Button>
              <Button variant="hero-secondary" size="xl" asChild>
                <Link to="/support">{t('hero.supportPSN')}</Link>
              </Button>
            </div>

            <div className="flex items-center gap-6 justify-center lg:justify-start mt-10 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-pride-green">✓</span>
                {t('hero.inclusive')}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pride-green">✓</span>
                {t('hero.communityFirst')}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pride-green">✓</span>
                {t('hero.safeSpace')}
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              <div className="absolute inset-0 gradient-pride rounded-3xl opacity-20 blur-2xl transform scale-95" />
              <img src={heroImage} alt="Diverse group of friends connecting on their phones in a modern coworking space" className="relative w-full h-auto rounded-3xl shadow-soft animate-float" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
