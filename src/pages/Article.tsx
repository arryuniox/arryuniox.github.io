import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getEssayBySlug } from "@/lib/cms";

const Article = () => {
  const { id } = useParams();
  const article = getEssayBySlug(id);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <Link to="/writing" className="text-primary hover:underline">
            Back to Writing
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="section-padding">
        <div className="container-width max-w-4xl">
          <Link
            to="/writing"
            className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Writing
          </Link>

          <article className="space-y-8">
            <header className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">{article.type}</Badge>
                <span className="text-sm text-muted-foreground">{article.date}</span>
                <span className="text-sm text-muted-foreground">/</span>
                <span className="text-sm text-muted-foreground">{article.readTime}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {article.title}
              </h1>

              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs bg-card text-card-foreground">
                    {tag}
                  </Badge>
                ))}
              </div>
            </header>

            <Card className="gradient-card">
              <CardContent className="prose prose-lg max-w-none p-6 md:p-8">
                <div dangerouslySetInnerHTML={{ __html: article.html }} />
              </CardContent>
            </Card>

            <footer className="border-t pt-8">
              <div className="text-center">
                <Link
                  to="/writing"
                  className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to all articles
                </Link>
              </div>
            </footer>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Article;
