import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Coins, Play, Trophy, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

const CANVAS_WIDTH = 360;
const CANVAS_HEIGHT = 520;
const PADDLE_WIDTH = 70;
const PADDLE_HEIGHT = 14;
const ITEM_SIZE = 28;
const BOMB_SIZE = 24;
const ENTRY_FEE = 10;
const GAME_DURATION = 30;

const PRIDE_COLORS = [
  '#E40303', '#FF8C00', '#FFED00',
  '#008026', '#004DFF', '#750787',
];

interface FallingItem {
  x: number;
  y: number;
  speed: number;
  color: string;
  type: 'heart' | 'star' | 'bomb';
  points: number;
}

type GameState = 'idle' | 'playing' | 'ended';

export function RainbowCatcherGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const gameStateRef = useRef<{
    paddleX: number;
    items: FallingItem[];
    score: number;
    lives: number;
    spawnTimer: number;
    timeLeft: number;
    lastTime: number;
  }>({
    paddleX: CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2,
    items: [],
    score: 0,
    lives: 3,
    spawnTimer: 0,
    timeLeft: GAME_DURATION,
    lastTime: 0,
  });

  const [gameState, setGameState] = useState<GameState>('idle');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [balance, setBalance] = useState<number | null>(null);
  const [reward, setReward] = useState(0);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    if (!user) return;
    supabase
      .from('profiles')
      .select('pride_coins')
      .eq('user_id', user.id)
      .single()
      .then(({ data }) => {
        if (data) setBalance(data.pride_coins);
      });
  }, [user, gameState]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (gameState !== 'playing') return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const scale = CANVAS_WIDTH / rect.width;
    gameStateRef.current.paddleX = Math.max(0, Math.min(CANVAS_WIDTH - PADDLE_WIDTH, x * scale - PADDLE_WIDTH / 2));
  }, [gameState]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      const gs = gameStateRef.current;
      if (e.key === 'ArrowLeft') gs.paddleX = Math.max(0, gs.paddleX - 20);
      if (e.key === 'ArrowRight') gs.paddleX = Math.min(CANVAS_WIDTH - PADDLE_WIDTH, gs.paddleX + 20);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gameState]);

  const spawnItem = useCallback((): FallingItem => {
    const isBomb = Math.random() < 0.2;
    return {
      x: Math.random() * (CANVAS_WIDTH - ITEM_SIZE),
      y: -ITEM_SIZE,
      speed: 120 + Math.random() * 100,
      color: isBomb ? '#333' : PRIDE_COLORS[Math.floor(Math.random() * PRIDE_COLORS.length)],
      type: isBomb ? 'bomb' : (Math.random() < 0.3 ? 'star' : 'heart'),
      points: isBomb ? -1 : (Math.random() < 0.3 ? 3 : 1),
    };
  }, []);

  const startGame = async () => {
    if (!user) {
      toast({ title: t('arcade.loginRequired'), description: t('arcade.loginRequiredDesc'), variant: 'destructive' });
      return;
    }
    if (balance !== null && balance < ENTRY_FEE) {
      toast({ title: t('arcade.notEnoughCoins'), description: t('arcade.notEnoughCoinsDesc', { count: ENTRY_FEE }), variant: 'destructive' });
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.rpc('arcade_play', { _user_id: user.id, _entry_fee: ENTRY_FEE });
    setLoading(false);

    if (error || data === false) {
      toast({ title: t('arcade.startFailed'), description: t('arcade.startFailedDesc'), variant: 'destructive' });
      return;
    }

    setBalance(prev => (prev ?? 0) - ENTRY_FEE);
    gameStateRef.current = {
      paddleX: CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2,
      items: [],
      score: 0,
      lives: 3,
      spawnTimer: 0,
      timeLeft: GAME_DURATION,
      lastTime: performance.now(),
    };
    setScore(0);
    setLives(3);
    setTimeLeft(GAME_DURATION);
    setReward(0);
    setGameState('playing');
  };

  const endGame = useCallback(async (finalScore: number) => {
    setGameState('ended');
    const earned = Math.min(Math.floor(finalScore / 5), 50);
    setReward(earned);

    if (user && earned > 0) {
      await supabase.rpc('arcade_reward', { _user_id: user.id, _reward: earned });
      setBalance(prev => (prev ?? 0) + earned);
    }
  }, [user]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const loop = (now: number) => {
      const gs = gameStateRef.current;
      const dt = Math.min((now - gs.lastTime) / 1000, 0.05);
      gs.lastTime = now;

      gs.timeLeft -= dt;
      if (gs.timeLeft <= 0 || gs.lives <= 0) {
        endGame(gs.score);
        return;
      }

      gs.spawnTimer -= dt;
      if (gs.spawnTimer <= 0) {
        gs.items.push(spawnItem());
        gs.spawnTimer = 0.5 + Math.random() * 0.4;
      }

      const paddleY = CANVAS_HEIGHT - 30;
      const alive: FallingItem[] = [];
      for (const item of gs.items) {
        item.y += item.speed * dt;
        if (
          item.y + ITEM_SIZE >= paddleY &&
          item.y <= paddleY + PADDLE_HEIGHT &&
          item.x + ITEM_SIZE >= gs.paddleX &&
          item.x <= gs.paddleX + PADDLE_WIDTH
        ) {
          if (item.type === 'bomb') {
            gs.lives--;
            setLives(gs.lives);
          } else {
            gs.score += item.points;
            setScore(gs.score);
          }
          continue;
        }
        if (item.y > CANVAS_HEIGHT) continue;
        alive.push(item);
      }
      gs.items = alive;
      setTimeLeft(Math.max(0, Math.ceil(gs.timeLeft)));

      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      const bg = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
      bg.addColorStop(0, '#1a0533');
      bg.addColorStop(1, '#0d0d2b');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      for (let i = 0; i < 30; i++) {
        const sx = (i * 137.5) % CANVAS_WIDTH;
        const sy = (i * 97.3 + now * 0.01) % CANVAS_HEIGHT;
        ctx.fillRect(sx, sy, 1.5, 1.5);
      }

      for (const item of gs.items) {
        ctx.save();
        if (item.type === 'bomb') {
          ctx.fillStyle = '#444';
          ctx.beginPath();
          ctx.arc(item.x + BOMB_SIZE / 2, item.y + BOMB_SIZE / 2, BOMB_SIZE / 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ff4444';
          ctx.font = '16px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('💣', item.x + BOMB_SIZE / 2, item.y + BOMB_SIZE / 2 + 5);
        } else if (item.type === 'star') {
          ctx.fillStyle = item.color;
          ctx.font = '24px sans-serif';
          ctx.fillText('⭐', item.x, item.y + 22);
        } else {
          ctx.fillStyle = item.color;
          ctx.font = '24px sans-serif';
          ctx.fillText('🏳️‍🌈', item.x, item.y + 22);
        }
        ctx.restore();
      }

      const pGrad = ctx.createLinearGradient(gs.paddleX, 0, gs.paddleX + PADDLE_WIDTH, 0);
      PRIDE_COLORS.forEach((c, i) => pGrad.addColorStop(i / (PRIDE_COLORS.length - 1), c));
      ctx.fillStyle = pGrad;
      ctx.beginPath();
      ctx.roundRect(gs.paddleX, paddleY, PADDLE_WIDTH, PADDLE_HEIGHT, 7);
      ctx.fill();
      ctx.shadowColor = '#FF8C00';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [gameState, endGame, spawnItem]);

  return (
    <Card variant="elevated" className="max-w-sm mx-auto overflow-hidden">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Coins className="h-4 w-4 text-yellow-500" />
            <span className="font-bold">{balance ?? '...'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Trophy className="h-4 w-4 text-primary" />
            <span className="font-bold">{score}</span>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(3)].map((_, i) => (
              <Heart key={i} className={`h-4 w-4 ${i < lives ? 'text-red-500 fill-red-500' : 'text-muted'}`} />
            ))}
          </div>
          <span className="font-mono text-xs">{timeLeft}s</span>
        </div>

        <div className="relative">
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="w-full rounded-lg touch-none cursor-pointer"
            style={{ aspectRatio: `${CANVAS_WIDTH}/${CANVAS_HEIGHT}` }}
            onPointerMove={handlePointerMove}
          />

          {gameState !== 'playing' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 rounded-lg gap-4">
              {gameState === 'ended' && (
                <div className="text-center space-y-2">
                  <p className="text-2xl font-bold text-white">🎉 {t('arcade.score')}: {score}</p>
                  <p className="text-yellow-400 font-semibold flex items-center gap-1 justify-center">
                    <Coins className="h-5 w-5" /> +{reward} Pride Coins
                  </p>
                </div>
              )}

              {gameState === 'idle' && (
                <div className="text-center space-y-2 px-6">
                  <p className="text-3xl">🏳️‍🌈</p>
                  <p className="text-white font-bold text-lg">{t('arcade.gameTitle')}</p>
                  <p className="text-muted-foreground text-sm">
                    {t('arcade.gameDesc')}<br />
                    {t('arcade.gameEntry')}: {ENTRY_FEE} Pride Coins
                  </p>
                </div>
              )}

              <Button
                variant="pride"
                size="lg"
                onClick={startGame}
                disabled={loading}
              >
                <Play className="h-5 w-5 mr-1" />
                {gameState === 'ended' ? t('arcade.playAgain') : t('arcade.play')} ({ENTRY_FEE} 🪙)
              </Button>
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground text-center">
          {t('arcade.controls')}
        </p>
      </CardContent>
    </Card>
  );
}
