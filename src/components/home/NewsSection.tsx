import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Featured EU news items (Feb 2024) for homepage carousel
const featuredNews = [
  {
    id: 1,
    title: 'Berlinale 2024 Highlights Diversity, Inclusion & the TEDDY Award',
    excerpt:
      'Berlin International Film Festival underlines LGBTIQ+ visibility and inclusion, with the TEDDY Award spotlighting queer cinema across sections.',
    date: 'February 6, 2024',
    category: 'Germany (EU)',
    readTime: '4 min read',
  },
  {
    id: 2,
    title: 'TEDDY 40 at Berlinale: Queer Cinema, Activism & Cultural Impact',
    excerpt:
      'The TEDDY Award programme features talks and events celebrating 40 years of queer film culture and community impact in Berlin.',
    date: 'February 13, 2024',
    category: 'Germany (EU)',
    readTime: '3 min read',
  },
  {
    id: 3,
    title: 'Brussels Pride 2024 Focuses on “Safe Everyday Everywhere”',
    excerpt:
      'Brussels Pride’s 2024 theme calls for concrete action against discrimination and hate crimes — with culture and community at the core.',
    date: 'February 27, 2024',
    category: 'Belgium (EU)',
    readTime: '4 min read',
  },
  {
    id: 4,
    title: 'Thessaloniki Pride: Statement After Greece’s Marriage Equality Milestone',
    excerpt:
      'Thessaloniki Pride marked a historic moment for LGBTQI+ rights in the region, linking progress with EuroPride 2024 momentum.',
    date: 'February 15, 2024',
    category: 'Greece (EU)',
    readTime: '4 min read',
  },
  {
    id: 5,
    title: 'QUEER-Streifen Regensburg Hosts a Special Screening',
    excerpt:
      'A dedicated queer cinema initiative in Regensburg announces a February screening, supporting local community spaces and visibility.',
    date: 'February 5, 2024',
    category: 'Germany (EU)',
    readTime: '2 min read',
  },
  {
    id: 6,
    title: 'Queer at DFF: February 2024 Programme Recommendations',
    excerpt:
      'DFF (Frankfurt) curates queer film and cultural recommendations for February, showcasing inclusive storytelling and perspectives.',
    date: 'February 1, 2024',
    category: 'Germany (EU)',
    readTime: '3 min read',
  },
  {
    id: 7,
    title: 'Sitges Carnival 2024: A February Celebration Near Barcelona',
    excerpt:
      'Sitges Carnival returns in February with major parades and a festive atmosphere in one of Europe’s best-known coastal party towns.',
    date: 'February 6, 2024',
    category: 'Spain (EU)',
    readTime: '3 min read',
  },
];

const NewsSection = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollByCards = (direction: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;

    // Scroll by ~1 card width (responsive)
    const card = el.querySelector<HTMLElement>('[data-card="news-card"]');
    const amount = card ? card.offsetWidth + 24 : 380; // 24 = gap-6
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12 animate-fade-in">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
              Latest <span className="gradient-pride-text">News</span>
            </h2>
            <p className="text-muted-foreground">
              Made in EU 🇪🇺, for the World 🗺️ — curated LGBTQ+ culture & community updates across the European Union.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Carousel controls */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollByCards('left')}
              aria-label="Scroll left"
              className="hidden sm:inline-flex"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollByCards('right')}
              aria-label="Scroll right"
              className="hidden sm:inline-flex"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            <Button variant="outline" asChild className="shrink-0">
              <Link to="/news" className="flex items-center gap-2">
                All News
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Carousel track (manual swipe/drag) */}
        <div
          ref={trackRef}
          className="
            flex gap-6 overflow-x-auto pb-2
            snap-x snap-mandatory
            scroll-smooth
            [-ms-overflow-style:none] [scrollbar-width:none]
          "
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {/* Hide scrollbar (WebKit) */}
          <style>{`
            div::-webkit-scrollbar { display: none; }
          `}</style>

          {featuredNews.map((article, index) => (
            <Link
              key={article.id}
              to={`/news/${article.id}`}
              data-card="news-card"
              className="
                group block
                min-w-[280px] sm:min-w-[340px] lg:min-w-[380px]
                snap-start
                p-6 rounded-2xl bg-card border shadow-card
                transition-all duration-300 hover:shadow-elevated
                animate-fade-in
              "
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {article.readTime}
                </span>
              </div>

              <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {article.title}
              </h3>

              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {article.excerpt}
              </p>

              <p className="text-xs text-muted-foreground">{article.date}</p>
            </Link>
          ))}
        </div>

        {/* Mobile hint */}
        <p className="mt-4 text-center text-xs text-muted-foreground sm:hidden">
          Swipe to browse →
        </p>
      </div>
    </section>
  );
};

export default NewsSection;
