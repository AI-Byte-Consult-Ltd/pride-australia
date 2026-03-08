import PageSEO from '@/components/PageSEO';
import { Heart, Shield, Eye, Globe, Users, Sparkles, Building2, MapPin, Flag } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useTranslation } from 'react-i18next';

const ValuesPage = () => {
  const { t } = useTranslation();

  const values = [
    { icon: <Heart className="h-8 w-8" />, title: 'Community First', description: 'We build for people, not for engagement metrics. Our priorities are shaped by the needs of LGBTQIA+ members, creators, and allies — and by the long-term health of the community.', color: 'pride-pink' },
    { icon: <Shield className="h-8 w-8" />, title: 'Safety & Inclusion', description: 'Safety is not a feature — it is the foundation. We take a clear, zero-tolerance approach to hate, harassment, and targeted abuse.', color: 'pride-orange' },
    { icon: <Eye className="h-8 w-8" />, title: 'Transparency by Design', description: 'Trust requires clarity. We aim to be open about how we operate, how decisions are made, and what our priorities are.', color: 'pride-yellow' },
    { icon: <Building2 className="h-8 w-8" />, title: 'EU Headquarters, Responsible Governance', description: 'Our operational headquarters are in the European Union. Our governance approach is aligned with EU standards for privacy, accountability, and responsible platform development.', color: 'pride-green' },
    { icon: <Flag className="h-8 w-8" />, title: 'Italy as the Foundation Anchor', description: 'Pride Lab Foundation Italy is planned as a key real-world anchor for the ecosystem.', color: 'pride-blue' },
    { icon: <Globe className="h-8 w-8" />, title: 'Made in EU, for the World', description: 'Pride is global — but contexts are local. We build an EU-based platform that can responsibly serve a worldwide community.', color: 'pride-purple' },
    { icon: <Users className="h-8 w-8" />, title: 'Authentic Expression', description: 'We want people to feel safe being real. Pride Social Network is designed to support identity, creativity, and honest self-expression.', color: 'pride-pink' },
    { icon: <MapPin className="h-8 w-8" />, title: 'Local Community, Real-World Support', description: 'Digital communities work best when they connect to real life.', color: 'pride-orange' },
    { icon: <Sparkles className="h-8 w-8" />, title: 'Joy, Culture & Celebration', description: 'Pride is resistance, but it is also joy. We create room for celebration, humor, creativity, and community wins.', color: 'pride-yellow' },
  ];

  return (
    <>
      <Helmet>
        <title>{t('values.metaTitle')}</title>
        <meta name="description" content={t('values.subtitle')} />
      </Helmet>
      <Layout>
        <section className="py-20 lg:py-28 gradient-hero">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-pride mb-6"><Heart className="h-8 w-8 text-primary-foreground" fill="currentColor" /></div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                {t('values.title')} <span className="gradient-pride-text">{t('values.titleHighlight')}</span>
              </h1>
              <p className="text-xl text-muted-foreground">{t('values.subtitle')}</p>
            </div>
          </div>
        </section>
        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={value.title} className="p-8 rounded-2xl bg-card border shadow-card transition-all duration-300 hover:shadow-elevated animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className={`h-16 w-16 rounded-2xl bg-${value.color}/10 text-${value.color} flex items-center justify-center mb-6`}>{value.icon}</div>
                  <h3 className="font-display text-2xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h2 className="font-display text-3xl font-bold mb-6">{t('values.livingTitle')}</h2>
              <p className="text-lg text-muted-foreground mb-6">{t('values.livingPara1')}</p>
              <p className="text-lg text-muted-foreground mb-6">{t('values.livingPara2')}</p>
              <p className="text-lg text-muted-foreground mb-8">{t('values.livingPara3')}</p>
              <p className="text-lg text-muted-foreground">
                {t('values.livingContact')}{' '}
                <a href="mailto:info@pridesocial.org" className="text-primary hover:underline">info@pridesocial.org</a>.
              </p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ValuesPage;
