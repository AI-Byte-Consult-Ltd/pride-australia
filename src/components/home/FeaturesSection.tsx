import { Users, ShoppingBag, Shield, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FeaturesSection = () => {
  const { t } = useTranslation();

  const features = [
    { icon: <Users className="h-6 w-6" />, titleKey: 'features.connectTitle', descKey: 'features.connectDesc', color: 'pride-pink' },
    { icon: <ShoppingBag className="h-6 w-6" />, titleKey: 'features.businessTitle', descKey: 'features.businessDesc', color: 'pride-orange' },
    { icon: <Shield className="h-6 w-6" />, titleKey: 'features.safeTitle', descKey: 'features.safeDesc', color: 'pride-green' },
    { icon: <Heart className="h-6 w-6" />, titleKey: 'features.communityTitle', descKey: 'features.communityDesc', color: 'pride-purple' },
  ];

  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t('features.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <span className="block">{t('features.subtitle')}</span>
            <span className="block mt-3 font-medium text-foreground">{t('common.madeInEU')}</span>
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={feature.titleKey} className="group text-center p-6 rounded-2xl transition-all duration-300 hover:bg-muted animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-${feature.color}/10 text-${feature.color} mb-5 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{t(feature.titleKey)}</h3>
              <p className="text-muted-foreground">{t(feature.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
