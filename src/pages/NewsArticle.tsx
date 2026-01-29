import { Link, useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { featuredNews } from '@/data/news';
import { Button } from '@/components/ui/button';

const NewsArticle = () => {
  const { id } = useParams();
  const articleId = Number(id);

  const article = featuredNews.find((a) => a.id === articleId);

  if (!article) {
    return (
      <Layout>
        <div className="container py-16">
          <h1 className="font-display text-3xl font-bold mb-4">Article not found</h1>
          <p className="text-muted-foreground mb-8">
            The news item you’re looking for doesn’t exist.
          </p>
          <Button asChild variant="outline">
            <Link to="/news">Back to News</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="container py-16 max-w-3xl">
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">{article.category}</p>
          <h1 className="font-display text-4xl font-bold leading-tight mt-2">
            {article.title}
          </h1>
          <p className="text-sm text-muted-foreground mt-3">
            {article.date} • {article.readTime}
          </p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {article.content.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        <div className="mt-10">
          <Button asChild variant="outline">
            <Link to="/news">← Back to News</Link>
          </Button>
        </div>
      </article>
    </Layout>
  );
};

export default NewsArticle;
