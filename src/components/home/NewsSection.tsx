import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Featured news items for homepage
const featuredNews = [
  {
    id: 1,
    title: 'Sydney WorldPride 2026: Everything You Need to Know',
    excerpt: 'The biggest LGBTQ+ celebration is coming to Sydney. Here\'s your complete guide to the events, parades, and community gatherings.',
    date: 'January 5, 2026',
    category: 'Australia',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'Historic LGBTQ+ Rights Victory in Australian Parliament',
    excerpt: 'New legislation strengthens protections for transgender and non-binary Australians, marking a significant step forward for equality.',
    date: 'January 3, 2026',
    category: 'Australia',
    readTime: '4 min read',
  },
  {
    id: 3,
    title: 'Global Pride Networks Unite for Climate Action',
    excerpt: 'LGBTQ+ organizations worldwide are joining forces to address climate change and its disproportionate impact on marginalized communities.',
    date: 'January 1, 2026',
    category: 'World',
    readTime: '3 min read',
  },
];

const NewsSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12 animate-fade-in">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
              Latest <span className="gradient-pride-text">News</span>
            </h2>
            <p className="text-muted-foreground">
              Stay informed about LGBTQ+ news from Australia and around the world.
            </p>
          </div>
          <Button variant="outline" asChild className="shrink-0">
            <Link to="/news" className="flex items-center gap-2">
              All News
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredNews.map((article, index) => (
            <Link
              key={article.id}
              to={`/news/${article.id}`}
              className="group block p-6 rounded-2xl bg-card border shadow-card transition-all duration-300 hover:shadow-elevated animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
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
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {article.excerpt}
              </p>
              <p className="text-xs text-muted-foreground">{article.date}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
