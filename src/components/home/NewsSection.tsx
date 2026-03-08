
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const featuredNews = [
  { id: 1, title: 'Berlinale 2026 Highlights LGBTQ+ Cinema and the TEDDY Award', excerpt: 'The Berlin International Film Festival once again places queer cinema in the spotlight, celebrating diversity, creativity, and freedom of expression.', date: 'February 6, 2026', category: 'Germany (EU)', readTime: '4 min read' },
  { id: 2, title: 'Cologne Carnival 2026 Brings LGBTQ+ Friendly Celebrations', excerpt: 'Cologne\'s legendary Carnival returns in February with inclusive parties and events beloved by the LGBTQ+ community.', date: 'February 14, 2026', category: 'Germany (EU)', readTime: '3 min read' },
  { id: 3, title: 'WorldPride & EuroPride 2026 in Amsterdam Confirm Key Dates', excerpt: 'Amsterdam prepares to host WorldPride and EuroPride 2026, welcoming visitors from across Europe and the world.', date: 'February 10, 2026', category: 'Netherlands (EU)', readTime: '5 min read' },
  { id: 4, title: 'Brussels Pride 2026 Focuses on Inclusion and Public Safety', excerpt: 'Organisers of Brussels Pride outline the 2026 vision, focusing on safe public spaces and equal rights across Europe.', date: 'February 27, 2026', category: 'Belgium (EU)', readTime: '4 min read' },
  { id: 5, title: 'Gay Games XII Valencia 2026: Europe Prepares for a Global Event', excerpt: 'Valencia continues preparations for the Gay Games XII, combining sport, culture, and LGBTQ+ visibility.', date: 'February 5, 2026', category: 'Spain (EU)', readTime: '4 min read' },
  { id: 6, title: 'European Snow Pride 2026 Returns to the Alps', excerpt: 'Winter Pride celebrations return to the Alps, bringing together LGBTQ+ travellers for skiing, music, and community.', date: 'February 20, 2026', category: 'France (EU)', readTime: '3 min read' },
  { id: 7, title: 'Budapest Mayor Faces Charges After Supporting Pride March', excerpt: 'Legal action against Budapest\'s mayor sparks debate across the EU on LGBTQ+ rights and freedom of assembly.', date: 'February 28, 2026', category: 'Hungary (EU)', readTime: '4 min read' },
];

const NewsSection = () => {
  const { t } = useTranslation();
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollByCards = (direction: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card="news-card"]');
    const amount = card ? card.offsetWidth + 24 : 380;
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12 animate-fade-in">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
              {t('newsSection.title')} <span className="gradient-pride-text">{t('newsSection.titleHighlight')}</span>
            </h2>
            <p className="text-muted-foreground">{t('newsSection.subtitle')}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => scrollByCards('left')} className="hidden sm:inline-flex" aria-label="Scroll left">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => scrollByCards('right')} className="hidden sm:inline-flex" aria-label="Scroll right">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" asChild>
              <Link to="/news" className="flex items-center gap-2">
                {t('common.allNews')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div ref={trackRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2">
          {featuredNews.map((article, index) => (
            <Link key={article.id} to={`/news/${article.id}`} data-card="news-card" className="group block min-w-[280px] sm:min-w-[340px] lg:min-w-[380px] snap-start p-6 rounded-2xl bg-card border shadow-card transition-all hover:shadow-elevated animate-fade-in" style={{ animationDelay: `${index * 0.06}s` }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">{article.category}</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" />{article.readTime}</span>
              </div>
              <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{article.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{article.excerpt}</p>
              <p className="text-xs text-muted-foreground">{article.date}</p>
            </Link>
          ))}
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground sm:hidden">{t('common.swipeToBrowse')}</p>
      </div>
    </section>
  );
};

export default NewsSection;
