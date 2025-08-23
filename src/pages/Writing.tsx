import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Writing = () => {
  const essays = [
    {
      id: "bacteria-metal-life-forms",
      title: "Why Bacteria Are the Most Metal Life Forms on Earth",
      excerpt: "A deep dive into the extreme survival strategies of microorganisms and what they can teach us about resilience, adaptation, and the fundamental nature of life itself.",
      date: "2024-02-15",
      readTime: "8 min read",
      tags: ["biology", "bacteria", "evolution"],
      type: "Scientific Essay"
    },
    {
      id: "pond-scum-climate-solutions",
      title: "Pond Scum and Climate Solutions",
      excerpt: "How the most underappreciated organisms on the planet might hold keys to carbon sequestration, and why we should probably start taking cyanobacteria more seriously.",
      date: "2024-01-10",
      readTime: "10 min read",
      tags: ["climate-change", "cyanobacteria", "research"],
      type: "Scientific Essay"
    },
    {
      id: "villains-systematic-thinking",
      title: "The Villain's Guide to Systematic Thinking",
      excerpt: "What fictional antagonists can teach us about methodology, long-term planning, and the importance of having backup plans for your backup plans. (Purely theoretical analysis.)",
      date: "2023-12-05",
      readTime: "12 min read",
      tags: ["analysis", "methodology", "creative-writing"],
      type: "Creative Analysis"
    },
    {
      id: "scientific-failure-beauty",
      title: "In Defense of Beautiful Failures",
      excerpt: "Why the most disastrous experiments often yield the most valuable lessons, and how to embrace the chaos of scientific research without losing your mind.",
      date: "2024-08-20",
      readTime: "9 min read",
      tags: ["lab-work", "failure", "humor", "methodology", "learning"],
      type: "Philosophical Essay",
    },
    {
      id: "ethics-engineering-life",
      title: "The Ethics of Engineering Life",
      excerpt: "A philosophical exploration of the moral implications of genetic engineering, synthetic biology, and the responsibilities that come with creating new life forms.",
      date: "2024-03-30",
      readTime: "11 min read",
      tags: ["ethics", "genetic-engineering", "philosophy"],
      type: "Philosophical Essay"
    }
  ];

  return (
    <div className="min-h-screen pt-24">
      <div className="section-padding">
        <div className="container-width max-w-4xl">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                Writing & <span className="text-primary">Essays</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Thoughts on biology, code, and the intersection of scientific curiosity with
                questionable life choices. Written during those homework-induced psychosis moments when everything
                makes perfect sense.
              </p>
            </div>

            {/* Main Essays */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Recent Essays</h2>
              <div className="space-y-6">
                {essays.map((essay, index) => (
                  <Link key={index} to={`/article/${essay.id}`} className="block">
                    <Card className="gradient-card hover:border-primary/30 transition-all duration-300 cursor-pointer group">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <Badge variant="outline" className="text-xs">
                              {essay.type}
                            </Badge>
                            <CardTitle className="group-hover:text-primary transition-colors">
                              {essay.title}
                            </CardTitle>
                          </div>
                          <div className="text-right text-sm text-muted-foreground">
                            <div>{essay.date}</div>
                            <div>{essay.readTime}</div>
                          </div>
                        </div>
                        <CardDescription className="text-base leading-relaxed">
                          {essay.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {essay.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md font-mono"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Writing Philosophy */}
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle>On Writing About Science</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg text-muted-foreground max-w-none">
                  <p>
                    I believe science writing should be accessible without being dumbed down,
                    personal without being unscientific, and honest about both the beauty and
                    the frustration of research.
                  </p>
                  <br />
                  <p>
                    Most of my writing happens in the liminal space between lab work and late-night
                    coding sessions, when the boundaries between rigorous analysis and creative
                    thinking become wonderfully blurred.
                  </p>
                  <br />
                  <p className="text-primary">
                    If you can explain complex ideas while maintaining your personality and sense
                    of humor, you're probably doing science communication right.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Note about content */}
            <div className="text-center">
              <div className="bg-secondary/50 rounded-lg p-6 max-w-2xl mx-auto">
                <p className="text-sm text-muted-foreground">
                  Most of these essays exist in various states of completion across notebooks,
                  Google Docs, and hastily-written phone notes. The fully polished versions
                  will appear here once I stop procrastinating by doing more experiments.
                </p>
                <p className="text-xs text-primary mt-2 font-mono">
                  TODO: actually finish writing the things I keep talking about writing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Writing;