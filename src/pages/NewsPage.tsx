import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Clock, Globe, MapPin } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const newsArticles = [
  {
    id: 1,
    title: 'Sydney WorldPride 2026: Everything You Need to Know',
    excerpt: 'The biggest LGBTQ+ celebration is coming to Sydney. Here\'s your complete guide to the events, parades, and community gatherings planned for this historic occasion.',
    content: 'Full article content here...',
    date: 'January 5, 2026',
    category: 'Australia',
    readTime: '5 min read',
    featured: true,
  },
  {
    id: 2,
    title: 'Historic LGBTQ+ Rights Victory in Australian Parliament',
    excerpt: 'New legislation strengthens protections for transgender and non-binary Australians, marking a significant step forward for equality and inclusion.',
    content: 'Full article content here...',
    date: 'January 3, 2026',
    category: 'Australia',
    readTime: '4 min read',
    featured: true,
  },
  {
    id: 3,
    title: 'Global Pride Networks Unite for Climate Action',
    excerpt: 'LGBTQ+ organizations worldwide are joining forces to address climate change and its disproportionate impact on marginalized communities.',
    content: 'Full article content here...',
    date: 'January 1, 2026',
    category: 'World',
    readTime: '3 min read',
    featured: true,
  },
  {
    id: 4,
    title: 'New Study Reveals Positive Trends in LGBTQ+ Workplace Inclusion',
    excerpt: 'Research from leading universities shows significant improvements in workplace policies and culture for LGBTQ+ employees across Australia.',
    content: 'Full article content here...',
    date: 'December 28, 2025',
    category: 'Australia',
    readTime: '4 min read',
    featured: false,
  },
  {
    id: 5,
    title: 'Pride Month 2026: Global Events Calendar',
    excerpt: 'From Sydney to San Francisco, here\'s your guide to Pride celebrations happening around the world in June 2026.',
    content: 'Full article content here...',
    date: 'December 25, 2025',
    category: 'World',
    readTime: '6 min read',
    featured: false,
  },
  {
    id: 6,
    title: 'LGBTQ+ Youth Support Services Expand Across Regional Australia',
    excerpt: 'New funding enables support services to reach more young people in rural and regional communities across the country.',
    content: 'Full article content here...',
    date: 'December 22, 2025',
    category: 'Australia',
    readTime: '3 min read',
    featured: false,
  },
];

const NewsPage = () => {
  const featuredArticles = newsArticles.filter(a => a.featured);
  const otherArticles = newsArticles.filter(a => !a.featured);

  return (
    <>
      <Helmet>
        <title>News | PRIDE Lab Foundation</title>
        <meta name="description" content="Stay informed about LGBTQ+ news from Australia and around the world. Latest stories, events, and community updates." />
      </Helmet>

      <Layout>
        {/* Hero */}
        <section className="py-16 lg:py-24 gradient-hero">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                LGBTQ+ <span className="gradient-pride-text">News</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Stay informed about the latest LGBTQ+ news, events, and stories 
                from Australia and around the world.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        <section className="py-16">
          <div className="container">
            <h2 className="font-display text-2xl font-bold mb-8 animate-fade-in">Featured Stories</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredArticles.map((article, index) => (
                <Link
                  key={article.id}
                  to={`/news/${article.id}`}
                  className="group block p-6 rounded-2xl bg-card border shadow-card transition-all duration-300 hover:shadow-elevated animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      {article.category === 'Australia' ? (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {article.category}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          {article.category}
                        </span>
                      )}
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
          </div>
        </section>

        {/* More Articles */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <h2 className="font-display text-2xl font-bold mb-8 animate-fade-in">More Stories</h2>
            <div className="space-y-6">
              {otherArticles.map((article, index) => (
                <Link
                  key={article.id}
                  to={`/news/${article.id}`}
                  className="group flex flex-col sm:flex-row gap-4 p-6 rounded-2xl bg-card border shadow-card transition-all duration-300 hover:shadow-elevated animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
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
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground sm:text-right sm:self-end">
                    {article.date}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default NewsPage;
