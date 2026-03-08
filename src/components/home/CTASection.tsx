import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const CTASection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 gradient-pride opacity-10" />
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            {t('cta.title1')}{' '}
            <span className="gradient-pride-text">{t('cta.titleHighlight')}</span>
            {t('cta.title2')}
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">{t('cta.subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="pride" size="xl" asChild>
              <Link to="/signup" className="gap-2">
                {t('common.getStartedFree')}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link to="/about">{t('cta.learnMore')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
