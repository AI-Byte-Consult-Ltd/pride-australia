
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Clock, Globe } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { featuredNews } from '@/data/news';

const NewsPage = () => {
  // Featured = первые 3 статьи, остальное = More
  const featuredArticles = featuredNews.slice(0, 3);
  const otherArticles = featuredNews.slice(3);

  return (
    <>
      <Helmet>
        <title>News | PRIDE Lab Foundation</title>
        <meta
          name="description"
          content="Stay informed about LGBTQ+ news, events, and community updates across the European Union — culture, pride events, rights, and safety."
        />
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
                EU-focused LGBTQ+ news, events, and community stories — made in Europe, for the world.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        <section className="py-16">
          <div className="container">
            <h2 className="font-display text-2xl font-bold mb-8 animate-fade-in">
              Featured Stories
            </h2>

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
                      <span className="flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        {article.category}
                      </span>
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
            <h2 className="font-display text-2xl font-bold mb-8 animate-fade-in">
              More Stories
            </h2>

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
