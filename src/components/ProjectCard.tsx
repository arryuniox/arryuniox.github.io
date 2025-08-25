import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  title: string;
  description: string;
  details: string;
  githubUrl?: string;
  liveUrl?: string;
  articleUrl?: string;
  tags: string[];
}

const ProjectCard = ({ title, description, details, githubUrl, liveUrl, articleUrl, tags }: ProjectCardProps) => {
  return (
    <Card className="gradient-card border-border hover:border-primary/30 transition-all duration-300 group">
      <CardHeader>
        <CardTitle className="text-foreground group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-foreground/80 leading-relaxed">
          {details}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-card text-card-foreground rounded-md font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex gap-2 pt-2">
          {githubUrl && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="hover:border-primary/50"
            >
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github size={16} className="mr-2" />
                Code
              </a>
            </Button>
          )}
          {liveUrl && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="hover:border-primary/50"
            >
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} className="mr-2" />
                Live
              </a>
            </Button>
          )}
          {articleUrl && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="hover:border-primary/50"
            >
              <a href={articleUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} className="mr-2" />
                Article
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;