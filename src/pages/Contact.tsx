import { Mail, Github, Linkedin, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "Best for project discussions, research questions, or general inquiries",
      value: "jed.lin1015@gmail.com",
      href: "mailto:jed.lin1015@gmail.com",
      note: "I typically respond within 24-48 hours (unless I'm debugging something particularly stubborn)"
    },
    {
      icon: Github,
      title: "GitHub",
      description: "Check out my code, pipelines, and occasionally working bioinformatics tools",
      value: "github.com/arryuniox",
      href: "https://github.com/arryuniox",
      note: "Warning: commit messages may contain excessive sarcasm and version control might be questionable"
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      description: "For more formal professional connections and networking",
      value: "linkedin.com/in/jjed-lin",
      href: "https://linkedin.com/in/jjed-lin",
      note: "The slightly more professional version of me"
    }
  ];

  const topics = [
    "Molecular biology and bacterial genomics research",
    "Bioinformatics pipeline development and debugging",
    "Machine learning applications in biological systems",
    "Science competition strategies and preparation",
    "Research collaboration opportunities",
    "Why bacteria are actually fascinating (I have charts)",
    "Anything with too many acronyms and/or databases"
  ];

  return (
    <div className="min-h-screen pt-24">
      <div className="section-padding">
        <div className="container-width max-w-4xl">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                Get In <span className="text-primary">Touch</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Email me if you want to talk about bacteria, weird pipelines, or anything
                with too many acronyms. I promise to respond with appropriate levels of
                enthusiasm and scientific accuracy.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <Card key={index} className="gradient-card hover:border-primary/30 transition-all duration-300 group">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                          <IconComponent size={20} className="text-primary" />
                        </div>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {method.title}
                        </CardTitle>
                      </div>
                      <CardDescription>
                        {method.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="font-mono text-sm text-primary">
                        {method.value}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {method.note}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="w-full hover:border-primary/50"
                      >
                        <a href={method.href} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={16} className="mr-2" />
                          Connect
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* What to Talk About */}
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle>What I Love Talking About</CardTitle>
                <CardDescription>
                  Topics that will guarantee an enthusiastic (and probably lengthy) response
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {topics.map((topic, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span className="text-primary mt-1">▸</span>
                      <span className="text-foreground">{topic}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Current Status */}
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle>Current Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-bio-green rounded-full animate-pulse"></div>
                    <span className="text-foreground">Available for research discussions and project collaboration</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="text-foreground">Currently debugging bacterial annotation pipelines</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Response Time:</strong> Usually within 24-48 hours, unless I'm deep in a
                    particularly stubborn debugging session or have been absorbed by the latest
                    bacterial genomics paper. If it's been longer than a week, feel free to send
                    a follow-up — I probably got distracted by something shiny and scientific.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Fun Footer */}
            <div className="text-center">
              <div className="bg-secondary/30 rounded-lg p-6">
                <p className="text-muted-foreground mb-2">
                  Pro tip: Messages mentioning bacteria, bioinformatics, or interesting research
                  questions get priority processing.
                </p>
                <p className="text-xs text-primary font-mono">
                  console.log("Thanks for reading this far!");
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;