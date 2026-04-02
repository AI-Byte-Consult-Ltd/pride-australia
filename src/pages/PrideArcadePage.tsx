import PageSEO from '@/components/PageSEO';
import Layout from '@/components/layout/Layout';
import { RainbowCatcherGame } from '@/components/arcade/RainbowCatcherGame';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins, Sparkles, Palette, Megaphone, Gift, Gamepad2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PrideArcadePage = () => {
  const { t } = useTranslation();

  const SPEND_OPTIONS = [
    { icon: Palette, titleKey: 'arcade.optNameChange', descKey: 'arcade.optNameChangeDesc', cost: '25–50', available: true },
    { icon: Gamepad2, titleKey: 'arcade.optArcade', descKey: 'arcade.optArcadeDesc', cost: '10', available: true },
    { icon: Megaphone, titleKey: 'arcade.optBoostPost', descKey: 'arcade.optBoostPostDesc', cost: '100', available: false },
    { icon: Gift, titleKey: 'arcade.optGift', descKey: 'arcade.optGiftDesc', cost: t('arcade.anyAmount'), available: false },
    { icon: Sparkles, titleKey: 'arcade.optBadge', descKey: 'arcade.optBadgeDesc', cost: '200', available: false },
  ];

  const EARN_ACTIONS = [
    ['arcade.earnCreatePost', '+5'],
    ['arcade.earnEcho', '+3'],
    ['arcade.earnReply', '+2'],
    ['arcade.earnLike', '+1'],
    ['arcade.earnReceiveLike', '+1'],
    ['arcade.earnReceiveReply', '+1'],
    ['arcade.earnReceiveEcho', '+2'],
    ['arcade.earnInvite', '+10'],
    ['arcade.earnArcade', `${t('arcade.earnUpTo')} +50`],
  ];

  return (
    <Layout>
      <PageSEO
        title="Pride Arcade — PRIDE Social Network"
        description="Play mini-games, earn and spend Pride Coins in the arcade."
        path="/arcade"
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-10">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-display font-bold flex items-center justify-center gap-2">
            <Gamepad2 className="h-8 w-8 text-primary" />
            {t('arcade.pageTitle')}
          </h1>
          <p className="text-muted-foreground">{t('arcade.pageSubtitle')}</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            {t('arcade.gameSectionTitle')}
          </h2>
          <RainbowCatcherGame />
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Coins className="h-5 w-5 text-yellow-500" /> {t('arcade.spendTitle')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {SPEND_OPTIONS.map((opt) => (
              <Card
                key={opt.titleKey}
                variant={opt.available ? 'elevated' : 'default'}
                className={!opt.available ? 'opacity-60' : ''}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <opt.icon className="h-5 w-5 text-primary" />
                    {t(opt.titleKey)}
                    {!opt.available && (
                      <span className="ml-auto text-xs bg-muted px-2 py-0.5 rounded-full">{t('arcade.soon')}</span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">{t(opt.descKey)}</p>
                  <p className="text-sm font-semibold mt-1 flex items-center gap-1">
                    <Coins className="h-3.5 w-3.5 text-yellow-500" /> {opt.cost} {t('arcade.coins')}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">{t('arcade.earnTitle')}</h2>
          <div className="grid gap-2 text-sm">
            {EARN_ACTIONS.map(([actionKey, coins]) => (
              <div key={actionKey} className="flex justify-between items-center bg-muted/50 rounded-lg px-4 py-2">
                <span>{t(actionKey)}</span>
                <span className="font-bold text-primary">{coins}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default PrideArcadePage;
