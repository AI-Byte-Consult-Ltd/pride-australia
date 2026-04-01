
import PageSEO from '@/components/PageSEO';
import Layout from '@/components/layout/Layout';
import { RainbowCatcherGame } from '@/components/arcade/RainbowCatcherGame';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins, Sparkles, Palette, Megaphone, Gift, Gamepad2 } from 'lucide-react';

const SPEND_OPTIONS = [
  {
    icon: Palette,
    title: 'Смена имени / аватара',
    desc: 'Первая смена бесплатна, далее — за Pride Coins',
    cost: '25–50',
    available: true,
  },
  {
    icon: Gamepad2,
    title: 'Аркадные игры',
    desc: 'Играй в мини-игры и выигрывай ещё больше монет',
    cost: '10',
    available: true,
  },
  {
    icon: Megaphone,
    title: 'Буст поста',
    desc: 'Поднять свой пост в топ ленты на 24 часа',
    cost: '100',
    available: false,
  },
  {
    icon: Gift,
    title: 'Подарить монеты',
    desc: 'Отправить Pride Coins другому пользователю',
    cost: 'любая сумма',
    available: false,
  },
  {
    icon: Sparkles,
    title: 'Эксклюзивный бейдж',
    desc: 'Уникальный значок в профиле на 30 дней',
    cost: '200',
    available: false,
  },
];

const PrideArcadePage = () => {
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
            Pride Arcade & Shop
          </h1>
          <p className="text-muted-foreground">
            Зарабатывай и трать Pride Coins — играй, кастомизируй профиль и поддерживай сообщество
          </p>
        </div>

        {/* Game */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🎮 Rainbow Catcher
          </h2>
          <RainbowCatcherGame />
        </section>

        {/* Spend options */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Coins className="h-5 w-5 text-yellow-500" /> Куда потратить Pride Coins
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {SPEND_OPTIONS.map((opt) => (
              <Card
                key={opt.title}
                variant={opt.available ? 'elevated' : 'default'}
                className={!opt.available ? 'opacity-60' : ''}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <opt.icon className="h-5 w-5 text-primary" />
                    {opt.title}
                    {!opt.available && (
                      <span className="ml-auto text-xs bg-muted px-2 py-0.5 rounded-full">Скоро</span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">{opt.desc}</p>
                  <p className="text-sm font-semibold mt-1 flex items-center gap-1">
                    <Coins className="h-3.5 w-3.5 text-yellow-500" /> {opt.cost} монет
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How to earn */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">💡 Как заработать Pride Coins</h2>
          <div className="grid gap-2 text-sm">
            {[
              ['Создать пост', '+5'],
              ['Сделать Echo', '+3'],
              ['Оставить ответ', '+2'],
              ['Поставить лайк', '+1'],
              ['Получить лайк на пост', '+1'],
              ['Получить ответ на пост', '+1'],
              ['Получить Echo на пост', '+2'],
              ['Пригласить друга', '+10'],
              ['Выиграть в аркаде', 'до +50'],
            ].map(([action, coins]) => (
              <div key={action} className="flex justify-between items-center bg-muted/50 rounded-lg px-4 py-2">
                <span>{action}</span>
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
